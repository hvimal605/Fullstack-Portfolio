import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import myimage from '../../assets/myimage.png'
import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";
import axios from "axios";

const Hero = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "https://portfolio-backend-code.onrender.com/api/v1/user/me/portfolio",
        { withCredentials: true }
      );
      setUser(data.user);
    };
    getMyProfile();
  }, []);

  return (
    <div className="w-full sm:flex mt-2 ">
        <div className="  bg-red-60 sm:w-1/2">
      <div className=" items-center ">
      <h1 className=" font-semibold overflow-x-hidden text-[1rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2rem]   text-white">
        Hello It's me
      </h1>
      <h1 className=" text-white font-semibold overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] ">
        Harsh Kumar Vimal
      </h1>
      </div>
      <div className=" flex gap-3">
      <h1 className="overflow-x-hidden text-[0.8rem] sm:text-[0.8rem] md:text-[1.8rem] lg:text-[1.8rem] text-white ">
        And I'm
      </h1>
      <h1 className=" text-cyan-400 font-semibold overflow-x-hidden text-[0.8rem] sm:text-[1.2rem] md:text-[1.8rem] lg:text-[1.8rem]  ">
        <Typewriter
          words={["MERN STACK DEVELOPER", "CODER", "UI/UX DESIGNER"]}
          loop={50}
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
      </div>
      <div className="w-fit px-5 py-2  border-2 border-cyan-300  rounded-[20px] flex gap-5 items-center mt-4 md:mt-8 lg:mt-10 duration-300  ">
        
        <Link to={user.instagramURL} target="_blank">
          <FaInstagram className="text-pink-500 sm:text-4xl text-xl  hover:scale-110  sm:p-1 rounded-full hover:border-2 border-pink-500" />
        </Link>
        <Link to={user.facebookURL} target="_blank">
          <FaFacebook className="text-blue-800 sm:text-4xl text-xl  hover:scale-110  sm:p-1 rounded-full hover:border-2 border-blue-800" />
        </Link>
        <Link to={user.linkedInURL} target="_blank" >
          <FaLinkedin className="text-sky-500 sm:text-4xl text-xl   hover:scale-110  sm:p-1 rounded-full hover:border-2 border-sky-500" />
        </Link>
        <Link to={user.twitterURL} target="_blank">
          <FaTwitter className="text-blue-800  sm:text-4xl text-xl  hover:scale-110  sm:p-1 rounded-full hover:border-2 border-blue-800" />
        </Link>
      </div>
      <div className="mt-4 md:mt-8 lg:mt-10 flex gap-3">
        <Link to={user.githubURL} target="_blank">
          <button className="rounded-[30px]  flex items-center gap-2 border border-cyan-500 p-2  shadow-sm  shadow-cyan-300 text-white hover:bg-cyan-500 ">
            <FaGithub />
            <span>Github</span>
          </button>
        </Link>
        <Link to={user.resume && user.resume.url} target="_blank">
          <button className="rounded-[30px] flex items-center gap-2 p-2 border border-cyan-500  shadow-sm  shadow-cyan-300 text-white hover:bg-cyan-500 ">
            <FaExternalLinkAlt />
            <span>Resume</span>
          </button>
        </Link>
      </div>
    
     
    </div>
    <div className=" sm:w-1/2  flex justify-center items-center relative   ">
    <div className="  w-96  h-96 rounded-full  smooth-up-down  ">
        
    <img src={myimage} alt=""
        className="absolute  left-1  object-cover top-1 sm:mt-10 mt-10  h-96 w-96 border-4 border-cyan-400  p-1  rounded-full shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]  shadow-cyan-300  " />

    </div>



  
    </div>
    <hr className=" mt-28 sm:my-10 md:my-10 z-50  bg-white" />
   
   
    </div>
    
  );
};

export default Hero;
