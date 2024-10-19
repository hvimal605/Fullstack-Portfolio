import axios from "axios";
import React, { useState } from "react";
import toast from 'react-hot-toast'


const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://portfolio-backend-code.onrender.com/api/v1/message/send",
        { senderName, subject, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setSenderName("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="overflow-x-hidden ">
      <div className="relative mb-8">
        <h1 className="flex gap-4 items-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-15px mx-auto w-fit font-extrabold about-h1 text-white"
         >
          CONTACT <span className="text-tubeLight-effect font-extrabold text-cyan-400">ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <form onSubmit={handleMessage} className="flex flex-col gap-6 ">
        <div className="flex flex-col gap-2 px-1.5">
          <label htmlFor="senderName" className="text-xl text-white">Your Name</label>
          <input
            id="senderName"
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Your Name"
            className="border-2 border-gray-300 rounded-md px-3 py-2  bg-black text-white shadow-md shadow-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2 px-1.5">
          <label htmlFor="subject" className="text-xl text-white">Subject</label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="border-2  bg-black text-white shadow-md shadow-gray-500 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div className="flex flex-col gap-2 px-1.5">
          <label htmlFor="message" className="text-xl text-white">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            rows={5}
            className="border-2  bg-black text-white shadow-md shadow-gray-500  border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center">
          {!loading ? (
            <button type="submit" className="w-full sm:w-52 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg py-2.5">
              SEND MESSAGE
            </button>
          ) : (
            <button
              disabled
              type="button"
              className="w-full sm:w-52 bg-gray-200 text-gray-600 cursor-not-allowed rounded-lg py-2.5 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              </svg>
              Sending...
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Contact;
