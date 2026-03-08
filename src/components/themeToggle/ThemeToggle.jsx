import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  //! theme toggle switch button ---------
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "winter");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  //* handle Theme button------------
  const handleTheme = (checked) => {
    setTheme(checked ? "night" : "winter");
  };
  
  return (
    <div className="mr-2">
      <input
        type="checkbox" 
        className="toggle"
        checked={theme === "night"}
        onChange={(e) => handleTheme(e.target.checked)}
      />
    </div>
  );
};

export default ThemeToggle;
