import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserData } from "../services/user"
import DashTask from '../components/DashTask';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import SideBar from '../components/SideBar';

const Dashboard = () => {
  let token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [task, setTask] = useState(false);


  useEffect(() => {
    // token = localStorage.getItem('token') ;
    // if (!token) navigate('/auth') ;
    // const resp = getUserData(token) ;
    // if (!resp.user){
    //   localStorage.removeItem('token') ;
    //   navigate("/auth") ;
    // }
  }, [])

  return (
      <div className="flex flex-row">
        <SideBar />
        {/* Mid Dashboard Section */}
        <div className="lg:w-3/5 px-4 md:px-4">
          {/* Header */}
          <div className="py-6 text-center border-b-2 md:text-start">
            <h1 className="text-2xl md:text-3xl font-semibold my-2">Wassup <span className="text-gray-400">Saakshi?</span></h1>
            <h3 className="text-lg md:text-xl font-semibold">Let's get you started with pending's task ;)</h3>
          </div>
          <div className="flex gap-4 flex-col py-5 mb-10 md:mb-2 md:h-[80vh] md:overflow-y-scroll">
            {/* {project.tasks && project.tasks.length > 0 ? ( */}
            {/* project.tasks.map((taskId, i) => ( */}
            {/* <Task key={i} taskId={taskId} projectId={new Types.ObjectId(projectId)} /> */}
            {/* )) */}
            {/* ) : ( */}
            {/* )} */}


            {task ? (
              <>
                {/* <DashTask taskId={} /> */}
              </>
            ) : (
              <div className="flex items-center justify-center h-[65vh] text-center text-gray-700">
                Currently no Tasks are available in the project. Create one and keep a check on your progress.
              </div>
            )}
          </div>
        </div>
        {/* Right Side */}
        <div className="hidden lg:w-1/5 px-4 md:flex flex-col justify-start items-center">
          <div className="my-8">
            <h1 className="text-lg md:text-2xl font-semibold mb-4 flex justify-center items-center"><NotificationsIcon />  Notifications</h1>
            <div className="border-2 rounded min-h-[200px] px-2 flex items-center">
              <h1 className="text-lg text-center">Currently No notifications are available!</h1>
            </div>
          </div>
          <div className="my-8">
            <h1 className="text-lg md:text-2xl font-semibold mb-4 flex justify-center items-center"><AlarmOnIcon />  Deadlines</h1>
            <div className="border-2 rounded min-h-[200px] px-2 flex items-center">
              <h1 className="text-lg text-center">Waiting for deadlines to appear here...</h1>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Dashboard