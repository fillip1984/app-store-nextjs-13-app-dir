"use client";

import { useEffect } from "react";
import { MdOutlinePalette } from "react-icons/md";
import { useLocalStorage } from "usehooks-ts";

const Nav = () => {
  const availableThemes = ["aqua", "cupcake", "dark"];
  //   const [theme, setTheme] = useState("aqua");
  const [theme, setTheme] = useLocalStorage("theme", "aqua");

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    const currentIndex = availableThemes.indexOf(theme);
    const newIndex =
      currentIndex + 1 === availableThemes.length ? 0 : currentIndex + 1;
    setTheme(availableThemes[newIndex]);
  };

  return (
    <div className="bg-primary flex justify-between py-2 px-4 items-center">
      <h3 className="brand font-bold">App Store</h3>
      <div className="nav-right flex gap-1">
        <button className="btn btn-sm" onClick={handleThemeChange}>
          <MdOutlinePalette size={28} />
        </button>
      </div>
    </div>
  );
};

export default Nav;
