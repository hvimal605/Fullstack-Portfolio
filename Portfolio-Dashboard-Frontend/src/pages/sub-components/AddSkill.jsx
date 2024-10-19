import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewSkill, clearAllSkillErrors, getAllSkills, resetSkillSlice } from "../../store/slices/skillSlice";
import { useDropzone } from "react-dropzone";
import LoadingButton from "./LoadingButton";
import toast from "react-hot-toast";

const AddSkill = () => {
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [svg, setSvg] = useState(null);
  const [svgPreview, setSvgPreview] = useState("");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvgPreview(reader.result);
      setSvg(file);
    };
  };

  const { loading, message, error } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  const handleAddNewSkill = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("proficiency", proficiency);
    if (svg) {
      formData.append("svg", svg);
    }

    dispatch(addNewSkill(formData));
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
      // Clear form after successful submission
      setTitle("");
      setProficiency("");
      setSvg(null);
      setSvgPreview("");
    }
  }, [dispatch, loading, error, message]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form className="w-[100%] px-5 md:w-[650px]" onSubmit={handleAddNewSkill}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
              ADD A NEW SKILL
            </h2>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    className="block w-full border-2 border-gray-400 bg-transparent py-1.5 pl-1 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="React.JS"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Proficiency
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    className="block w-full  border-2 border-gray-400 bg-transparent py-1.5 pl-1 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="30"
                    value={proficiency}
                    onChange={(e) => setProficiency(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Skill Svg
                </label>
                <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-500 px-2 py-8">
                  <div className="text-center" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {svgPreview ? (
                      <img
                        className="mx-auto  h-36 w-36 text-gray-300"
                        src={svgPreview}
                        alt="Preview"
                      />
                    ) : (
                      <>
                        <span className=" text-blue-400 font-semibold text-xl">Upload</span>
                        <p>  PNG, JPG, GIF up to 10MB</p>
                        <p className="mt-1 text-sm text-gray-600">Drag 'n' drop an image here, or click to select one</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          {!loading ? (
            <button className="bg-blue-500 text-white p-2 rounded-md"
            type="submit" >
              Add Skill
            </button>
          ) : (
            <LoadingButton content="Adding New Skill" />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddSkill;
