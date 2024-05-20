import Link from "next/link";
import React from "react";
import { IoBugSharp } from "react-icons/io5";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <>
      <nav className="flex space-x-5 p-5 mb-5 items-center h-15 border-b">
        <Link href="/">
          <IoBugSharp />
        </Link>
        <div className="flex space-x-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
