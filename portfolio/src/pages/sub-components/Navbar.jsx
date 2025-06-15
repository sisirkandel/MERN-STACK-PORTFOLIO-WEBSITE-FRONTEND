import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import clsx from "clsx";

const sections = [
  { id: "hero", label: "Home" }, 
  { id: "timeline", label: "Timeline" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "portfolio", label: "Portfolio" },
  { id: "myapps", label: "My Apps" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) setActiveSection(visibleSection.target.id);
      },
      { threshold: 0.6 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const yOffset = -90; 
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const handleLoginClick = () => {
    window.location.href = "http://localhost:5173/login";
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-background z-50 shadow-md px-6 sm:px-12 py-[5px] flex items-center">
      <div
        className="text-lg font-bold text-primary select-none cursor-pointer flex-shrink-0"
        onClick={(e) => {
          e.preventDefault();
          const yOffset = -90;
          const element = document.getElementById("hero");
          if (element) {
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
          setMenuOpen(false);
        }}
      >
        Home
      </div>


      <div className="hidden md:flex absolute left-1/2 top-0 h-full transform -translate-x-1/2 items-center gap-6">
        {sections
          .filter(({ id }) => id !== "hero")
          .map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={clsx(
                "text-sm sm:text-base font-medium px-2 py-1 rounded-md transition-colors duration-300 select-none cursor-pointer",
                activeSection === id
                  ? "bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                  : "text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary"
              )}
            >
              {label}
            </a>
          ))}
      </div>


      <div className="hidden md:flex ml-auto items-center gap-4 flex-shrink-0">
        <div className="inline-flex relative" style={{ top: "-7px" }}>
          <ModeToggle />
        </div>
        <Button
          className="px-6 py-3 text-lg font-semibold"
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </div>


      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden ml-auto p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-background shadow-md md:hidden py-2 flex flex-col items-center gap-2 z-50">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={clsx(
                "w-full text-center text-base font-medium px-4 py-2 rounded-md transition-colors duration-300 select-none cursor-pointer",
                activeSection === id
                  ? "bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                  : "text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary"
              )}
            >
              {label}
            </a>
          ))}
          <div className="flex items-center gap-4 mt-2">
            <div style={{ top: "-7px", position: "relative" }}>
              <ModeToggle />
            </div>
            <Button
              className="px-6 py-3 text-lg font-semibold"
              onClick={handleLoginClick}
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
