"use client";

import Link from "next/link";
import { useEffect } from "react";
import { MdOutlinePalette, MdOutlineSettings } from "react-icons/md";
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
      <Link href="/" className="brand font-bold">
        <h3>App Store</h3>
      </Link>
      <div className="nav-right flex gap-2">
        <Link href="/admin" className="btn btn-sm btn-accent">
          <MdOutlineSettings size={28} />
        </Link>
        <button onClick={handleThemeChange} className="btn btn-sm">
          <MdOutlinePalette size={28} />
        </button>
      </div>
    </div>
  );
};

export default Nav;
