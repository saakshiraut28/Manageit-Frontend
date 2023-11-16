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
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { gsap } from "gsap";

const Home = () => {
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
  return (
    <React.Fragment>
      <ScrollContainer>
        <ScrollPage>
          <Animator animation={batch(Fade())}>
            <nav className="h-[70px] flex px-4 lg:px-10 text-xl justify-center items-center border-b">
              <div className="flex w-1/2 justify-start items-center font-title"><a href="/">Pushnote</a></div>
              <div className="flex w-1/2 justify-end items-center underline font-josefin"><a href="/dashboard">Explore</a></div>
            </nav>
            <section className="Main m-0 p-0 w-full h-screen flex justify-center items-center bg-[url('./images/background.png')] bg-center bg-cover font-josefin">
              <div className="para text-center space-y-4 px-4">
                <p className="title text-6xl lg:text-8xl font-bold text-black font-title">
                  <a href="/auth"> Pushnote </a>
                </p>
                <p className="text text-xl lg:text-3xl font-medium text-black px-10">
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
            <section className="Service w-full h-screen flex flex-col lg:flex-row justify-start items-center py-4 lg:py-20 px-5 lg:px-10">
              <div className="text-start space-y-4 px-4 my-5 -rotate-90">
                <p className="title text-2xl lg:text-4xl font-bold text-black ">
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
                    Easily manage your team members.
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
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Animator animation={MoveIn(1)}>
            {/* About  */}
            <Divider />
            <section className="About flex h-screen flex-col lg:flex-row justify-center items-center py-4 lg:py-10 px-4 lg:px-20 lg:space-x-24">
              <Animator animation={batch(Fade(), MoveIn(-1000, 0))}>
                <div className="">
                  <p className="title text-2xl lg:text-4xl font-bold text-black text-center space-y-4 my-5">
                    About
                  </p>
                  <p className="text-md lg:text-lg font-regular text-center text-justify">
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
                  <img src="https://res.cloudinary.com/dtdsi5sev/image/upload/v1699723438/people-who-support-svgrepo-com_rt96gj.png" />
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
              <a className="underline" href="/dashboard">
                try it
              </a>{" "}
              out today.
            </p>
            <p> We're sure you'll love it!!</p>
          </div>
        </div>

        {/* Contact  */}
        <section className="Contact flex-cols justify-center items-center py-20 px-4 lg:px-20 space-y-3">
          <p className="text-2xl lg:text-4xl font-medium text-blacks px-10 text-center pb-2">
            Meet the Team
          </p>
          <div className="grid md:grid-cols-3 text-start">
            <div className="grid max-w-sm border shadow-lg rounded-sm px-4 py-4 mx-2 my-2">
              <div className="grid justify-items-center"><img className="rounded-full w-[100px] h-[100px]" src="https://twitter.com/SimplerMayank/photo"/></div>
              <p className="text-md lg:text-lg font-medium text-center">
                Mayank Bansal
              </p>
              <p className="text-center space-x-2"><a href="https://twitter.com/SimplerMayank"><TwitterIcon/></a><a href="https://github.com/MayankBansal12"><GitHubIcon/></a></p>
              <p className="text-center px-4 py-2">Full-Stack  Developer ⁍⁌ DSA in Java ⁍⁌ Looking for web dev projects to contribute ^-^*</p>
            </div>
            <div className="grid max-w-sm border shadow-lg rounded-sm px-4 py-4 mx-2 my-2">
              <div className="grid justify-items-center"><img className="rounded-full w-[100px] h-[100px]" src="https://avatars.githubusercontent.com/u/84245432?v=4"/></div>
              <p className="text-md lg:text-lg font-medium text-center">
                Arghya Das
              </p>
              <p className="text-center space-x-2"><a href="https://twitter.com/ArghyaDas04"><TwitterIcon/></a><a href="https://github.com/Arghyahub"><GitHubIcon/></a></p>
              <p className="text-center px-4 py-2">SDE Intern | Fullstack | MERN | Dev | ML | CSE2025</p>
            </div>
            <div className="grid max-w-sm border shadow-lg rounded-sm px-4 py-4 mx-2 my-2">
              <div className="grid justify-items-center"><img className="rounded-full w-[100px] h-[100px]" src="https://res.cloudinary.com/dtdsi5sev/image/upload/c_crop,ar_1:1/v1700128564/IMG_20230619_091330-removebg-preview_wbtza6.jpg"/></div>
              <p className="text-md lg:text-lg font-medium text-center">
                Saakshi Raut
              </p>
              <p className="text-center space-x-2"><a href="https://twitter.com/saakshitwt"><TwitterIcon/></a><a href="https://github.com/saakshiraut28"><GitHubIcon/></a></p>
              <p className="text-center px-4 py-2">Google DSC CORE'23 | Loves to Code 👩‍💻| Web Designer/Developer 🕸️| Open-source Contributor 🚀 | Tech Blogger.</p>
            </div>
          </div>
        </section>

        <Divider />
        <footer className="flex justify-center items-center py-5">
          
        </footer>
      </ScrollContainer>
    </React.Fragment>
  );
};

export default Home;
