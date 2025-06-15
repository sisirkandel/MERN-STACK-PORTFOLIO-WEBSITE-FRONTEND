import React from "react";

const About = () => {
  return (
    <div className="w-full flex flex-col overflow-x-hidden px-4 sm:px-8 lg:px-16">

      <div className="relative mb-8">
        <h1
            className="flex items-center gap-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
            leading-tight md:leading-[1.2] lg:leading-[1.3] tracking-widest 
            mx-auto w-fit font-extrabold px-6 py-3 rounded-xl
            text-gray-900 dark:text-white bg-white dark:bg-[hsl(222.2_84%_4.9%)] 
            shadow-md transition-all duration-300 ease-in-out"
          >
            ABOUT ME
          </h1>

        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200 dark:bg-slate-600"></span>
      </div>

      <div className="text-center mb-8">
        <p className="uppercase text-xl text-slate-400 font-semibold tracking-wider">
          Allow me to introduce myself.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-14 mb-8 sm:mb-20">
  
        <div className="flex justify-center items-center">
          <img
            src="/me.jpg"
            alt="Sisir"
            className="
              h-[120px] sm:h-[170px] md:h-[175px] lg:h-[225px] w-auto aspect-square
              object-cover rounded-full border-4 border-transparent
              shadow-lg dark:shadow-blue-900
              transition-all duration-300 ease-in-out
              cursor-pointer
              hover:scale-110 hover:-translate-y-3
              hover:shadow-[0_0_20px_5px_rgba(255,0,0,0.6),0_0_40px_10px_rgba(0,255,255,0.6),0_0_60px_15px_rgba(255,255,0,0.6)]
              dark:hover:shadow-[0_0_20px_5px_rgba(255,80,80,0.9),0_0_40px_10px_rgba(80,255,255,0.9),0_0_60px_15px_rgba(255,255,120,0.9)]
            "
          />
        </div>


        <div className="flex flex-col justify-center gap-6 text-xl tracking-wide leading-relaxed">
  {[
    "Hi, I'm Sisir — a dedicated web developer with a strong passion for technology and building meaningful digital experiences.",
    "I'm always eager to learn, explore new tools, and push boundaries in web development. Solving problems and creating smooth user experiences truly excites me.",
    "Outside of tech, I enjoy playing the guitar, traveling, and gardening — they help me recharge and stay inspired.",
    "I believe in consistency, curiosity, and a growth mindset. I embrace challenges as opportunities and strive to deliver high-quality work on time.",
  ].map((text, index) => (
    <p
      key={index}
      className="text-gray-800 dark:text-gray-200 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-[1.01]"
    >
      {text}
    </p>
  ))}
</div>

      </div>
    </div>
  );
};

export default About;
