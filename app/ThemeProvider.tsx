"use client";
import { Theme } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";
import useTheme from "./store";

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = useTheme((s) => s.theme);
  return (
    <Theme
      accentColor="blue"
      grayColor="gray"
      radius="large"
      appearance={theme}
    >
      {children}
    </Theme>
  );
};

export default ThemeProvider;
