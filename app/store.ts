import { create } from "zustand";

interface Theme {
  theme: "light" | "dark" | "inherit" | undefined
  toggleTheme: () => void;
}

const useTheme = create<Theme>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));

export default useTheme;