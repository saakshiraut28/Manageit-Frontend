/** @format */

import React from "react";
import Nav from "../components/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <React.Fragment>
      <nav className="h-[100px] flex px-4 lg:px-10 text-xl justify-start items-center font-title">
        Pushnote
      </nav>
      <section className="Main w-full flex justify-center items-center py-20 px-4 bg-gradient-to-b from-[#FFFFFF] via-[#FFE6E6] to-[#F2D6FF] font-josefin">
        <div className="text-center space-y-4 px-4">
          <p className="title text-4xl lg:text-8xl font-bold text-black font-title">
            {" "}
            Pushnote{" "}
          </p>
          <p className="text text-lg lg:text-3xl font-medium text-blacks px-10s">
            {" "}
            Managing your team can sometimes get difficult.
          </p>
          <p className="text text-lg lg:text-3xl font-medium text-blacks px-10s">
            {" "}
            Don't worry, We're here to help you ;)
          </p>
        </div>
      </section>
      {/* Services */}
      <section className="Service w-full flex flex-col lg:flex-row justify-start items-center py-4 lg:py-20 px-5 lg:px-20 font-josefin">
        <div className="text-start space-y-4 px-4 my-5">
          <p className="title text-2xl lg:text-3xl font-bold text-black ">
            {" "}
            Why Pushnote??{" "}
          </p>
          <p className="text text-md lg:text-xl font-medium text-blacks px-10s">
            {" "}
            Duties of managers ain't easy at all.{" "}
          </p>
        </div>
        <div className="grid md:grid-cols-3 text-start">
          <div className="grid max-w-sm border shadow-lg rounded-sm px-4 py-4 mx-2 my-2">
            <p className="text-4xl md:text-6xl text-center py-4">📋</p>
            <p className="text-md lg:text-lg font-medium text-center">
              Manage task assigned to you with ease.
            </p>
          </div>
          <div className="grid max-w-sm border shadow-lg rounded-sm px-4 py-4 mx-2 my-2">
            <p className="text-4xl md:text-6xl text-center py-4">🎯</p>
            <p className="text-md lg:text-lg font-medium text-center">
              Keep track of your deadlines.
            </p>
          </div>
          <div className="grid max-w-sm border shadow-lg rounded-sm px-4 py-4 mx-2 my-2">
            <p className="text-4xl md:text-6xl text-center py-4">🧙‍♀️</p>
            <p className="text-md lg:text-lg font-medium text-center">
              Seamlessly jump across different project.
            </p>
          </div>
          <div className="grid max-w-sm border shadow-lg rounded-sm px-4 py-4 mx-2 my-2">
            <p className="text-4xl md:text-6xl text-center py-4">📈</p>
            <p className="text-md lg:text-lg font-medium text-center">
              Easily manage your team members
            </p>
          </div>
          <div className="grid max-w-sm border shadow-lg rounded-sm px-4 py-4 mx-2 my-2">
            <p className="text-4xl md:text-6xl text-center py-4">📣</p>
            <p className="text-md lg:text-lg font-medium text-center">
              Get notified on task assignments. So that you won't miss out
              anything.
            </p>
          </div>
          <div className="grid max-w-sm border shadow-lg rounded-sm px-4 py-4 mx-2 my-2">
            <p className="text-4xl md:text-6xl text-center py-4">🙋</p>
            <p className="text-md lg:text-lg font-medium text-center">
              Chat with your friends.
            </p>
          </div>
        </div>
      </section>
      {/* About  */}
      <section className="About flex flex-col lg:flex-row justify-center items-center py-4 lg:py-20 px-4 lg:px-20">
        <div className="w-1/2">
          <p className="title text-2xl lg:text-3xl font-bold text-black text-center space-y-4 my-5">
            About
          </p>
          <p className="text-md lg:text-lg font-regular text-center text-justify">
            At Pushnote, We crafted a robust platform designed to cater to every
            facet of organizational dynamics. We incorporated a bunch of
            features, curated to empower teams in handling their workload with
            utmost efficiency. We considered the requirements of managers,
            organizers, and developers, fostering an environment that seamlessly
            aligns with their distinct needs. Pushnote not only streamlines
            project management but also cultivates a collaborative ecosystem,
            promoting effective communication among team members. With an
            emphasis on user-friendliness, we prioritized an intuitive
            interface, ensuring that our solution is not only powerful but also
            easily accessible to every member of your organization.{" "}
          </p>
          <Button onClick={handleOpen}>Curious about the Creators.</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="mx-4 my-4"
          >
            <div className="absolute lg:translate-y-1/2 lg:translate-x-3/4 max-w-xl bg-white px-8 py-8">
              <p className="text-md lg:text-lg font-regular text-center text-justify">
                At Pushnote, We crafted a robust platform designed to cater to
                every facet of organizational dynamics. We incorporated a bunch
                of features, curated to empower teams in handling their workload
                with utmost efficiency. We considered the requirements of
                managers, organizers, and developers, fostering an environment
                that seamlessly aligns with their distinct needs. Pushnote not
                only streamlines project management but also cultivates a
                collaborative ecosystem, promoting effective communication among
                team members. With an emphasis on user-friendliness, we
                prioritized an intuitive interface, ensuring that our solution
                is not only powerful but also easily accessible to every member
                of your organization.{" "}
              </p>
            </div>
          </Modal>
        </div>
        <div className="px-10 w-[500px]"><img src="https://res.cloudinary.com/dtdsi5sev/image/upload/v1699720790/supporting-person-diagonal-svgrepo-com_1_fhcqlo.svg" /></div>
      </section>
      <div className="Service w-full flex flex-col lg:flex-row justify-start items-center py-4 lg:py-20 px-5 lg:px-20">
        <p> So, why don't you try it out today.</p>
        <p> We're sure you'll love it!!</p>
      </div>

      {/* Contact  */}
      <section className="Contact flex-cols justify-center items-center py-20 px-4 lg:px-20 space-y-3">
        <p className="text-center "> Love it or hate it. Just talk it out</p>
        <input
          className="title bg-gray-100 outline-none w-full h-10 p-1 pl-4 text-sm hover:font-medium"
          placeholder="Email-Id"
          type="text"
          required
        />
        <textarea
          className="description bg-gray-100 outline-none w-full h-32 p-1 pl-4 text-sm hover:font-medium"
          placeholder="We would love to hear your thoughts."
          required
        />
      </section>
    </React.Fragment>
  );
};

export default Home;
