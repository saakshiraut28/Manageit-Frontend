import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { Divider, Chip, Button, Skeleton } from "@mui/material";
import SideBar from "../components/SideBar";
import { useRecoilState } from "recoil";
import { alertAtom } from "../atom/global";
import { userAtom } from "../atom/user";
import { Types } from "mongoose";
import { makeRequest } from "../utils/api";
import { IUser } from "../types/types";
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import OrgSidebar from "../components/OrgSidebar";

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useRecoilState(userAtom);
    const navigate = useNavigate();
    const [userDetail, setUserDetail] = useState<IUser>();
    const [alertState, setalertState] = useRecoilState(alertAtom);
    const [sameUser, setSameUser] = useState(false);

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

    // To fetch user details for displaying
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await makeRequest("/user/" + userId, "GET");
                if (res.data.user) {
                    setUserDetail(res.data.user);
                    setSameUser(res.data.user._id === user._id);
                }
            } catch (error) {
                setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "warning" })
            }
        };
        getData();
    }, [userId, user])

    return (
        <div className="flex flex-row">
            {user.role === "owner" ? <OrgSidebar /> : <SideBar />}
            {/* TaskPage */}
            <div className="w-full px-4 mb-10 lg:mb-2 sm:px-6 lg:w-3/4">
                {/* Header */}
                <div className="flex h-14 justify-between items-center">
                    <Link to="/dashboard" className="flex items-center gap-2"><i className="fa-solid fa-circle-arrow-left"></i> <span className="text-xs font-semibold underline">Jump to dashboard</span></Link>
                    {sameUser && <button className="text-md flex items-center"><EditIcon /> Edit</button>}
                </div>
                {/* User Details */}
                {userDetail ? (
                    <div className="flex flex-col gap-4">
                        <div className="mt-3">
                            <h1 className="text-4xl font-bold mb-2"> {userDetail.name} <span className="block sm:inline"><Chip color="secondary" label={"Role: " + userDetail.role} className="m-2 w-fit" /></span>
                            </h1>
                            {!sameUser && <Link to={`/chat/${userDetail.name.split(' ').join('')}/${userId}`} className="flex items-center gap-2 p-2 border w-fit border-blue-500">Talk it out on DM!!<SmsRoundedIcon /></Link>}
                        </div>
                        <Divider />
                        <Link to={"mailto:" + userDetail.email}>Email: {userDetail.email}</Link>
                        <div className=" flex gap-3 flex-col">
                            <h3 className="font-semibold text-lg">Projects {userDetail.name} is part of: </h3>
                            {userDetail.projects && userDetail.projects.length > 0 ? (
                                userDetail.projects.map((project, i) => (
                                    <Link key={i} to={"/project/" + project.projectId} className="hover:border-l-4 border-2 rounded-lg flex flex-col items-start gap-2 px-4 py-6">
                                        <h1>{project.name}</h1>
                                    </Link>
                                ))
                            ) : (
                                <p className="flex h-[40vh] justify-center items-center min-w-fit">Not part of any projects...</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                        <Skeleton variant="rectangular" height={100} className="mb-2" />
                        <Skeleton variant="rounded" height={400} />
                    </>
                )}
            </div>
        </div>
    )
}

export default UserProfile;
