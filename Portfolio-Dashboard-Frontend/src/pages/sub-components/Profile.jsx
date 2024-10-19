import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    return (
    <div>
        <div className=' sm:w-[50vw] w-[93vw] shadow-md sm:ml-10 m-2 bg-white rounded p-1  '>
            <div className=' text-center text-4xl font-bold'>Profile</div>
            <div className=' sm:flex md:flex  justify-evenly h-full m-6'>

                <div className=' md:w-[40%]  flex flex-col justify-center items-center  rounded-3xl gap-6 '>

                    <img src={user.avatar.url} alt="avatar"
                        className=' w-60 h-60 border-4 shadow-lg  border-white object-cover ' />
                    <div className='text-xl font-semibold text-emerald-800'>Profile Image</div>
                </div>

                <div className=' md:w-[40%]  flex flex-col justify-center items-center  rounded-3xl gap-5 sm:mt-0 mt-5 '>

                    <img src={user.resume.url} alt=""
                        className='  w-60 h-60 rounded-sm border-4 shadow-lg object-cover ' />
                    <div className='text-xl font-semibold text-emerald-800'>Resume</div>
                </div>

            </div>

        </div>
        <div className='w-[50vw] m-10 flex flex-col gap-5  ' >
            <div className=" flex flex-col gap-2">
                <label className=' p-1 font-semibold'>Full Name</label>
                <input type="text" className=' p-2 bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold  ' defaultValue={user.fullName} disabled />
            </div>
            <div className="flex flex-col gap-2">
                <label>Email</label>
                <input type="email" className=' p-2  bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold' defaultValue={user.email} disabled />
            </div>
            <div className="flex flex-col gap-2">
                <label>Phone</label>
                <input type="text" className=' p-2  bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold' defaultValue={user.phone} disabled />
            </div>
            <div className="flex flex-col gap-2">
                <label>About Me</label>
                <textarea className=' p-2 bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold0' defaultValue={user.aboutMe} disabled />
            </div>
            <div className="flex flex-col gap-2">
                <label>Portfolio URL</label>
                <input type="text" className=' p-2  bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold' defaultValue={user.portfolioURL} disabled />
            </div>
            <div className="flex flex-col gap-2">
                <label>Github URL</label>
                <input type="text" className=' p-2  bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold' defaultValue={user.githubURL} disabled />
            </div>
            <div className="flex flex-col gap-2">
                <label>LinkedIn URL</label>
                <input type="text" className=' p-2  bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold' defaultValue={user.linkedInURL} disabled />
            </div>
            <div className="flex flex-col gap-2">
                <label>Instagram URL</label>
                <input type="text" className=' p-2  bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold' defaultValue={user.instagramURL} disabled />
            </div>
            <div className="flex flex-col gap-2">
                <label>Twitter(X) URL</label>
                <input type="text" className=' p-2  bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold' defaultValue={user.twitterURL} disabled />
            </div>
            <div className="flex flex-col gap-2">
                <label>Facebook URL</label>
                <input type="text" className=' p-2  bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold' defaultValue={user.facebookURL} disabled />
            </div>
        </div>

    
    </div >
  )
}

export default Profile