import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../store/slices/forgotResetPasswordslice';
import { clearAllUserErrors } from '../store/slices/userSlice';
import LoadingButton from './sub-components/LoadingButton';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    console.log('Reset password for email:', email);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (message !== null) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            {loading ? (
              <LoadingButton content={"Sending"} />
            ) : (
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset Password
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
