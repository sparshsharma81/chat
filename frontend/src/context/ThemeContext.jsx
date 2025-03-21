import React, { createContext, useState, useContext } from 'react';
import { THEMES } from '../constants';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(THEMES[0]); // Default to the first theme

    const toggleTheme = (newTheme) => {
        if (THEMES.includes(newTheme)) {
            setTheme(newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}; 