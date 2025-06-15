import React from "react";
import Navbar from "./sub-components/Navbar";
import Hero from "./sub-components/Hero";
import Timeline from "./sub-components/Timeline";
import About from "./sub-components/About";
import Skills from "./sub-components/Skills";
import Portfolio from "./sub-components/Portfolio";
import MyApps from "./sub-components/MyApps";
import Contact from "./sub-components/Contact";

const Home = () => {
  return (
    <>
      <Navbar />
      <article
        className="
          pt-[72px] px-6
          mt-12 sm:mt-16 md:mt-20 lg:mt-24
          mx-auto w-full max-w-[1080px]
          flex flex-col gap-20
          scroll-smooth
        "
      >
        <section id="hero" className="scroll-mt-24"><Hero /></section>
        <section id="timeline" className="scroll-mt-24"><Timeline /></section>
        <section id="about" className="scroll-mt-24"><About /></section>
        <section id="skills" className="scroll-mt-24"><Skills /></section>
        <section id="portfolio" className="scroll-mt-24"><Portfolio /></section>
        <section id="myapps" className="scroll-mt-24"><MyApps /></section>
        <section id="contact" className="scroll-mt-24"><Contact /></section>
      </article>
    </>
  );
};

export default Home;
