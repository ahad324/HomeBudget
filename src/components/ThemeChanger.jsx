import React, { useState, useEffect } from "react";
// Style Sheet import
import "../styles/ThemeChanger.css";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div>
      <label htmlFor="theme-toggle" style={{ fontSize: "0.7rem" }}>
        Theme
      </label>
      <label className="switch" htmlFor="theme-toggle">
        <input
          id="theme-toggle"
          type="checkbox"
          onChange={handleThemeChange}
          checked={theme === "dark"}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
