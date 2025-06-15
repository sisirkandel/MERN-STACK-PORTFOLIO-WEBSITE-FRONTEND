import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

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
        "http://localhost:4000/api/v1/message/send",
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
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 ">
      <h1
        className="
          text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem]
          tracking-[15px] font-extrabold
          w-fit mx-auto mb-10 select-none font-modern
          bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500
          bg-clip-text text-transparent animate-gradientSlide
          transition-all duration-500 ease-in-out cursor-pointer
          hover:from-pink-500 hover:via-purple-500 hover:to-blue-500
          hover:animate-rgbGlowText
        "
      >
        CONTACT
          ME
      </h1>

      <form
        onSubmit={handleMessage}
        className="flex flex-col gap-6 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md"
      >
        <div className="flex flex-col gap-2">
          <Label className="text-lg text-gray-800 dark:text-gray-200">Your Name</Label>
          <Input
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Enter your name"
            className="bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-lg text-gray-800 dark:text-gray-200">Subject</Label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            className="bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-lg text-gray-800 dark:text-gray-200">Message</Label>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message"
            className="bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex justify-end">
          {!loading ? (
            <Button className="w-full sm:w-52">SEND MESSAGE</Button>
          ) : (
            <button
              disabled
              type="button"
              className="w-full sm:w-52 text-slate-900 bg-white hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-slate-200 dark:focus:ring-blue-800 inline-flex items-center justify-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-slate-950 animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 ... 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 ... 93.9676 39.0409Z"
                  fill="currentColor"
                />
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
