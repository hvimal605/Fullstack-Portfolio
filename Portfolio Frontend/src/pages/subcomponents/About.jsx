import React, { useEffect, useState } from "react";
import myimage from '../../assets/myimage.png'

const About = () => {
  return (
    <div id="about" className="w-full flex flex-col overflow-x-hidden  sm:mt-40">
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1  text-white"

        >
          ABOUT <span className="text-tubeLight-effect   font-extrabold  text-cyan-300">ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself.
        </p>
      </div>
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <img
              src={myimage}
              alt="avatar"
              className="bg-red-100 p-2 sm:p-4  h-[200px] sm:h-[340px] md:h-[350px] lg:h-[450px]"
            />
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5 text-white">
            
            <p>
              

              Hi, I'm Harsh Kumar Vimal, a third-year B.Tech student in Computer Science and Design at Rajiv Gandhi Institute of Petroleum Technology. I am a MERN stack developer and have worked on many projects, building web applications. I love learning new skills and exploring new technologies. I enjoy solving problems and coming up with creative solutions. I'm always ready to take on new challenges in the tech world.

              
            </p>
          </div>
        </div>
        <p className=" text-xl text-white">
        My dedication and perseverance ensure that I consistently deliver work on time. I am resilient and ready to face challenges, no matter how long they take to overcome.
        </p>
      </div>
    </div>
  );
};

export default About;