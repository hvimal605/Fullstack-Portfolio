

import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import ProjectView from './pages/ProjectView'
import Footer from './pages/Footer'
import './App.css'

function App() {


  return (
    < >

        <div className='  bg-neutral-900'>
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectView />} />

        </Routes>
        <Footer />
 
        <Toaster/>
      </Router>
      </div>
    </>
  )
}

export default App
