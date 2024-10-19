import axios from "axios";
import React, { useEffect, useState } from "react";


const MyApps = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getMyApps = async () => {
      try {
        const { data } = await axios.get(
          "https://portfolio-backend-code.onrender.com/api/v1/softwareApplication/getAll",
          { withCredentials: true }
        );
        console.log("ye 11",data)
        setApps(data.softwareApplicationsRes);
      } catch (error) {
        console.error("Failed to fetch apps:", error);
      }
    };
    getMyApps();
  }, []);
  

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12 text-white">
      <h1 className="text-tubeLight-effect text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-15px dancing_text mx-auto w-fit">
        MY  <span className=" text-cyan-500">APPS</span>
        
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {apps.map((element) => (
          <div
            className="h-fit p-5 rounded-lg hover:scale-105 duration-200 bg-gray-900 hover:bg-slate-700 flex flex-col justify-center items-center gap-3 border"
            key={element._id}
          >
            <img
              src={element.svg && element.svg.url}
              alt="app icon"
              className="h-12 sm:h-24 w-auto"
            />
            <p className="text-muted-foreground text-center">{element.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApps;
