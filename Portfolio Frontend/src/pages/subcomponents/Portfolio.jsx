import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiExternalLinkLine } from "react-icons/ri";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        const { data } = await axios.get(
          "https://portfolio-backend-code.onrender.com/api/v1/project/getAll",
          { withCredentials: true }

        );
        console.log("project hai ye sb",data)
        setProjects(data.projects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    getMyProjects();
  }, []);

  return (
    <div>
      <div id="projects" className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1 text-white"
          
        >
          MY{" "}
          <span className="text-tubeLight-effect font-extrabold text-cyan-300">
            PROJECTS
          </span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1 text-white"
          
        >
          MY <span className="text-tubeLight-effect font-extrabold text-cyan-500">WORK</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {viewAll
          ? projects &&
            projects.map((element) => (
              
                <div key={element._id}>
                  
               
              <Link to={`/project/${element._id}`} >
             
                <img
                  src={element.projectBanner && element.projectBanner.url}
                  alt={element.title}
                  className="w-full h-auto object-cover rounded-md"
                />
               
              </Link>
              </div>
              
            ))
          : projects &&
            projects.slice(0, 9).map((element) => (
              <div  key={element._id} className=" bg-slate-600 p-5 hover:bg-slate-400 duration-200 hover:scale-95 rounded-md  shadow-sm shadow-cyan-200 ">
               
              <Link to={`/project/${element._id}`}>
                <img
                  src={element.projectBanner && element.projectBanner.url}
                  alt={element.title}
                  className="w-full h-48 object-cover "
                />
              </Link>
              <div className="  font-bold text-white text-center  p-1 rounded-bl-md ">{element.title}</div>
              

              </div>
            ))}
      </div>
      {projects && projects.length > 9 && (
        <div className="w-full text-center my-9">
          <button
            onClick={() => setViewAll(!viewAll)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {viewAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
