import axios from "axios";
import { useEffect, useState } from "react";
import { IProject } from "../types/types";
import { Link, useNavigate } from "react-router-dom";
import Groups2Icon from '@mui/icons-material/Groups2';
import Task from "../components/Task";

const ProjectDash = () => {
    const [project, setProject] = useState<IProject>();
    const projectId = "";
    const navigate = useNavigate();
    const [tasks, setTasks] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const res = await axios.get(`${process.env.REACT_SERVER_URL}/project/${projectId}`);
                // setProject(res.data);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };
        fetchData();
    }, [projectId]);

    return (
        <div className="flex flex-row">
            <div className="sidebar md:w-1/4"></div>
            <div className="w-full px-4 sm:px-6 md:w-3/4">
                {/* Header */}
                <div className="flex h-14 items-center justify-between">
                    <Link to="/" className="flex items-center gap-2"><i className="fa-solid fa-circle-arrow-left"></i> <span className="text-xs font-semibold underline">Jump to dashboard</span></Link>
                    <div className="flex items-center gap-2"><span className="text-xs font-semibold underline">Members</span><Groups2Icon /></div>
                </div>
                {/* Project Details */}
                <div className="flex flex-col gap-4">
                    <div className="my-3">
                        <h1 className="text-4xl font-bold"> Project Title <span className="block mt-2 text-sm font-thin sm:inline"> Created By: @Tim Cook</span></h1>
                    </div>
                    <div>
                        <span className="font-semibold">Description: </span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, eaque laborum, tenetur, soluta ipsam beatae est a reprehenderit delectus ex quisquam illo
                        cumque doloribus repudiandae nemo ut laudantium dolorem obcaecati quas recusandae maxime. Dolor facilis iste nulla hic autem provident. Doloribus expedita inventore saepe quia,
                        fuga repellendus incidunt vitae ducimus?
                    </div>
                    {/* Task History */}
                    <div className="border-2 min-h-fit my-4 py-4 p-2 md:p-4 rounded-lg flex flex-col gap-4">
                        <h1 className="text-center font-semibold text-xl">Task History</h1>
                        <div className="flex gap-4 flex-col">
                            {tasks ? <>
                                <Task taskId="taskId" projectId="projectId" />
                                <Task taskId="taskId" projectId="projectId" />
                                <Task taskId="taskId" projectId="projectId" />
                                <Task taskId="taskId" projectId="projectId" />
                                <Task taskId="taskId" projectId="projectId" />
                            </>
                                :
                                <div className="flex items-center justify-center h-32 text-center text-gray-700">
                                    Currently no Tasks are available in the project. Create one and keep a check on your progress.
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDash;
