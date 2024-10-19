import React, { useState } from 'react'
import { IoSettings } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaRegPenToSquare } from "react-icons/fa6";
import { TbPasswordUser } from "react-icons/tb";
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';
const Account = () => {
    const [active ,setActive] = useState("Profile")
  return (
    <div className=' md:flex '>
        <div className='  p-4 sm:w-[90%] lg:w-[25%] md:w-[50%] flex flex-col items-center rounded-md  '>
            
            <div className=' font-bold text-4xl flex items-center gap-2 h-10'>
            <span><IoSettings/> </span>
            Settings
            
            </div>
            <div className=' mt-6  flex flex-col gap-5 text-xl text-gray-500 font-semibold '>
            <div className={`flex items-center gap-2 p-2 rounded-xl hover:scale-105 hover:text-black ${active==="Profile" ? " text-white bg-blue-500 ":""}`}
             onClick={()=>setActive("Profile")}><CgProfile />Profile</div>
            <div className={`flex items-center gap-2 p-2 rounded-xl hover:scale-105 hover:text-black ${active==="Update Profile" ? " text-white bg-blue-500 ":""}`}
             onClick={()=>setActive("Update Profile")}  ><FaRegPenToSquare />Update Profile</div>
            <div className={`flex items-center gap-2 p-2 rounded-xl hover:scale-105 hover:text-black ${active==="Update Password" ? " text-white bg-blue-500 ":""}`}
             onClick={()=>setActive("Update Password")}  ><TbPasswordUser />Update Password</div>
            </div>
        </div> 
        
        <div>
            {(() => {
              switch (active) {
                case "Profile":
                  return <Profile />;
                  break;
                case "Update Profile":
                  return <UpdateProfile/>;
                  break;
                case "Update Password":
                  return <UpdatePassword />;
                  break;
                default:
                  return <Profile />;
                  break;
              }
            })()}
          </div>
   
        


    </div>
  )
}

export default Account