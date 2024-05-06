"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Sun from "@/components/Utils/Sun";
import Moon from "@/components/Utils/Moon";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [btn, setBtn] = useState(false);

  useEffect(() => {
    if (theme === "system") {
      setTheme("light");
    }
    if (theme === "dark") {
      setBtn(true);
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleChangeSwitch = (e) => {
    const val = e.target.checked;
    setBtn(val);
    if(val){
      setTheme('dark');
    }else{
      setTheme('light')
    }
  }

  return (
      <div className='dark_mode'>
        <input
            className='dark_mode_input'
            type='checkbox'
            id='darkmode-toggle'
            checked={btn}
            onChange={(e)=>handleChangeSwitch(e)}
        />
        <label className='dark_mode_label flex items-center justify-between' htmlFor='darkmode-toggle'>
          <Sun />
          <Moon />
        </label>
    </div>
  );
};

export default ThemeSwitcher;
