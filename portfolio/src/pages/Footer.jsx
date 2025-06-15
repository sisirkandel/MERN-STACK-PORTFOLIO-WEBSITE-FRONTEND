import React from "react";

const Footer = () => {
  return (
    <footer className="w-full max-w-[1050px] mx-auto px-4 py-6 text-center border-t border-gray-300 dark:border-gray-700 mt-10">
      <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
        Thanks for scrolling
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500">
        © {new Date().getFullYear()} Sisir. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
