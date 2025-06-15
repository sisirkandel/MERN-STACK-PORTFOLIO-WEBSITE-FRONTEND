import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);

  const projectsToShow = viewAll ? projects : projects.slice(0, 9);

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
        PORTFOLIO
      </h1>


      <div className="flex flex-wrap justify-center gap-8 max-w-[960px] mx-auto">
        {projectsToShow.map((project) => (
          <Link
            key={project._id}
            to={`/project/${project._id}`}
            aria-label={`Project: ${project.title}`}
            className="w-[30%] min-w-[240px] max-w-[300px] flex flex-col"
          >
            <Card
              className="
                flex flex-col justify-center items-center gap-4
                rounded-xl
                bg-white dark:bg-gray-800
                border-2 border-transparent
                shadow-md dark:shadow-black/40
                transition-transform duration-300 ease-in-out
                hover:scale-105 hover:-translate-y-1 hover:shadow-lg
                hover:border-current
                hover:animate-rgbGlow
                cursor-pointer
                p-6
                box-border
                min-h-[280px]
                w-full
              "
            >
              <img
                src={project.projectBanner?.url}
                alt={project.title}
                className="
                  h-20 w-20
                  rounded-full object-cover select-none
                  flex-shrink-0
                "
                draggable={false}
              />
              <p
                title={project.title}
                className="
                  text-gray-700 dark:text-gray-300
                  text-center
                  font-semibold
                  select-none
                  whitespace-normal
                  break-words
                  w-full
                "
              >
                {project.title}
              </p>
            </Card>
          </Link>
        ))}
      </div>


      {projects.length > 9 && (
        <div className="w-full text-center my-9">
          <button
            className="
              w-52
              bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500
              text-white
              hover:from-pink-500 hover:via-purple-600 hover:to-blue-500
              transition-colors duration-500
              shadow-lg
              rounded-lg
              select-none
              py-2
            "
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
