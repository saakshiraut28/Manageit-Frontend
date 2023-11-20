/** @format */

import React, { useEffect } from "react";
import {
  Animator,
  Fade,
  MoveIn,
  ScrollContainer,
  ScrollPage,
  batch,
} from "react-scroll-motion";
import { Divider } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const Home = () => {
  {
    useEffect(() => {
    const t1 = gsap.timeline();
    t1.from(".para", {
      y: 320,
      ease: "power4.out",
      delay: 1,
      duration: 1.8,
      stagger: {
        amount: 0.8,
      },
    });
  });
  }
  return (
    <React.Fragment>
      <ScrollContainer>
        <ScrollPage>
          <Animator animation={batch(Fade())}>
            <nav className="h-[70px] flex px-4 lg:px-10 text-xl justify-center items-center border-b">
              <div className="flex w-1/2 justify-start items-center font-title">
                <Link to="/">Pushnote</Link>
              </div>
              <div className="flex w-1/2 justify-end items-center underline font-josefin">
                <Link to="/dashboard">Explore</Link>
              </div>
            </nav>
            <section className="Main m-0 p-0 w-full h-screen flex justify-center items-center bg-[url('./images/background.png')] bg-center bg-cover font-josefin">
              <div className="para text-center space-y-4 px-4">
                <p className="title text-6xl lg:text-8xl font-bold text-black font-title">
                  <Link to="/auth"> Pushnote </Link>
                  <br />
                  <span className="text-4xl lg:text-6xl">
                    Manage like a Pro!
                  </span>
                </p>
                <p className="text text-xl lg:text-3xl font-medium text-[black] px-10">
                  {" "}
                  Managing your team can sometimes get difficult.
                </p>
                <p className="text text-xl lg:text-3xl font-medium text-black px-10">
                  {" "}
                  Don't worry, We're here to help you 😉
                </p>
              </div>
            </section>
          </Animator>
        </ScrollPage>
        {/* Services */}
        <ScrollPage>
          <Animator animation={MoveIn(0, -300)}>
            <section className="Service w-full h-screen flex flex-col lg:flex-row justify-start items-center py-4 lg:py-20 px-5 lg:px-10 ">
              <div className="text-start space-y-4 px-4 my-5 -rotate-90 font-josefin">
                <p className="title text-2xl lg:text-4xl font-bold text-black ">
                  {" "}
                  Why Pushnote??{" "}
                </p>
                <p className="text text-md lg:text-xl font-medium text-blacks ">
                  {" "}
                  Boost your teams Productivity... 🚀{" "}
                </p>
              </div>
              <div className="grid md:grid-cols-3 text-start">
                <div className="grid max-w-sm border shadow-lg rounded-sm mx-2 my-2">
                  <div className="flex justify-center relative bg-[#FFD964] h-[65px] ">
                    <p className="absolute text-4xl md:text-6xl text-center py-4">
                      📋
                    </p>
                  </div>
                  <p className="text-lg lg:text-xl font-medium text-center px-4 pt-8 font-josefin">
                    Task Management
                  </p>
                  <p className="text-md lg:text-md py-4 font-regular px-4 text-justify">
                    Leverage the power of PushNote to seamlessly generate and
                    assign tasks to your team, all while monitoring and tracking
                    the progress of each assignment.{" "}
                  </p>
                </div>
                <div className="grid max-w-sm border shadow-lg rounded-sm mx-2 my-2">
                  <div className="flex justify-center relative bg-[#73C2FB] h-[65px] ">
                    <p className="absolute text-4xl md:text-6xl text-center py-4">
                      🗓️
                    </p>
                  </div>
                  <p className="text-lg lg:text-xl font-medium text-center px-4 pt-8 font-josefin">
                    Track Deadlines
                  </p>
                  <p className="text-md lg:text-md py-4 font-regular px-4 text-justify">
                    Now, there's no need for an extra application to save and
                    manage your deadlines—everything you need is seamlessly
                    incorporated into our platform.
                  </p>
                </div>
                <div className="grid max-w-sm border shadow-lg rounded-sm mx-2 my-2">
                  <div className="flex justify-center relative bg-[#9362FA] h-[65px] ">
                    <p className="absolute text-4xl md:text-6xl text-center py-4">
                      🧙‍♀️
                    </p>
                  </div>{" "}
                  <p className="text-lg lg:text-xl font-medium text-center px-4 pt-8 font-josefin">
                    Project Management
                  </p>
                  <p className="text-md lg:text-md py-4 font-regular px-4 text-justify">
                    Empower your productivity without limits – with PushNote,
                    you can effortlessly create and manage an unlimited number
                    of projects and teams.
                  </p>
                </div>
                <div className="grid max-w-sm border shadow-lg rounded-sm mx-2 my-2">
                  <div className="flex justify-center relative bg-[#95FF99] h-[65px] ">
                    <p className="absolute text-4xl md:text-6xl text-center py-4">
                      👩‍💻
                    </p>
                  </div>{" "}
                  <p className="text-lg lg:text-xl font-medium text-center px-4 pt-8 font-josefin">
                    Invite within seconds.
                  </p>
                  <p className="text-md lg:text-md py-4 font-regular px-4 text-justify">
                    Experience seamless onboarding with PushNote's user-friendly
                    interface. Invite team members effortlessly with a single
                    invitation.
                  </p>
                </div>
                <div className="grid max-w-sm border shadow-lg rounded-sm mx-2 my-2">
                  <div className="flex justify-center relative bg-[#FF8282] h-[65px] ">
                    <p className="absolute text-4xl md:text-6xl text-center py-4">
                      📢
                    </p>
                  </div>{" "}
                  <p className="text-lg lg:text-xl font-medium text-center px-4 pt-8 font-josefin">
                    Notifications
                  </p>
                  <p className="text-md lg:text-md py-4 font-regular px-4 text-justify">
                    Team members receive instant notifications each time they
                    are assigned a task, ensuring no detail is overlooked and
                    keeping everyone engaged and informed.
                  </p>
                </div>
                <div className="grid max-w-sm border shadow-lg rounded-sm mx-2 my-2">
                  <div className="flex justify-center relative bg-[#FFD79A] h-[65px] ">
                    <p className="absolute text-4xl md:text-6xl text-center py-4">
                      🙋
                    </p>
                  </div>{" "}
                  <p className="text-lg lg:text-xl font-medium text-center px-4 pt-8 font-josefin">
                    Chat with friends.
                  </p>
                  <p className="text-md lg:text-md py-4 font-regular px-4 text-justify">
                    Connect with your team members, discuss project details, and
                    make decisions on the fly, all within the convenience of our
                    platform. Elevate communication and teamwork.
                  </p>
                </div>
              </div>
            </section>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Animator animation={MoveIn(1)}>
            {/* About  */}
            <Divider />
            <section className="About flex h-screen flex-col lg:flex-row justify-center items-center py-4 lg:py-10 px-4 lg:px-20 lg:space-x-24 font-josefin">
              <Animator animation={batch(Fade(), MoveIn(-1000, 0))}>
                <div className="">
                  <p className="title text-2xl lg:text-4xl font-bold text-black text-center space-y-4 my-5">
                    About
                  </p>
                  <p className="text-md lg:text-lg font-regular text-center">
                    At Pushnote, We crafted a robust platform designed to cater
                    to every facet of organizational dynamics. We incorporated a
                    bunch of features, curated to empower teams in handling
                    their workload with utmost efficiency. We considered the
                    requirements of managers, organizers, and developers,
                    fostering an environment that seamlessly aligns with their
                    distinct needs. Pushnote not only streamlines project
                    management but also cultivates a collaborative ecosystem,
                    promoting effective communication among team members. With
                    an emphasis on user-friendliness, we prioritized an
                    intuitive interface, ensuring that our solution is not only
                    powerful but also easily accessible to every member of your
                    organization.{" "}
                  </p>
                </div>
              </Animator>
              <Animator animation={batch(Fade(), MoveIn(1000, 0))}>
                <div className="px-10 hidden lg:block w-[500px]">
                  <img
                    src="https://res.cloudinary.com/dtdsi5sev/image/upload/v1699723438/people-who-support-svgrepo-com_rt96gj.png"
                    alt=""
                  />
                </div>
              </Animator>
            </section>
          </Animator>
        </ScrollPage>
        <Divider />
        <div className="Service flex flex-col lg:flex-row justify-center items-center py-4 lg:py-20 px-5 lg:px-20 ">
          <div className="text-lg lg:text-8xl font-medium text-blacks px-10 text-center space-y-4 font-brush">
            <p>
              {" "}
              So, why don't you{" "}
              <Link className="underline" to="/dashboard">
                try it
              </Link>{" "}
              out today.
            </p>
            <p> We're sure you'll love it!!</p>
          </div>
        </div>

        {/* Contact  */}
        <section className="Contact flex-cols justify-center items-center py-20 px-4 lg:px-20 space-y-3 font-josefin">
          <p className="text-2xl lg:text-4xl font-medium text-blacks px-10 text-center pb-2">
            Meet the Team
          </p>
          <div className="grid md:grid-cols-3 text-start">
            <div className="grid max-w-sm border shadow-lg rounded-sm px-4 py-4 mx-2 my-2">
              <div className="grid justify-items-center">
                <img
                  className="rounded-full w-[100px] h-[100px]"
                  src="https://res.cloudinary.com/dtdsi5sev/image/upload/v1700327557/Screenshot_2023-11-18_224117_aimlqm.png"
                  alt="mayank"
                />
              </div>
              <p className="text-md lg:text-lg font-medium text-center">
                Mayank Bansal
              </p>
              <p className="text-center space-x-2">
                <Link to="https://twitter.com/SimplerMayank">
                  <TwitterIcon />
                </Link>{" "}
                <Link to="https://github.com/MayankBansal12">
                  <GitHubIcon />
                </Link>{" "}
              </p>
              <p className="text-center px-4 py-2">
                Full-Stack Developer ⁍⁌ DSA in Java ⁍⁌ Looking for web dev
                projects to contribute ^-^*
              </p>
            </div>
            <div className="grid max-w-sm border shadow-lg rounded-sm px-4 py-4 mx-2 my-2">
              <div className="grid justify-items-center">
                <img
                  className="rounded-full w-[100px] h-[100px]"
                  src="https://avatars.githubusercontent.com/u/84245432?v=4"
                  alt="arghya"
                />
              </div>
              <p className="text-md lg:text-lg font-medium text-center">
                Arghya Das
              </p>
              <p className="text-center space-x-2">
                <Link to="https://twitter.com/ArghyaDas04">
                  <TwitterIcon />
                </Link>{" "}
                <Link to="https://github.com/Arghyahub">
                  <GitHubIcon />
                </Link>{" "}
              </p>
              <p className="text-center px-4 py-2">
                SDE Intern | Fullstack | MERN | Dev | ML | CSE2025
              </p>
            </div>
            <div className="grid max-w-sm border shadow-lg rounded-sm px-4 py-4 mx-2 my-2">
              <div className="grid justify-items-center">
                <img
                  className="rounded-full w-[100px] h-[100px]"
                  src="https://res.cloudinary.com/dtdsi5sev/image/upload/c_crop,ar_1:1/v1700128564/IMG_20230619_091330-removebg-preview_wbtza6.jpg"
                  alt="saakshi"
                />
              </div>
              <p className="text-md lg:text-lg font-medium text-center">
                Saakshi Raut
              </p>
              <p className="text-center space-x-2">
                <Link to="https://twitter.com/saakshitwt">
                  <TwitterIcon />
                </Link>{" "}
                <Link to="https://github.com/saakshiraut28">
                  <GitHubIcon />
                </Link>{" "}
              </p>
              <p className="text-center px-4 py-2">
                Google DSC CORE'23 | Loves to Code 👩‍💻| Web Designer/Developer
                🕸️| Open-source Contributor 🚀 | Tech Blogger.
              </p>
            </div>
          </div>
        </section>

        <Divider />
        <footer className="flex justify-center items-center py-5 text-md lg:text-md">
          <p className="font-josefin px-4 ">You're just a click away from simplifying your life ;)</p>
         <a href="/dashboard" className="px-8 py-2 bg-black text-white rounded-lg font-josefin hover:bg-gradient-to-r hover:text-black hover:border hover:from-[#FFE7E7] hover:to-[#EFE2FF]">Get Started</a>
        </footer>
      </ScrollContainer>
    </React.Fragment>
  );
};

export default Home;
