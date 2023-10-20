import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const inputClass = "border-2 p-2 w-full rounded-lg focus:outline-none"

const Auth = () => {
  const [NewUser, setNewUser] = useState(true);
  const [ShowPasswd, setShowPasswd] = useState(false);

  const handleShowPasswd = (e) => {
    e.preventDefault();
    setShowPasswd(!ShowPasswd);
  }

  return (
    <div className="flex flex-row h-screen">
      {/* Left Image */}
      <div className="h-full w-full">
        <img src="https://duext.com/wp-content/uploads/2018/10/blog-3-option-1.jpg" alt="image" className="w-full h-full bg-cover bg-center" />
      </div>

      {/* Right Form */}
      <div className="h-full w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl my-2">Welcome to Manageit</h1>

        {NewUser ?
          <>
            <h2>Signup as a manager</h2>
            <form className="flex flex-col items-center gap-6 my-6 min-w-[300px]">
              <input type="text" name="name" placeholder="Name" className={inputClass} />
              <input type="text" name="email" placeholder="Email" className={inputClass} />
              <div className="flex flex-row w-full border-2 rounded-lg">
                <input type={ShowPasswd ? 'text' : 'password'} name="passwd" placeholder="Password" className="p-2 w-full rounded-lg focus:outline-none" />
                <button onClick={handleShowPasswd} className="mr-1">{ShowPasswd ? <VisibilityOffIcon /> : <VisibilityIcon />}</button>
              </div>
              <button type="submit" className="px-2 py-1 bg-blue-400 text-white rounded-md">Sign up</button>
            </form>
            <p>Already have an account? <button onClick={() => setNewUser(false)} className="text-blue-500 underline">Log in</button></p>
          </>
          :
          <>
            <h2>Login to your account</h2>
            <form className="flex flex-col items-center gap-6 my-6 min-w-[300px]">
              {/* <input type="text" name="name" placeholder="Name" className={inputClass} /> */}
              <input type="text" name="email" placeholder="Email" className={inputClass} />
              <div className="flex flex-row w-full border-2 rounded-lg">
                <input type={ShowPasswd ? 'text' : 'password'} name="passwd" placeholder="Password" className="p-2 w-full rounded-lg focus:outline-none" />
                <button onClick={handleShowPasswd} className="mr-1">{ShowPasswd ? <VisibilityOffIcon /> : <VisibilityIcon />}</button>
              </div>
              <button type="submit" className="px-2 py-1 bg-blue-400 text-white rounded-md">Log in</button>
            </form>
            <p>New to Manageit? <button onClick={() => setNewUser(true)} className="text-blue-500 underline">Sign up</button></p>
          </>}
      </div>
    </div>
  )
}

export default Auth