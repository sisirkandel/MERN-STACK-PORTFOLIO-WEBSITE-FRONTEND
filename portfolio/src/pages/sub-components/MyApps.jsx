import axios from "axios";
import React, { useEffect, useState } from "react";

const MyApps = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getMyApps = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/softwareapplication/getall",
          { withCredentials: true }
        );
        setApps(data.softwareApplications);
      } catch (error) {
        console.error("Failed to fetch apps", error);
      }
    };
    getMyApps();
  }, []);

  return (
    <div className="w-full flex flex-col gap-12 px-4 sm:px-8 lg:px-16">
      <h1
        className="
          text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem]
          tracking-[15px] font-extrabold
          w-fit mx-auto mb-6 select-none
          font-modern
          bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500
          bg-[length:200%_200%]
          bg-clip-text text-transparent
          animate-gradientSlide
          transition-all duration-500 ease-in-out
          hover:text-transparent hover:from-pink-500 hover:via-purple-500 hover:to-blue-500
          hover:animate-rgbGlowText
          cursor-pointer
        "
      >
        MY APPS
      </h1>

      <div className="w-full flex justify-center">
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
          {apps.length > 0 ? (
            apps.map((element) => (
              <div
                key={element._id}
                className="flex flex-col items-center w-32 text-center"
                title={element.name}
              >
                <img
                  src={element.svg?.url}
                  alt={element.name}
                  className="
                    w-24 h-24
                    object-contain
                    select-none
                    cursor-pointer
                    rounded-full
                    border-2 border-gray-300 dark:border-gray-600
                    shadow-md
                    transition-transform duration-300 ease-in-out
                    hover:scale-110 hover:shadow-lg
                    bg-white dark:bg-gray-800
                  "
                  draggable={false}
                />
                <p className="mt-3 text-sm font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[120px]">
                  {element.name}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No applications found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApps;
