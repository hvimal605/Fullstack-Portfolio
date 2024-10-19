import axios from "axios";
import React, { useEffect, useState } from "react";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const getMySkills = async () => {
      try {
        const { data } = await axios.get(
          "https://portfolio-backend-code.onrender.com/api/v1/skill/getAll",
          { withCredentials: true }
        );
        setSkills(data.skills);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };

    getMySkills();
  }, []);

  return (
    <div id="skills" className="w-full flex flex-col gap-8 sm:gap-12 text-white relative">
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
        SKILLS
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 z-20">
  {skills &&
    skills.map((element) => (
      <div
        key={element._id}
        className="h-fit p-7 flex flex-col justify-center items-center gap-3 rounded-md shadow-sm shadow-cyan-300 bg-gray-800 hover:scale-105 hover:bg-slate-600 duration-200 "
      >
        <img
          src={element.svg && element.svg.url}
          alt="skill"
          className="h-12 sm:h-24 w-auto"
        />
        <p className="text-muted-foreground text-center">
          {element.title}
        </p>
      </div>
    ))} 
 
     </div>
   
    </div>
  );
};

export default Skills;
