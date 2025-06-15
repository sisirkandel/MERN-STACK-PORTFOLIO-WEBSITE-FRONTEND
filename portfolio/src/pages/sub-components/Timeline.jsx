import axios from "axios";
import React, { useEffect, useState } from "react";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const getMyTimeline = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/timeline/getall",
        { withCredentials: true }
      );
      const sortedTimeline = data.timelines.sort((a, b) => {
        const dateA = new Date(a.timeline.from);
        const dateB = new Date(b.timeline.from);
        return dateA - dateB;
      });
      setTimeline(sortedTimeline);
    };
    getMyTimeline();
  }, []);

  return (
    <div>
      <h1 className="overflow-x-hidden text-[2rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] mb-4 font-extrabold">
        Timeline
      </h1>

      <ol className="relative border-l-4 border-gray-300 dark:border-gray-700 pl-6">
        {timeline &&
          timeline.map((element) => (
            <li key={element._id} className="mb-10 relative">
              <span className="absolute left-0 top-2 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-700 ring-8 ring-white dark:ring-gray-900 shadow-md">
                <svg
                  className="w-3 h-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </span>


              <div
                className="ml-10 bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200 hover:text-blue-700 dark:hover:text-blue-400">
                  {element.title}
                </h3>
                <time className="block mb-2 text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors duration-200 hover:text-blue-800 dark:hover:text-blue-300">
                  {element.timeline.from} -{" "}
                  {element.timeline.to ? element.timeline.to : "Present"}
                </time>
                <p className="text-gray-700 dark:text-gray-300">{element.description}</p>
              </div>
            </li>
          ))}
      </ol>
    </div>
  );
};

export default Timeline;
