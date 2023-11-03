import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import OrgSidebar from "../components/OrgSidebar";
import SideBar from "../components/SideBar";
import { userAtom } from "../atom/user";
import FullCalendar from "../components/FullCalendar";
import { taskType } from "../types/types";
import { makeRequest } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const [fullTask, setFullTask] = useState([]);

    // To fetch new update for user if user doesn't exist
    useEffect(() => {
        const getUserDetails = async () => {
            const res = await makeRequest("/user", "GET");
            if (res.data.user) {
                setUser(res.data.user)
            }
            else navigate("/")
        }
        if (user.role === '') {
            getUserDetails();
        }
    }, [])

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const allTasks = [];
                for (const project of user?.projects) {
                    const res = await makeRequest(`/project/${project.projectId}/task?status=pending&assignTo=${user._id}`);
                    allTasks.push(...res.data.tasks);
                }
                setTasks(allTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        if (user)
            fetchTasks();
    }, [user]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const allTasks = [];
                for (const task of tasks) {
                    const res = await makeRequest(`/task/${task.taskId}`, "GET");
                    if (Array.isArray(res.data.task)) {
                        allTasks.push(...res.data.task);
                    } else if (res.data.task) {
                        allTasks.push(res.data.task);
                    }
                }
                setFullTask(allTasks);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTasks();
    }, [tasks]);

    return (
        <div className="flex flex-row">
            {user.role === "owner" ? <OrgSidebar /> : <SideBar />}
            <div className="w-full px-4 sm:px-6 lg:w-3/4">
                <FullCalendar tasks={fullTask} />
            </div>
        </div>
    )
}

export default Calendar;
