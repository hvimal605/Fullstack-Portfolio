import React, { useEffect, useState } from 'react'
import { GoPackage } from "react-icons/go";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearAllUserErrors, logout } from '../store/slices/userSlice';
import { GoHome } from "react-icons/go";
import { LuFolderGit } from "react-icons/lu";
import { LuPencilRuler } from "react-icons/lu";
import { LuLayoutGrid } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { IoMdMenu } from "react-icons/io"
import { CgCloseO } from "react-icons/cg";
import Dashboard from './sub-components/Dashboard';
import AddProject from './sub-components/AddProject';
import AddSkill from './sub-components/AddSkill';
import AddSoftwareApplications from './sub-components/AddSoftwareApplications ';
import Messages from './sub-components/Messages';
import Account from './sub-components/Account';
import AddTimeline from './sub-components/AddTimeline';
const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [active, setActive] = useState("Dashboard");

  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out!");
  };
  const navigateTo = useNavigate();
 


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-100 ">
      <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col  border-r bg-white  sm:flex z-40">
      <nav className="flex flex-col items-center gap-4 sm:py-5">
  {/* Package Link */}
  <Link
    className={`group relative flex h-9 w-9 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold md:h-8 md:w-8 md:text-base`}
  >
    <GoPackage className="text-2xl transition-all group-hover:scale-110" />
    
  </Link>

  {/* Dashboard Link */}
  <Link
    className={`group relative flex items-center justify-center gap-2 rounded-md bg-primary text-lg font-semibold w-full py-1 ${active === "Dashboard" ? "bg-lime-300" : ""}`}
    onClick={() => setActive("Dashboard")}
  >
    <GoHome className="text-3xl transition-all group-hover:scale-110" />
    <span className="group-hover:visible invisible bg-red-200 shadow-md rounded-md absolute left-16 p-2 z-10">Dashboard</span>
  </Link>

  {/* Add Project Link */}
  <Link
    className={`group relative flex items-center justify-center gap-2 rounded-md bg-primary text-lg font-semibold w-full py-1 ${active === "Add Project" ? "bg-lime-300" : ""}`}
    onClick={() => setActive("Add Project")}
  >
    <LuFolderGit className="text-3xl transition-all group-hover:scale-110" />
    <span className="group-hover:visible invisible bg-red-200 shadow-md rounded-md absolute left-16 w-28 p-2 z-10">Add Project</span>
  </Link>

  {/* Add Skill Link */}
  <Link
    className={`group relative flex items-center justify-center gap-2 rounded-md bg-primary text-lg font-semibold w-full py-1 ${active === "Add Skill" ? "bg-lime-300" : ""}`}
    onClick={() => setActive("Add Skill")}
  >
    <LuPencilRuler className="text-3xl transition-all group-hover:scale-110" />
    <span className="group-hover:visible invisible bg-red-200 shadow-md rounded-md absolute left-16 p-2 w-24 z-10">Add Skill</span>
  </Link>

  {/* Add Uses Link */}
  <Link
    className={`group relative flex items-center justify-center gap-2 rounded-md bg-primary text-lg font-semibold w-full py-1 ${active === "Add Uses" ? "bg-lime-300" : ""}`}
    onClick={() => setActive("Add Uses")}
  >
    <LuLayoutGrid className="text-3xl transition-all group-hover:scale-110" />
    <span className="group-hover:visible invisible bg-red-200 shadow-md rounded-md absolute left-16 p-2   w-24 z-10">Add Uses</span>
  </Link>

  {/* Account Link */}
  <Link
    className={`group relative flex items-center justify-center gap-2 rounded-md bg-primary text-lg font-semibold w-full py-1 ${active === "Account" ? "bg-lime-300" : ""}`}
    onClick={() => setActive("Account")}
  >
    <FaRegUserCircle className="text-3xl transition-all group-hover:scale-110" />
    <span className="group-hover:visible invisible bg-red-200 shadow-md rounded-md absolute left-16 p-2 z-10">Account</span>
  </Link>

  {/* Timeline Link */}
  <Link
    className={`group relative flex items-center justify-center gap-2 rounded-md bg-primary text-lg font-semibold w-full py-1 ${active === "Add Timeline" ? "bg-lime-300" : ""}`}
    onClick={() => setActive("Add Timeline")}
  >
    <FaHistory className="text-3xl transition-all group-hover:scale-110" />
    <span className="group-hover:visible invisible bg-red-200 shadow-md rounded-md absolute left-16 p-2 z-10">Timeline</span>
  </Link>

  {/* Messages Link */}
  <Link
    className={`group relative flex items-center justify-center gap-2 rounded-md bg-primary text-lg font-semibold w-full py-1 ${active === "Messages" ? "bg-lime-300" : ""}`}
    onClick={() => setActive("Messages")}
  >
    <LuMessageSquare className="text-3xl transition-all group-hover:scale-110" />
    <span className="group-hover:visible invisible bg-red-200 shadow-md rounded-md absolute left-16 p-2 z-10">Messages</span>
  </Link>

  {/* Logout Link */}
  <Link
    className={`group relative flex items-center justify-center gap-2 rounded-md bg-primary text-lg font-semibold w-full py-1`}
    onClick={handleLogout}
  >
    <LuLogOut className="text-3xl transition-all group-hover:scale-110" />
    <span className="group-hover:visible invisible bg-red-200 shadow-md rounded-md absolute left-16 p-2 z-10">Logout</span>
  </Link>
</nav>

        
      </aside>
      <div className=" items-center gap-4  sm:ml-16 sm:mt-5 sm:flex hidden">
          <img
            src={user && user.avatar && user.avatar.url}
            alt="avatar"
            className="    w-20 h-20   object-cover  rounded-full max-[900px]:w-16 max-[900px]:h-16 "
          />
          <h1 className="text-4xl max-[900px]:text-2xl">
            Welcome back, <span className=' text-red-600 font-semibold '>{user.fullName}</span>
          </h1>
        </div>

      {/* //for mobile */}
      <header className='bg-red-300 w-[100%] h-20 flex gap-  items-center sm:hidden'>
      

        <IoMdMenu className=' text-4xl ml-3 ' onClick={toggleModal} />
        <div className="text-xl m-3 ">
            Welcome back, {user.fullName}
          </div>
      </header>
      <div>
        <div className={`${isModalOpen ? "left-[0%]" : ""} bg-green-200 fixed left-[-100%] top-0 h-[97vh] w-[85vw] transition-all duration-300 z-50 `}>
          <div className=' flex '>
            <div className=' h-[90vh] w-[100%] flex flex-col'>
              <div>
                <img src={user && user.avatar && user.avatar.url}  alt="avatar" 
               className=' w-16 h-16  bg-slate-800 rounded-full ml-7 mt-3 object-cover  ' />
              </div>
              <div>
              <nav className="flex flex-col ml-8 gap-8 px-2 py-5">
          <Link className={`group  flex  shrink-0 items-center  gap-1 px-9 rounded-full  text-lg font-semibold  md:h-8 md:w-8 md:text-base 
     `}

          >
            <GoPackage className="text-3xl transition-all group-hover:scale-110   " />
            <span className='     p-2  ' >Package</span>
           

          </Link>

          <Link className={`group flex  shrink-0 items-center  gap-1 px-9 rounded-full  text-lg font-semibold  md:h-8 md:w-8 md:text-base 
       ${active === "Dashboard" ? " bg-lime-300 " : ""}`}
            onClick={() => setActive("Dashboard")}
          >
            <GoHome className="text-3xl transition-all group-hover:scale-110  " />
            <span className='  rounded-md     p-2  ' >Dashboard</span>
            
            

          </Link>
          

          <Link className={`group  flex  shrink-0 items-center  gap-1 px-8 rounded-full bg-primary text-lg font-semibold  md:h-8 md:w-8 md:text-base 
       ${active === "Add Project" ? " bg-lime-400 " : ""}`}
            onClick={() => setActive("Add Project")}
          >
            <LuFolderGit className="text-3xl transition-all group-hover:scale-110 " />
            <span className='  rounded-md  p-2   ' >Add Project</span>
            

          </Link>


          <Link className={`group relative flex  shrink-0 items-center gap-1 px-8 rounded-full bg-primary text-lg font-semibold  md:h-8 md:w-8 md:text-base 
       ${active === "Add Skill" ? " bg-lime-400 " : ""}`}
            onClick={() => setActive("Add Skill")}
          >
            <LuPencilRuler className="text-3xl transition-all group-hover:scale-110 " />
            <span className='  rounded-md    p-2   ' >Add Skill</span>
            

          </Link>

          <Link className={`group relative flex  shrink-0 items-center  gap-1 px-8 rounded-full bg-primary text-lg font-semibold  md:h-8 md:w-8 md:text-base 
       ${active === "Add Uses" ? " bg-lime-400 " : ""}`}
            onClick={() => setActive("Add Uses")}
          >
            <LuLayoutGrid className="text-3xl transition-all group-hover:scale-110 " />
            <span className='  rounded-md    p-2  ' >Add Uses</span>
            

          </Link>

          <Link className={`group relative flex  shrink-0 items-center  gap-1 px-8 rounded-full bg-primary text-lg font-semibold  md:h-8 md:w-8 md:text-base 
       ${active === "Account" ? " bg-lime-400 " : ""}`}
            onClick={() => setActive("Account")}
          >
            <FaRegUserCircle className="text-3xl transition-all group-hover:scale-110 " />
            <span className='  rounded-md   p-2   ' >Account</span>
            

          </Link>

          <Link className={`group relative flex  shrink-0 items-center gap-1 px-8 rounded-full bg-primary text-lg font-semibold  md:h-8 md:w-8 md:text-base 
       ${active === "Timeline" ? " bg-lime-400 " : ""}`}
            onClick={() => setActive("Timeline")}
          >
            <FaHistory className="text-3xl transition-all group-hover:scale-110 " />
            <span className='  rounded-md  a p-2  ' >Timeline</span>
           
          </Link>

          <Link className={`group relative flex shrink-0 items-center  gap-1 px-8 rounded-full bg-primary text-lg font-semibold  md:h-8 md:w-8 md:text-base 
       ${active === "Messages" ? " bg-lime-400 " : ""}`}
            onClick={() => setActive("Messages")}
          >
            <LuMessageSquare className="text-3xl transition-all group-hover:scale-110 " />
            <span className='  rounded-md    p-2 ' >Messages</span>
          

          </Link>

          <Link className={`group  flex shrink-0  items-center   item  gap-1 px-8 rounded-full bg-primary text-lg font-semibold  md:h-8 md:w-8 md:text-base 
       `}
            onClick={handleLogout}
          >   
          
            < LuLogOut className="text-3xl transition-all group-hover:scale-110 " />
            <span className='  p-2  ' >Logout</span>
            

          </Link>



        </nav>
              </div>
            </div>
            <CgCloseO className='  m-4 h-10 text-4xl' onClick={toggleModal} />
          </div>

        </div>


      </div>

      <div className=' m-2 mt-2 sm:ml-20 sm:mt-12 ' >
         {(() => {
        switch (active) {
          case "Dashboard":
            return <Dashboard/>;
            break;
          case "Add Project":
            return <AddProject />;
            break;
          case "Add Skill":
            return <AddSkill/>;
            break;
          case "Add Uses":
            return <AddSoftwareApplications/>;
            break;
          case "Add Timeline":
            return <AddTimeline />;
            break;
          case "Messages":
            return <Messages/>;
            break;
          case "Account":
            return <Account/>;
            break;
          default:
            return <Dashboard/>;
            break;
        }
      })()}
      </div>


    </div>
  )
}

export default HomePage