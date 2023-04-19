import React, { useState } from "react";
import "./App.css";
import ContactForm from "./ContactForm";

import {
  FaCheckCircle,
  FaBars,
  FaThumbsUp,
  FaRegUserCircle,
} from "react-icons/fa";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [count, setCount] = useState(0);
  const handleClick = () => {
    const sectionTwo = document.getElementById("section-2");
    if (sectionTwo) {
      sectionTwo.scrollIntoView({ behavior: "smooth" });
    }

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = () => {
      setIsOpen(true);
    };

    const handleClose = () => {
      setIsOpen(false);
    };
  };
  return (
    <div className="App">
      <div className=" fixed top-5 left-5 ">
        {" "}
        {!isOpen && (
          <FaBars className="text-3xl cursor-pointer " onClick={handleOpen} />
        )}
        <div className={`tab ${isOpen ? "open" : ""}`}>
          <div className="tab-content">
            <button
              className="close-button font-medium text-xl text-black flex text-left "
              onClick={handleClose}
            >
              Close
            </button>
            <div className="text-white text-2xl">
              <h1 className="my-5">About</h1>
              <h1 className="my-5">Graphics</h1>
              <h1 className="my-5">Videos</h1>
              <h1 className="my-5">Contact</h1>
            </div>
          </div>
        </div>
      </div>
      <section id="section-1">
        <div className="bg-orange-200 flex items-center justify-center flex-col h-screen">
          <h1 className="text-center text-emerald-700 text-8xl font-bold hover:text-9xl duration-1000">
            Surya R.A.
          </h1>
          <p className="text-center pt-10 text-brown text-2xl font-bold ">
            Graphic Designer
          </p>
          <p className="text-center pt-1 text-brown text-2xl font-bold ">
            Performance Video Editor
          </p>
          <p className="text-center pt-1 text-brown text-2xl font-bold ">
            Front End Develepor
          </p>
          <div className="flex justify-center items-center p-10">
            <button
              type="button"
              className=" text-white text-xl font-light pt-3 pb-3 pl-10 pr-10 rounded-md bg-emerald-700 transition-all hover:bg-emerald-500 duration-300"
              onClick={handleClick}
            >
              Explore
            </button>
          </div>
        </div>
      </section>
      <section id="section-2">
        <div>
          <div className="bg-emerald-700">
            <h1 className="p-20 text-orange-200 font-bold text-7xl text-center">
              About
            </h1>
            <div className="">
              <div className=" p-10 mx-80 rounded-md bg-orange-200 shadow-emerald-900 shadow-2xl">
                <div className="grid grid-cols-2 gap-5">
                  <div className="p-5 bg-emerald-700 rounded-md  duration-300 justify-center items-center flex flex-col">
                    <div className="mb-5 bg-orange-200 rounded-full p-2 flex items-center justify-center">
                      <FaThumbsUp className="text-5xl text-emerald-700 p-2" />
                    </div>
                    <h1 className="text-orange-200 font-medium text-xl text-center">
                      100% Satisfaction
                    </h1>
                  </div>
                  <div className="p-5 bg-emerald-700 rounded-md  justify-center items-center flex flex-col ">
                    <FaCheckCircle className="text-6xl text-orange-200 mb-5 " />

                    <h1 className="text-orange-200 font-medium text-xl text-center">
                      200+ Projects
                    </h1>
                  </div>
                  <div className="col-span-2 p-5 bg-emerald-700 rounded-md  duration-300">
                    <div className="text-orange-200 mx-16 my-4 font-medium text-2xl flex flex-row justify-between">
                      <div className="text-center">
                        <h1>3+ Years in</h1>
                        <p>Graphic Design</p>
                        <p>Video Editing</p>
                      </div>

                      <FaRegUserCircle className="text-8xl "></FaRegUserCircle>
                      <div className="text-center">
                        <h1>6+ Months</h1>
                        <p>Front End</p>
                        <p>Development</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 pb-20">
                <div className="mx-80 p-10 rounded-md bg-orange-200 shadow-emerald-900 shadow-2xl">
                  <h1 className=" text-center text-brown text-md md:text-2xl">
                    I am a multi-talented freelancer skilled in graphic design,
                    performance video editing, and front-end development. My
                    portfolio showcases my creative and technical skills, such
                    as graphic design, video editing, and web development using
                    HTML and Tailwinds CSS.
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-black2 text-white font-medium text-xl p-5 flex flex-row justify-center items-center ">
          <h1 className=" mx-20 underline underline-offset-4">Graphics</h1>
          <h1 className=" mx-20 underline underline-offset-4">Videos</h1>
        </div>
      </section>

      <section>
        <div className="bg-black1">
          <h1 className="text-white font-medium text-center p-20 text-7xl underline-offset-8">
            Graphic Design Work
          </h1>
          <p className=" text-white font-medium text-3xl text-center mb-14 px-36">
            This consists of Logos, Fliers, Headers, Thumbnails, Package
            Designs, Stream Overlays, Ads, Stickers, Business Cards, Color
            Correction and More!
          </p>
          <div className="mt-20 px-72 flex justify-center items-center">
            <img src="portfoliogfx.png" alt="" />
          </div>
        </div>
      </section>
      <section>
        <div className="min-h-screen">
          {/* Other components */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

export default App;
