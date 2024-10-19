import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import LoadingButton from './LoadingButton';
import { clearAllUserErrors, getUser, resetProfile, updateProfile } from '../../store/slices/userSlice';
import toast from 'react-hot-toast';

const UpdateProfile = () => {
    const { user, loading, error, isUpdated, message } = useSelector((state) => state.user);

    const [fullName, setFullName] = useState(user && user.fullName);
    const [email, setEmail] = useState(user && user.email);
    const [phone, setPhone] = useState(user && user.phone);
    const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
    const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL);
    const [linkedInURL, setLinkedInURL] = useState(user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL));
    const [githubURL, setGithubURL] = useState(user && (user.githubURL === "undefined" ? "" : user.githubURL));
    const [instagramURL, setInstagramURL] = useState(user && (user.instagramURL === "undefined" ? "" : user.instagramURL));
    const [twitterURL, setTwitterURL] = useState(user && (user.twitterURL === "undefined" ? "" : user.twitterURL));
    const [facebookURL, setFacebookURL] = useState(user && (user.facebookURL === "undefined" ? "" : user.facebookURL));
    const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
    const [avatarPreview, setAvatarPreview] = useState(user && user.avatar && user.avatar.url);
    const [resume, setResume] = useState(user && user.resume && user.resume.url);
    const [resumePreview, setResumePreview] = useState(user && user.resume && user.resume.url);
    const dispatch = useDispatch();


    const avatarHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setAvatarPreview(reader.result);
          setAvatar(file);
        };
      };
      const resumeHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setResumePreview(reader.result);
          setResume(file);
        };
      };

      const handleUpdateProfile = () => {
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("aboutMe", aboutMe);
        formData.append("portfolioURL", portfolioURL);
        formData.append("linkedInURL", linkedInURL);
        formData.append("githubURL", githubURL);
        formData.append("instagramURL", instagramURL);
        formData.append("twitterURL", twitterURL);
        formData.append("facebookURL", facebookURL);
        formData.append("avatar", avatar);
        formData.append("resume", resume);
        dispatch(updateProfile(formData));
      };
    

      useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearAllUserErrors());
        }
        if (isUpdated) {
          dispatch(getUser());
          dispatch(resetProfile());
        }
        if (message) {
          toast.success(message);
        }
      }, [dispatch, loading, error, isUpdated]);








    return (
        <div>
        <div className=' sm:w-[50vw] w-[93vw] shadow-md sm:ml-10 m-2 bg-white rounded p-1  '>
            <div className=' text-center text-4xl font-bold'>Update Profile</div>
            <div className=' sm:flex md:flex  justify-evenly h-full m-6'>

                <div className=' md:w-[40%]  flex flex-col justify-center items-center  rounded-3xl gap-6 '>

                    <img src={avatarPreview ? avatarPreview : user.avatar.url} alt="avatar"
                        className=' w-60 h-60 border-4 shadow-lg  border-white object-cover' />
                    <div className='text-xl font-semibold text-emerald-800'>Profile Image</div>
                    <div className="relative">
                    <input
                      type="file"
                      onChange={avatarHandler}
                      className="avatar-update-btn"
                    />
                  </div>
                </div>

                <div className=' md:w-[40%]  flex flex-col justify-center items-center  rounded-3xl gap-5 sm:mt-0 mt-5 '>
                <Link
                    to={user && user.resume && user.resume.url}
                    target="_blank"
                  >
                    <img src={resumePreview ? resumePreview : "/avatarHolder.jpg"} alt=""
                        className='   w-60 h-60 rounded-sm border-4 shadow-lg object-cover hover:scale-100 ' />
                </Link>
                    <div className='text-xl font-semibold text-emerald-800'>Resume</div>
                    <div className="relative">
                    <input
                      type="file"
                      onChange={resumeHandler}
                      className="avatar-update-btn"
                    />
                  </div>
                    
                </div>

            </div>

        </div>
        <div className='w-[50vw] m-10 flex flex-col gap-5  ' >
            <div className=" flex flex-col gap-2">
                <label className=' p-1 font-semibold'>Full Name</label>
                <input type="text" className=' p-2 bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold  '  value={fullName}
                  onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
                <label>Email</label>
                <input type="email" className=' p-2  bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold' value={email}
                  onChange={(e) => setEmail(e.target.value)}   />
            </div>
            <div className="flex flex-col gap-2">
                <label>Phone</label>
                <input type="text" className=' p-2  bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold' value={phone}
                  onChange={(e) => setPhone(e.target.value)}  />
            </div>
            <div className="flex flex-col gap-2">
                <label>About Me</label>
                <textarea className=' p-2 bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold0' value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
                <label>Portfolio URL</label>
                <input type="text" className=' p-2  bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold'value={portfolioURL}
                  onChange={(e) => setPortfolioURL(e.target.value)}  />
            </div>
            <div className="flex flex-col gap-2">
                <label>Github URL</label>
                <input type="text" className=' p-2  bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold' value={githubURL}
                  onChange={(e) => setGithubURL(e.target.value)}  />
            </div>
            <div className="flex flex-col gap-2">
                <label>LinkedIn URL</label>
                <input type="text" className=' p-2  bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold' value={linkedInURL}
                  onChange={(e) => setLinkedInURL(e.target.value)}  />
            </div>
            <div className="flex flex-col gap-2">
                <label>Instagram URL</label>
                <input type="text" className=' p-2  bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold' value={instagramURL}
                  onChange={(e) => setInstagramURL(e.target.value)}  />
            </div>
            <div className="flex flex-col gap-2">
                <label>Twitter(X) URL</label>
                <input type="text" className=' p-2  bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold' value={twitterURL}
                  onChange={(e) => setTwitterURL(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
                <label>Facebook URL</label>
                <input type="text" className=' p-2  bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold' value={facebookURL}
                  onChange={(e) => setFacebookURL(e.target.value)}  />
            </div>
            <div className=' flex  justify-center'>
                {
                    ! loading ? <button
                   onClick={() => handleUpdateProfile()}
                    className=' bg-blue-500 p-2 rounded-md font-bold text-white '
                    >Update</button> : <LoadingButton content={"updating..."}/>
                }
            </div>
        </div>

    
    </div >
    )
}

export default UpdateProfile