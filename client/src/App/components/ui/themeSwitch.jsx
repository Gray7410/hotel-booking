import React from "react";
import { useTheme } from "../../hooks/useTheme";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme("light");
  return (
    <>
      <input
        className="switch-input"
        id="theme-switch"
        type="checkbox"
        defaultChecked={theme === "dark" ? true : false}
        onChange={() => {
          theme === "dark" ? setTheme("light") : setTheme("dark");
        }}
      />
      <label className="switch-control" htmlFor="theme-switch"></label>
    </>
  );
};

export default ThemeSwitch;
