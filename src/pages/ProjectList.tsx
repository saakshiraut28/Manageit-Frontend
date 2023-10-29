import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { useRecoilState } from 'recoil';
import { userAtom } from '../atom/user';
import { makeRequest } from '../utils/api';
import ProjectModal from '../components/ProjectModal';
import OrgSidebar from '../components/OrgSidebar';

const ProjectList = () => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userAtom);

    // To fetch new update for user if user doesn't exist
    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const res = await makeRequest("/user", "GET");
                if (res.data.user) {
                    setUser(res.data.user)
                }
            } catch (error) {
                const res = await makeRequest("/org", "GET");
                if (res.data.org) {
                    setUser(res.data.org)
                } else {
                    navigate("/")
                }
            }
        }
        if (user.role === '') {
            getUserDetails();
        }
    }, [])

    return (
        <>
            <div className="container flex flex-row px-3 sm:px-5">
                {user.role === "owner" ? <OrgSidebar /> : <SideBar />}
                <div className="lg:px-10 w-screen lg:w-4/5 flex gap-2 flex-col">
                    <h1 className="text-2xl py-5 font-semibold flex flex-col">Project Lists</h1>
                    {user.role !== "user" && <div className="p-3"><ProjectModal /></div>}
                    {user.projects && user.projects.length > 0 ? (
                        user.projects.map((project, i) => (
                            <Link key={i} to={"/project/" + project.projectId} className="hover:border-l-4 border-2 rounded-lg flex flex-col items-start gap-2 px-4 py-6">
                                <h1>{project.name}</h1>
                            </Link>
                        ))
                    ) : (
                        <p className="flex h-[70vh] justify-center items-center min-w-fit">Fetching projects for you...Please hold on.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProjectList
