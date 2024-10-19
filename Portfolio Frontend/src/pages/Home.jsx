import React from "react";
import Hero from "./subcomponents/Hero";
import Timeline from "./subcomponents/Timeline";
import About from "./subcomponents/About";
import Skills from "./subcomponents/Skills";
import Portfolio from "./subcomponents/Portfolio";
import MyApps from "./subcomponents/MyApps";
import Contact from "./subcomponents/Contact";
import Navbar from "./subcomponents/Navbar";


const Home = () => {
  return (
    <article  className="px-5    sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14  ">
      <Navbar/>
      <Hero />
      <About />
      <Timeline />
      
      <Skills />
      <Portfolio />
      <MyApps />
      <Contact />
      
    </article>
  );
};

export default Home;