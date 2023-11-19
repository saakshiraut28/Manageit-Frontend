import { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { alertAtom, loadingAtom } from "../atom/global";
import { loginParams, signupParams } from "../types/types";
import { messaging } from "../firebase.js";
import { getToken } from "firebase/messaging";
const path = "../../firebase-messaging-sw.js";
const backend = import.meta.env.VITE_SERVER;

const Auth = () => {
  const [newUser, setNewUser] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAs, setLoginAs] = useState("");
  const [alertState, setalertState] = useRecoilState(alertAtom);
  const navigate = useNavigate();
  const [fcmToken, setFcmToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // If new user, it must be org signup
    if (newUser) {
      handleAuth("orgSignup", "/org/signup");
    }
    // If login as is user
    if (loginAs === "user") {
      handleAuth("user", "/auth/login");
    }
    // In case login as is org
    else if (loginAs === "org") {
      handleAuth("orgLogin", "/org/login");
    }
  }

  const requestPermission = async () => {
    const permission = await Notification.requestPermission()
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID });
      setFcmToken(token);
    } else if (permission === "denied") {
      alert("Please allow notifications to get updated for tasks and updates!");
    }
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(path)
      .then(function (registration) {
        console.log('Registration successful, scope is:', registration.scope);
        getToken(messaging, {
          vapidKey: import.meta.env.VITE_VAPID
        })
          .then((currentToken) => {
            if (currentToken) {
              // Set the token
              setFcmToken(currentToken);
            } else {
              // No token available
              requestPermission();
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
          });
      }).catch(function (err) {
        console.log('Service worker registration failed, error:', err);
      });
  }

  // Function to handle signup, login for both org and user
  const handleAuth = async (type: string, endpoint: string) => {
    let input: signupParams | loginParams;

    // If type is signup then input will be diff
    if (type === "orgSignup") {
      input = {
        email: email,
        passwd: password,
        name: name
      }
    } else {
      input = {
        email: email,
        passwd: password
      }
    }
    try {
      const response = await axios.post(backend + endpoint, { ...input, fcmToken: fcmToken })
      const data = response.data;
      const token = data.token;

      if (token) {
        localStorage.setItem("token", token);
        // If user, navigate to user dashboard
        if (loginAs === "user") {
          navigate("/dashboard");
        } else if (loginAs === "org") {
          // If org, navigate to user dashboard
          navigate("/org");
        }
        setalertState({ open: true, text: data.msg, eventType: "success" })
      } else {
        setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "warning" })
      }
    } catch (error) {
      setalertState({ open: true, text: error.response.data.msg, eventType: "error" });
    }
  }

  return (
    <div className="flex flex-row h-screen">
      {/* Left Image */}
      <div className="hidden md:flex justify-center items-center w-full p-5">
        <img src="https://static.vecteezy.com/system/resources/previews/000/115/992/original/free-team-work-illustration-vectors.jpg" alt="image" className="lg:h-2/3 md:h-1/2 bg-cover bg-center" />
      </div>

      {/* Right Form */}
      <div className="h-full w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl">Welcome to PushNote !!</h1>

        {/* In case user is new, signup will appear, otherwise login */}
        {newUser ?
          <>
            <h2>Signup as an Organisation</h2>
            <form className="w-4/5 flex flex-col gap-5 my-8" onSubmit={onSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                required={true}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Signup as Organisation
              </Button>
            </form>
            <p>Already have an account? <button onClick={() => setNewUser(false)} className="text-blue-700">Log in</button></p>
            <p className="p-2 mt-4 text-center"><span className="font-semibold">Note:</span> To signup as an user you will need to be invited by an organisation.</p>
          </>
          :
          <>
            <h2>Login to your account</h2>
            <form className="w-4/5 flex flex-col gap-5 my-8" onSubmit={onSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-center flex-wrap gap-4 mt-4">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => setLoginAs("user")}
                >
                  Login as User
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => setLoginAs("org")}
                >
                  Login as Organisation
                </Button>
              </div>
            </form>
            <p>New to PushNote? <button onClick={() => setNewUser(true)} className="text-blue-700">Sign up</button></p>
          </>}

        <Link to="/" className="text-blue-500 my-2 border-b-2">Back to HomePage</Link>
      </div>
    </div >
  )
}

export default Auth;