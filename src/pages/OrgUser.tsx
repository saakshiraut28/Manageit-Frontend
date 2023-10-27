import OrgSidebar from "../components/OrgSidebar"

const OrgUser = () => {
    return (
        <div className="flex flex-row">
            <OrgSidebar />
            {/* Mid Dashboard Section */}
            <div className="flex flex-col justify-center items-center text-center w-screen lg:w-[70vw] h-screen gap-4">
                <span className="text-md">User Analytics on its way. Check how many tasks a certain worker has completed. Calculate Efficiency score per worker, and much more!</span>
                <span className="text-xl">Coming Soon!</span>
            </div>
        </div>
    )
}

export default OrgUser
