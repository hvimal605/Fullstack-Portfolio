import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



import LoadingButton from "./LoadingButton";
import toast from "react-hot-toast";
import { clearAllSkillErrors } from "../../store/slices/skillSlice";
import { clearAllSoftwareAppErrors, deleteSoftwareApplication, getAllSoftwareApplications, resetSoftwareApplicationSlice } from "../../store/slices/softwareApplicationSlice";

const Dashboard = () => {

  const navigateTo = useNavigate();
  const gotoMangeSkills = () => {
    navigateTo("/manage/skills");
  };
  const gotoMangeTimeline = () => {
    navigateTo("/manage/timeline");
  };
  const gotoMangeProjects = () => {
    navigateTo("/manage/projects");
  };

  const { user } = useSelector((state) => state.user);
  const {
    skills,
    loading: skillLoading,
    error: skillError,
    message: skillMessage,
  } = useSelector((state) => state.skill);
  console.log("ye hai skills", skills)
  const {
    softwareApplications,
    loading: appLoading,
    error: appError,
    message: appMessage,
  } = useSelector((state) => state.softwareApplications);

  const {
    timeline,
    loading: timelineLoading,
    error: timelineError,
    message: timelineMessage,
  } = useSelector((state) => state.timeline);
  const { projects, error: projectError } = useSelector((state) => state.project);

  const [appId, setAppId] = useState(null);
  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (skillError) {
      toast.error(skillError);
      dispatch(clearAllSkillErrors());
    }
    if (appError) {
      toast.error(appError);
      dispatch(clearAllSoftwareAppErrors());
    }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
    if (timelineError) {
      toast.error(timelineError);
      dispatch(clearAllTimelineErrors());
    }
  }, [
    dispatch,
    skillLoading,
    skillError,
    skillMessage,
    appLoading,
    appError,
    appMessage,
    timelineError,
    timelineLoading,
    timelineMessage,
  ]);

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900">
                    About Me
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                     <span className=" font-serif font-semibold text-red-500">"{user.aboutMe}"</span>                   </p>
                </div>
                <div className="px-4 py-4 sm:px-6">
                  <button
                    onClick={gotoMangeSkills}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Visit Profile
                  </button>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900">
                    Projects Completed
                  </h3>
                  <p className="mt-1 text-6xl font-semibold">
                    {projects && projects.length}
                  </p>
                </div>
                <div className="px-4 py-4 sm:px-6">
                  <button
                    onClick={gotoMangeProjects}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Manage Projects
                  </button>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900">
                    Skills
                  </h3>
                  <p className="mt-1 text-6xl font-semibold">
                    {skills && skills.length}
                  </p>
                </div>
                <div className="px-4 py-4 sm:px-6">
                  <button
                    onClick={gotoMangeSkills}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Manage Skills
                  </button>
                </div>
              </div>
            </div>


            <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
  <div className="px-4 py-5 sm:px-6">
    <h3 className="text-lg font-semibold leading-6 text-gray-900">
      Projects
    </h3>
  </div>
  <div className="px-4 py-4 sm:px-6">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Stack
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Deployed
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Update
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Visit
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects && projects.length > 0 ? (
            projects.map((element) => (
              <tr key={element._id} className="bg-accent">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {element.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {element.stack}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {element.deployed}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/update/project/${element._id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Update
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a
                    href={element.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Visit
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-4 whitespace-nowrap text-3xl text-gray-500"
              >
                You have not added any project.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>

              <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900">
                    Timeline
                  </h3>
                  <button
                    onClick={gotoMangeTimeline}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Manage Timeline
                  </button>
                </div>
                <div className="px-4 py-4 sm:px-6">
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:w-1/4">
            From
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:w-1/4">
            To
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {timeline && timeline.length > 0 ? (
          timeline.map((element) => (
            <tr key={element._id} className="bg-accent">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {element.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:w-1/4">
                {element.timeline.from}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:w-1/4">
                {element.timeline.to}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-3xl text-gray-500">
              You have not added any timeline.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

              </div>
            </div>
            <div className=" sm:flex sm:gap-4">
            <div className="bg-white shadow-md rounded-md p-4 sm:w-1/2 mb-4">
      <h2 className="text-lg font-semibold mb-4">Skill Proficiency</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((skill) => (
          <div key={skill._id} className="flex items-center p-4 rounded-md bg-gray-100">
            <div style={{ width: "100px", height: "100px" }}>
              <CircularProgressbar
                value={skill.proficiency}
                text={`${skill.proficiency}%`}
                
                styles={{
                  root: { width: "100%", height: "100%" }, // Ensures the progress bar fills its container
                  path: { stroke: `#3498db` },
                  trail: { stroke: "#d6d6d6" },
                  text: { fill: "#3498db", fontSize: "16px", fontWeight: "bold" } // Adjusted font size for text inside the progress bar
                }}
              />
            </div>
            <p className="ml-2 text-lg font-semibold">{skill.title}</p>
          </div>
        ))}
      </div>
    </div>
            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 sm:w-1/2 ">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  Software Applications
                </h3>
              </div >
              <div className="px-4 py-4 sm:px-6">
  <div className="overflow-x-auto">
    <table className="w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Icon
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {softwareApplications && softwareApplications.length > 0 ? (
          softwareApplications.map((element) => (
            <tr key={element._id} className="bg-accent">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {element.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <img
                  className="w-14 h-14"
                  src={element.svg && element.svg.url}
                  alt={element.name}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium justify-end">
                {appLoading && appId === element._id ? (
                  <LoadingButton content={"Deleting"} />
                ) : (
                  <button
                    onClick={() => handleDeleteSoftwareApp(element._id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={3}
              className="px-6 py-4 whitespace-nowrap text-3xl text-gray-500"
            >
              You have not added any software applications.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

            </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
