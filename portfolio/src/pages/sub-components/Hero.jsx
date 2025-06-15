import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    className="w-6 h-6"
    viewBox="0 0 24 24"
  >
    <path d="M21.5 2l-9.5 9.5L2.5 2 2 2.5 11.5 12 2 21.5l.5.5 9.5-9.5L21.5 22l.5-.5-9.5-9.5L22 2.5z" />
  </svg>
);

const Hero = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/me/portfolio",
        { withCredentials: true }
      );
      setUser(data.user);
    };
    getMyProfile();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p className="text-sm text-green-600 font-medium">Online</p>
      </div>

      <h1 className="text-[1.4rem] sm:text-[2rem] md:text-[2.4rem] lg:text-[2.8rem] font-semibold tracking-tight mb-2">
        Hey, I'm Sisir
      </h1>


      <h2 className="text-gradient overflow-hidden text-[1.1rem] sm:text-[1.4rem] md:text-[1.7rem] lg:text-[2rem] font-medium capitalize tracking-wide mb-4">
        <Typewriter
          words={["Fullstack Developer", "Freelancer"]}
          loop={Infinity}
          cursor
          typeSpeed={80}
          deleteSpeed={60}
          delaySpeed={1500}
        />
      </h2>

      <div className="mt-6 flex flex-wrap gap-4">
        {user.instagramURL && (
          <Link
            to={user.instagramURL}
            target="_blank"
            className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-125 hover:shadow-xl"
            aria-label="Instagram"
          >
            <Instagram className="text-pink-500" />
          </Link>
        )}
        {user.facebookURL && (
          <Link
            to={user.facebookURL}
            target="_blank"
            className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-125 hover:shadow-xl"
            aria-label="Facebook"
          >
            <Facebook className="text-blue-800" />
          </Link>
        )}
        {user.linkedInURL && (
          <Link
            to={user.linkedInURL}
            target="_blank"
            className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-125 hover:shadow-xl"
            aria-label="LinkedIn"
          >
            <Linkedin className="text-sky-500" />
          </Link>
        )}
        {user.xURL && (
          <Link
            to={user.xURL}
            target="_blank"
            className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-125 hover:shadow-xl"
            aria-label="X (Twitter)"
          >
            <XIcon />
          </Link>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-6">
        {user.githubURL && (
          <Link to={user.githubURL} target="_blank" aria-label="GitHub">
            <button
              className="
                bg-white dark:bg-slate-900
                rounded-full
                px-6 py-3
                flex items-center gap-3
                shadow-lg
                transition-transform
                duration-300
                ease-in-out
                hover:scale-110
                hover:shadow-2xl
                hover:bg-gradient-to-r
                hover:from-indigo-500
                hover:via-purple-500
                hover:to-pink-500
                hover:text-white
                cursor-pointer
                select-none
              "
            >
              <Github className="w-6 h-6" />
              <span className="font-semibold text-lg">GitHub</span>
            </button>
          </Link>
        )}
        {user.resume?.url && (
          <Link to={user.resume.url} target="_blank" aria-label="Resume">
            <button
              className="
                bg-white dark:bg-slate-900
                rounded-full
                px-6 py-3
                flex items-center gap-3
                shadow-lg
                transition-transform
                duration-300
                ease-in-out
                hover:scale-110
                hover:shadow-2xl
                hover:bg-gradient-to-r
                hover:from-indigo-500
                hover:via-purple-500
                hover:to-pink-500
                hover:text-white
                cursor-pointer
                select-none
              "
            >
              <ExternalLink className="w-6 h-6" />
              <span className="font-semibold text-lg">Resume</span>
            </button>
          </Link>
        )}
      </div>

      {user.aboutMe && (
        <p className="mt-8 text-lg leading-relaxed tracking-wide text-gray-700 dark:text-gray-300 max-w-3xl">
          {user.aboutMe}
        </p>
      )}

      <hr className="my-10 border-gray-300 dark:border-gray-600" />
    </div>
  );
};

export default Hero; 