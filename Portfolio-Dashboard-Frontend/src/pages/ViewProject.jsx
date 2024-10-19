import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import axios from "axios";

const ViewProject = () => {
  const [project, setProject] = useState({});
  const { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(
          `https://portfolio-backend-code.onrender.com/api/v1/project/get/${id}`,
          { withCredentials: true }
        );
        setProject(response.data.project);
        
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch project.");
      }
    };
    getProject();
  }, [id]);

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const {
    title,
    description,
    technologies,
    stack,
    deployed,
    gitRepoLink,
    projectLink,
    projectBanner,
  } = project;

  const descriptionList = description?.split(". ") || [];
  const technologiesList = technologies?.split(", ") || [];

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <div className="max-w-3xl w-full mx-4 md:mx-auto bg-white border-2 shadow-md rounded-md p-6">
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleReturnToDashboard}
          >
            Return to Dashboard
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <img
              src={projectBanner?.url || "/avatarHolder.jpg"}
              alt="Project Banner"
              className="w-full h-auto mb-4 rounded-md"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Description:</h2>
            <ul className="list-disc pl-6 mb-4">
              {descriptionList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Technologies:</h2>
            <ul className="list-disc pl-6 mb-4">
              {technologiesList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Stack:</h2>
            <p>{stack}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Deployed:</h2>
            <p>{deployed}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Github Repository Link:</h2>
            <a
              href={gitRepoLink}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {gitRepoLink}
            </a>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Project Link:</h2>
            <a
              href={projectLink}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {projectLink}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
