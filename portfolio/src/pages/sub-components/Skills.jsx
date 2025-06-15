import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";


const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/skill/getall",
        { withCredentials: true }
      );
      setSkills(data.skills);
    };
    getMySkills();
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
        cursor-pointer"
        >
          SKILLS
</h1>


      <div
        className="
          grid 
          justify-center 
          gap-6 
          auto-cols-max 
          grid-cols-[repeat(auto-fit,minmax(140px,1fr))]
          sm:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]
          md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
          max-w-6xl
          mx-auto
          w-full
        "
      >
        {skills &&
          skills.map((element) => (
            <Card
              key={element._id}
              className="
                h-fit p-4 sm:p-6 flex flex-col justify-center items-center gap-3
                rounded-xl
                bg-white dark:bg-gray-800
                border-4 border-transparent
                shadow-md dark:shadow-black/40
                transition-transform duration-300 ease-in-out
                hover:scale-105 hover:-translate-y-1 hover:shadow-lg
                hover:border-current
                hover:animate-rgbGlow
                cursor-pointer
                max-w-xs
                mx-auto
              "
              title={element.title}
              aria-label={`Skill: ${element.title}, Proficiency: ${element.proficiency}`}
            >
              <img
                src={element.svg && element.svg.url}
                alt={element.title}
                className="
                  h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24
                  rounded-full object-cover select-none
                "
                draggable={false}
              />
              <p
                className="
                  text-gray-700 dark:text-gray-300 
                  text-center 
                  font-semibold
                  select-none
                "
              >
                {element.title}
              </p>


              <div className="w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] h-3 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-500"
                  style={{ width: `${element.proficiency}%` }}
                  aria-label={`Proficiency: ${element.proficiency} percent`}
                ></div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Skills;
