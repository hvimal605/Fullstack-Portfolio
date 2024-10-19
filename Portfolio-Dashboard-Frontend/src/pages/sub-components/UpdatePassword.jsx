import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearAllUserErrors, resetProfile, updatePassword } from '../../store/slices/userSlice';
import toast from 'react-hot-toast';
import LoadingButton from './LoadingButton';

const UpdatePassword = () => {


    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const { loading, isAuthenticated, error, message, isUpdated } = useSelector(
      (state) => state.user
    );
    const dispatch = useDispatch();
    const handleUpdatePassword = () => {
        dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
      };


      
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, message]);
    
    
  return (
    <div>
       
            <div className=' text-center text-4xl font-bold'>Update Password</div>
            

        
        <div className='w-[50vw] m-10 flex flex-col gap-5  ' >
            <div className=" flex flex-col gap-2">
                <label className=' p-1 font-semibold'>Current Password</label>
                <input type="password" className=' p-2 bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold  '  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div className=" flex flex-col gap-2">
                <label className=' p-1 font-semibold'>New Password</label>
                <input type="password" className=' p-2 bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold  '  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className=" flex flex-col gap-2">
                <label className=' p-1 font-semibold'> Confirm New Password</label>
                <input type="password" className=' p-2 bg-white border-2 border-gray-400 rounded-md shadow-md font-semibold  '  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)} />
            </div>
          
            <div className=' flex  justify-center'>
                {
                    ! loading ? <button
                   onClick={() => handleUpdatePassword()}
                    className=' bg-blue-500 p-2 rounded-md font-bold text-white '
                    >Update Passwrod</button> : <LoadingButton content={"updating..."}/>
                }
            </div>
        </div>

    
    </div >
  )
}

export default UpdatePassword