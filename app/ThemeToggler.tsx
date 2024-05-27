import { Button, Switch } from "@radix-ui/themes";
import React from "react";
import useTheme from "./store";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Props {
  theme: string;
}

const ThemeToggler = ({ theme }: Props) => {
  const { toggleTheme: handleTheme } = useTheme();
  return (
    <Link href="" onClick={handleTheme}>
      {theme === "light" ? <SunIcon className="animate-spin animate-once animate-ease-in-out animate-normal" /> : <MoonIcon  className="animate-spin animate-once animate-ease-in-out animate-normal"/>}
    </Link>
  );
};

export default ThemeToggler;
