//we are storing the theme in the localstorage so that everytime we refresh..we have the theme
import {create} from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "coffee",
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme });
    },
}));

//we are importing the theme store in the app.jsx file
