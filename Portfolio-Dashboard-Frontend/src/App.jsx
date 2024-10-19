import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import ManageSkill from "./pages/ManageSkill"
import ManageTimeline from "./pages/ManageTimeline"
import ManageProject from "./pages/ManageProject"
import ViewProject from "./pages/ViewProject"
import UpdateProject from "./pages/UpdateProject"
import { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux"
import { getUser } from "./store/slices/userSlice"
import { useEffect } from "react"
import './App.css'
import { getAllMessages } from "./store/slices/messageSlice"
import { getAllTimeline } from "./store/slices/timelineSlice"
import { getAllSkills } from "./store/slices/skillSlice"

import { getAllProjects } from "./store/slices/projectSlice"
import { getAllSoftwareApplications } from "./store/slices/softwareApplicationSlice"



function App() {
 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllMessages())
    dispatch(getAllTimeline())
    dispatch(getAllSkills())
    dispatch(getAllSoftwareApplications())
    dispatch(getAllProjects())
  }, []);

  return (
    <>
    
     
        
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="/manage/skills" element={<ManageSkill/>} />
            <Route path="/manage/timeline" element={<ManageTimeline />} />
            <Route path="/manage/projects" element={<ManageProject />} />
            <Route path="/view/project/:id" element={<ViewProject />} />
            <Route path="/update/project/:id" element={<UpdateProject />} />

          </Routes>
        </Router>
        <Toaster />

     
    </>
  )
}

export default App
