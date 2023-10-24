import { useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../components/SideBar';

const ProjectList = () => {
    const [project, setProject] = useState(false)

    return (
        <>
            <div className="container flex flex-row px-3 sm:px-5">
                <SideBar />
                <div className="lg:px-10 w-4/5 flex gap-2 flex-col">
                    <h1 className="text-2xl py-5 font-semibold flex flex-col">Project Lists</h1>
                    {project ? (
                        <>
                            <Link to="" className="hover:border-l-4 border-2 rounded-lg flex flex-col items-start gap-2 px-4 py-6">
                                <h1>Project Name</h1>
                            </Link>
                            <Link to="" className="hover:border-l-4 border-2 rounded-lg flex flex-col items-start gap-2 px-4 py-6">
                                <h1>Project Name</h1>
                            </Link>
                        </>
                    ) : (
                        <p className="flex h-[70vh] justify-center items-center min-w-fit">Fetching projects for you...Please hold on.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProjectList
