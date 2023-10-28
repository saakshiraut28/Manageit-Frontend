import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import SideBar from '../components/SideBar';
import { useRecoilState } from 'recoil';
import { userAtom } from '../atom/user';
import { makeRequest } from '../utils/api';
import { Skeleton } from '@mui/material';
import UserProject from '../components/UserProject';
import { alertAtom } from '../atom/global';

const Dashboard = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);
  const [alertState, setalertState] = useRecoilState(alertAtom);

  // To fetch user details for the dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user && user?.role === "owner") {
      navigate("/org");
    }

    const fetchUser = async () => {
      try {
        const resp = await makeRequest("/user", "GET");
        const user = resp.data.user;
        if (!user) {
          localStorage.removeItem('token');
          navigate("/auth");
        } else {
          setUser(user);
        }
      } catch (error) {
        setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "warning" })

        const resp = await makeRequest("/org", "GET");
        if (resp.data.org) {
          navigate("/org");
        }
      }
    }

    if (!token) {
      navigate("/auth");
    } else fetchUser();
  }, [])

  return (
    <div className="flex flex-row">
      <SideBar />
      {/* Mid Dashboard Section */}
      <div className="w-screen lg:w-3/5 px-4 md:px-4">
        {user.role !== "" ? (
          <>
            <div className="py-6 text-center border-b-2 md:text-start">
              <h1 className="text-2xl md:text-3xl font-semibold my-2">Wassup <span className="text-[rgba(0,0,0,0.6)]">{user.name}</span></h1>
              <h3 className="text-lg md:text-xl font-semibold">Let's get you started with pending's task ;)</h3>
            </div>
            <div className="flex gap-4 flex-col px-2 py-5 mb-10 md:mb-2 md:h-[80vh] md:overflow-y-scroll">
              {user.projects && user.projects.length > 0 ? (
                user.projects.map((project, i) => (
                  <UserProject key={i} project={project} />
                ))
              ) : (
                <div className="flex items-center justify-center h-32 text-center text-gray-700">
                  Currently no Tasks are available in the project. Create one and keep a check on your progress.
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="py-10 w-[90vw] md:w-[60vw] lg:w-full">
            <Skeleton variant="rounded" height={550} />
          </div>
        )}
      </div>
      {/* Right Side */}
      <div className="hidden lg:w-1/5 px-4 md:flex flex-col justify-start items-center">
        <div className="my-8">
          <h1 className="text-lg font-semibold mb-4 flex gap-2 justify-center items-center md:text-2xl"><NotificationsIcon color="action" />  Notifications</h1>
          <div className="border-2 rounded min-h-[200px] px-2 flex items-center">
            <h1 className="text-lg text-center">Currently No notifications are available!</h1>
          </div>
        </div>
        <div className="my-8">
          <h1 className="text-lg font-semibold mb-4 flex gap-2 justify-center items-center md:text-2xl"><AlarmOnIcon color="action" />  Deadlines</h1>
          <div className="border-2 rounded min-h-[200px] px-2 flex items-center">
            <h1 className="text-lg text-center">Waiting for deadlines to appear here...</h1>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Dashboard