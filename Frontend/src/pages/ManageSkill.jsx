import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { FaRegTrashAlt } from "react-icons/fa";
import { clearAllSkillErrors, deleteSkill, getAllSkills, resetSkillSlice, updateSkill } from "../store/slices/skillSlice";
import toast from "react-hot-toast";



const ManageSkills = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const { loading, skills, error, message } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  const [newProficiency, setNewProficiency] = useState(1);
  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency);
  };

  const handleUpdateSkill = (id) => {
    dispatch(updateSkill(id, newProficiency));
  };

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Manage Your Skills</h1>
          <button
            onClick={handleReturnToDashboard}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {skills.map((element) => (
            <div key={element._id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{element.title}</h2>
                <FaRegTrashAlt
                  onClick={() => handleDeleteSkill(element._id)}
                  className="h-6 w-6 text-red-600 cursor-pointer hover:text-red-800"
                />
              </div>
              <div className="flex items-center">
                <label className="text-lg mr-2">Proficiency:</label>
                <input
                  type="number"
                  defaultValue={element.proficiency}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onBlur={() => handleUpdateSkill(element._id)}
                  className="border rounded p-2 w-16"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageSkills;
