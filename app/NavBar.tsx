"use client";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsBugFill } from "react-icons/bs";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const { status, data: session } = useSession();

  return (
    <>
      <nav className="flex p-5 mb-5 h-15 justify-between">
        <div className="flex space-x-5 items-center">
          <div>
            <Link href="/">
              <BsBugFill />
            </Link>
          </div>
          <div className="flex space-x-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={classNames({
                  "hover:text-zinc-700 transition-colors text-lg": true,
                  "text-zin-900": link.href === currentPath,
                  "text-zinc-400": link.href !== currentPath,
                })}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex space-x-5 items-center">
          <div>
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </div>
          <div>
            {status === "loading" && (
              <div className="avatar">
                {" "}
                <div className="w-10 rounded-full">
                  <div className="skeleton w-10 h-10" />
                </div>
              </div>
            )}
            {status === "authenticated" && (
              <div className="dropdown dropdown-hover dropdown-left">
                <div tabIndex={0} role="button">
                  <div className="avatar">
                    {" "}
                    <div className="w-10 rounded-full">
                      <img
                        referrerPolicy="no-referrer"
                        src={session.user?.image!}
                      />
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="animate-fade dropdown-content z-[2] card card-compact w-64 p-2 bg-gray-50 shadow text-primary-content"
                  >
                    <div className="card-body prose">
                      {/* <h4>{session.user?.name}</h4> */}
                      <p>{session.user?.email}</p>
                      <Link className="btn btn-accent" href="/api/auth/signout">
                        <IoLogOutOutline />
                        Logout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
