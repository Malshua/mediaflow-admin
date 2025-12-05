"use client";

import { useTheme } from "next-themes";
import React from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { RiSunFill } from "react-icons/ri";

const DarkModeToggler = () => {
  const { theme, setTheme } = useTheme();

  console.log(theme);

  return (
    <div className="fixed z-50 top-3/4 right-0 bg-white dark:bg-night-blue rounded p-1 flex flex-col gap-2 shadow">
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-lg ${
          theme === "dark" ? "bg-evening-blue text-yellow-200" : "text-gray-400"
        }`}
      >
        <BsMoonStarsFill />
      </button>

      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-lg ${
          theme === "light" ? "bg-gray-100 text-yellow-600" : "text-gray-400"
        }`}
      >
        <RiSunFill />
      </button>
    </div>
  );
};

export default DarkModeToggler;
