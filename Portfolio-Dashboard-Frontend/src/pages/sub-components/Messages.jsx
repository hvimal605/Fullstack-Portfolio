import toast from 'react-hot-toast';
import LoadingButton from './LoadingButton'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { clearAllMessageErrors, deleteMessage, getAllMessages, resetMessagesSlice } from "../../store/slices/messageSlice";
import { RiDeleteBin5Fill } from "react-icons/ri";
const Messages = () => {
  const dispatch = useDispatch();
  const { messages, loading, error, message } = useSelector((state) => state.messages);
  const [messageId, setMessageId] = useState("");

  // useEffect(() => {
  //   dispatch(getAllMessages());
  // }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, message, loading]);

  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  return (
    <div className="min-h-screen p-4 sm:py-4 sm:pl-20">
      <div className="bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">Messages</h2>
        </div>
        <div className="p-4 grid gap-4 sm:grid-cols-2">
          {messages && messages.length > 0 ? (
            messages.map((element) => (
              <div
                key={element._id}
                className="bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <div className="mb-2">
                  <span className="font-bold mr-2">Sender Name:</span>
                  {element.senderName}
                </div>
                <div className="mb-2">
                  <span className="font-bold mr-2">Subject:</span>
                  {element.subject}
                </div>
                <div className="mb-4">
                  <span className="font-bold mr-2">Message:</span>
                  {element.message}
                </div>
                <div className="flex justify-end">
                  {loading && messageId === element._id ? (
                    <>
                    <LoadingButton content={"Deleting"} />
                    </>
                  ) : (
                    <button
                      className="w-32 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2 justify-center"
                      onClick={() => handleMessageDelete(element._id)}
                    >
                      <RiDeleteBin5Fill /> Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-2xl text-gray-500">
              No Messages Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
