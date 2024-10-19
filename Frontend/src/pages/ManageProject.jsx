import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

import { clearAllProjectErrors, deleteProject, getAllProjects, resetProjectSlice } from '../store/slices/projectSlice';
import toast from 'react-hot-toast';

const ManageProjects = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { projects, loading, error, message } = useSelector((state) => state.project);

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const handleProjectDelete = (id) => {
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    dispatch(getAllProjects());
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Your Projects</h2>
        <button 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={handleReturnToDashboard}
        >
          Return to Dashboard
        </button>
      </div>
      <div className="bg-white shadow-md rounded-md p-4">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Banner</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2 hidden md:table-cell">Stack</th>
              <th className="px-4 py-2 hidden md:table-cell">Deployed</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects && projects.length > 0 ? (
              projects.map((element) => (
                <tr className="bg-gray-100" key={element._id}>
                  <td className="border px-4 py-2">
                    <img 
                      src={element.projectBanner?.url} 
                      alt={element.title} 
                      className="w-16 h-16" 
                    />
                  </td>
                  <td className="border px-4 py-2">{element.title}</td>
                  <td className="border px-4 py-2 hidden md:table-cell">{element.stack}</td>
                  <td className="border px-4 py-2 hidden md:table-cell">{element.deployed}</td>
                  <td className="border px-4 py-2 flex gap-3">
                    <Link to={`/view/project/${element._id}`}>
                      <button 
                        className="border-green-600 border-2 rounded-full h-8 w-8 flex 
                        justify-center items-center text-green-600 hover:text-white hover:bg-green-600"
                      >
                        <FaRegEye className="h-5 w-5" />
                      </button>
                    </Link>
                    <Link to={`/update/project/${element._id}`}>
                      <button 
                        className="border-yellow-400 border-2 rounded-full h-8 w-8 flex 
                        justify-center items-center text-yellow-400 hover:text-white hover:bg-yellow-400"
                      >
                        <FaPencil className="h-5 w-5" />
                      </button>
                    </Link>
                    <button 
                      className="border-red-600 border-2 rounded-full h-8 w-8 flex 
                      justify-center items-center text-red-600 hover:text-white hover:bg-red-600"
                      onClick={() => handleProjectDelete(element._id)}
                    >
                      <FaRegTrashAlt className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-4 py-2 text-center" colSpan="5">
                  You have not added any projects.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProjects;

