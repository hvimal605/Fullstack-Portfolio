import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllProjects, resetProjectSlice, updateProject } from "../store/slices/projectSlice";
import toast from "react-hot-toast";
import LoadingButton from "./sub-components/LoadingButton";

const UpdateProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    stack: "",
    gitRepoLink: "",
    deployed: "",
    projectLink: "",
    projectBanner: null,
    projectBannerPreview: "",
  });

  const { error, message, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(`https://portfolio-backend-code.onrender.com/api/v1/project/get/${id}`, {
          withCredentials: true,
        });
        const { project } = response.data;
        setFormData({
          title: project.title,
          description: project.description,
          stack: project.stack,
          deployed: project.deployed,
          technologies: project.technologies,
          gitRepoLink: project.gitRepoLink,
          projectLink: project.projectLink,
          projectBanner: project.projectBanner,
          projectBannerPreview: project.projectBanner?.url || "",
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch project.");
      }
    };
    getProject();

    // Clean up function for resetting state
    return () => {
      dispatch(resetProjectSlice());
    };
  }, [id, dispatch]);

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "projectBanner" && value instanceof File) {
        formDataToSend.append("projectBanner", value);
      } else {
        formDataToSend.append(key, value);
      }
    });
    dispatch(updateProject(id, formDataToSend));

    // Display toast message on success
    toast.promise(
      dispatch(updateProject(id, formDataToSend)),
      {
        loading: 'Updating...',
        success: 'Project updated successfully!',
        error: 'Failed to update project',
      }
    );
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "projectBanner" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          projectBanner: file,
          projectBannerPreview: reader.result,
        }));
      };
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <form onSubmit={handleUpdateProject} className="max-w-3xl w-full mx-4 md:mx-auto bg-white shadow-md rounded-md p-6">
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-gray-900">Update Project</h2>
              <button onClick={handleReturnToDashboard} className="text-indigo-100 p-2 bg-orange-500 rounded-md hover:text-indigo-700">Return to Dashboard</button>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="projectBanner" className="block text-sm font-medium text-gray-900">Project Banner</label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="projectBanner"
                    name="projectBanner"
                    onChange={handleChange}
                    className=" avatar-update-btn border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md"
                  />
                  {formData.projectBannerPreview && (
                    <img
                      src={formData.projectBannerPreview}
                      alt="Project Banner Preview"
                      className="mt-2 rounded-md h-auto w-full"
                    />
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-900">Project Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-2 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border rounded-md"
                  placeholder="Enter Project Title"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-2 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border rounded-md"
                  placeholder="Enter Project Description"
                />
              </div>
              <div>
                <label htmlFor="technologies" className="block text-sm font-medium text-gray-900">Technologies Used</label>
                <textarea
                  id="technologies"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  className="mt-2 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border rounded-md"
                  placeholder="Enter Technologies Used"
                />
              </div>
              <div>
                <label htmlFor="stack" className="block text-sm font-medium text-gray-900">Stack</label>
                <select
                  id="stack"
                  name="stack"
                  value={formData.stack}
                  onChange={handleChange}
                  className="mt-2 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border rounded-md"
                >
                  <option value="">Select Project Stack</option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="MERN">MERN</option>
                  <option value="MEAN">MEAN</option>
                  <option value="Next.JS">Next.JS</option>
                  <option value="React.JS">React.JS</option>
                </select>
              </div>
              <div>
                <label htmlFor="deployed" className="block text-sm font-medium text-gray-900">Deployed</label>
                <select
                  id="deployed"
                  name="deployed"
                  value={formData.deployed}
                  onChange={handleChange}
                  className="mt-2 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border rounded-md"
                >
                  <option value="">Is this project deployed?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label htmlFor="gitRepoLink" className="block text-sm font-medium text-gray-900">Github Repository Link</label>
                <input
                  type="text"
                  id="gitRepoLink"
                  name="gitRepoLink"
                  value={formData.gitRepoLink}
                  onChange={handleChange}
                  className="mt-2 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border rounded-md"
                  placeholder="Enter Github Repo Link"
                />
              </div>
              <div>
                <label htmlFor="projectLink" className="block text-sm font-medium text-gray-900">Project Link</label>
                <input
                  type="text"
                  id="projectLink"
                  name="projectLink"
                  value={formData.projectLink}
                  onChange={handleChange}
                  className="mt-2 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border rounded-md"
                  placeholder="Enter Project Link"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            {loading ? (
              <LoadingButton content={"Updating.."} />
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Update
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
