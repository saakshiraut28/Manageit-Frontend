/** @format */

import React from "react";
import {
  Animator,
  Fade,
  MoveIn,
  ScrollContainer,
  ScrollPage,
  batch,
} from "react-scroll-motion";
import { Divider } from "@mui/material";

const Home = () => {
  return (
    <React.Fragment>
      <ScrollContainer>
        <ScrollPage>
          <Animator animation={batch(Fade())}>
            <nav className="h-[70px] flex px-4 lg:px-10 text-xl justify-start items-center font-title border-b">
              <a href="/">Pushnote</a>
            </nav>
            <section className="Main m-0 w-full flex justify-center items-center py-20 bg-[url('./components/background.png')] font-josefin">
              <div className="text-center space-y-4 px-4">
                <p className="title text-4xl lg:text-8xl font-bold text-black font-title">
                  <a href="/auth"> Pushnote </a>
                </p>
                <p className="text text-lg lg:text-3xl font-medium text-black px-10">
                  {" "}
                  Managing your team can sometimes get difficult.
                </p>
                <p className="text text-lg lg:text-3xl font-medium text-black px-10">
                  {" "}
                  Don't worry, We're here to help you ;)
                </p>
              </div>
            </section>
          </Animator>
        </ScrollPage>
        {/* Services */}
        <ScrollPage>
          <Animator animation={MoveIn(0, -300)}>
            <section className="Service w-full flex flex-col lg:flex-row justify-start items-center py-4 lg:py-20 px-5 lg:px-10">
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
            <section className="About flex flex-col lg:flex-row justify-center items-center py-4 lg:py-10 px-4 lg:px-20 lg:space-x-24">
              <Animator animation={batch(Fade(), MoveIn(-1000, 0))}>
                <div className="">
                  <p className="title text-2xl lg:text-3xl font-bold text-black text-center space-y-4 my-5">
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
          <div className="text-lg lg:text-3xl font-medium text-blacks px-10 text-center space-y-4 font-josefin">
            <p>
              {" "}
              So, why don't you{" "}
              <a className="underline" href="/auth">
                try it
              </a>{" "}
              out today.
            </p>
            <p> We're sure you'll love it!!</p>
          </div>
        </div>

        {/* Contact  */}
        <section className="Contact flex-cols justify-center items-center py-20 px-4 lg:px-20 space-y-3">
          <p className="text-lg lg:text-3xl font-medium text-blacks px-10 text-center pb-2">
            Meet the Team
          </p>
          <div className="grid md:grid-cols-3 text-start">
            <div className="grid max-w-sm border shadow-lg rounded-sm px-4 py-4 mx-2 my-2">
              <p className="text-4xl md:text-6xl text-center py-4">📋</p>
              <p className="text-md lg:text-lg font-medium text-center">
                Mayank Bansal
              </p>
            </div>
            <div className="grid max-w-sm border shadow-lg rounded-sm px-4 py-4 mx-2 my-2">
              <p className="text-4xl md:text-6xl text-center py-4">🎯</p>
              <p className="text-md lg:text-lg font-medium text-center">
                Arghya Das
              </p>
            </div>
            <div className="grid max-w-sm border shadow-lg rounded-sm px-4 py-4 mx-2 my-2">
              <p className="text-4xl md:text-6xl text-center py-4">🧙‍♀️</p>
              <p className="text-md lg:text-lg font-medium text-center">
                Saakshi Raut
              </p>
            </div>
          </div>
        </section>

        <Divider />
        <footer className="flex justify-center items-center py-5">
          Made with ❣️
        </footer>
      </ScrollContainer>
    </React.Fragment>
  );
};

export default Home;
