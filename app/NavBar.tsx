"use client";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HoverCard,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsBugFill } from "react-icons/bs";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import ThemeToggler from "./ThemeToggler";
import useTheme from "./store";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const { status, data: session } = useSession();
  const theme = useTheme((s) => s.theme);
  const currentTheme = theme ? theme : "light";

  return (
    <>
      <Flex className="p-5 mb-5 h-15 justify-between">
        <Flex className="space-x-5 items-center">
          <div>
            <Link href="/">
              <BsBugFill />
            </Link>
          </div>
          <Flex className=" space-x-5">
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
          </Flex>
        </Flex>
        <Flex className="items-center space-x-5">
          <Flex className="items-center">
            <ThemeToggler theme={currentTheme} />
            {/* {theme === "light" ? (
              <SunIcon className="inline animate-spin animate-once animate-ease-in-out animate-normal" />
            ) : (
              <MoonIcon className="inline animate-spin animate-once animate-ease-in-out animate-normal" />
            )} */}
          </Flex>
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
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <Avatar
                    radius="full"
                    src={session.user?.image!}
                    fallback="?"
                    referrerPolicy="no-referrer"
                  />
                </HoverCard.Trigger>
                <HoverCard.Content maxWidth="300px">
                  <Flex direction="column" gap="2">
                    <Heading size="3" as="h3">
                      {session.user?.name}
                    </Heading>
                    <Text as="div" size="2" mb="2">
                      {session.user?.email}
                    </Text>

                    <Link href="/api/auth/signout">
                      <Button radius="large">
                        <IoLogOutOutline />
                        Logout
                      </Button>
                    </Link>
                  </Flex>
                </HoverCard.Content>
              </HoverCard.Root>
            )}
          </div>
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
