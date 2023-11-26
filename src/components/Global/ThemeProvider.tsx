"use client"

import { usePathname } from "next/navigation";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { createContext } from "react";

const darkThemePathnames = [
    '/',
]

export const ThemeContext = createContext<{
    isDarkTheme: boolean
}>({
    isDarkTheme: false
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        let isDarkPage = false;
        darkThemePathnames.forEach(darkRoute => {
            if (darkRoute === pathname && !isDarkPage) {
                isDarkPage = true;
            }
        })

        if (isDarkPage) {
            document.body.classList.add('dark-theme');
            setIsDarkTheme(true)
        } else {
            document.body.classList.remove('dark-theme');
            setIsDarkTheme(false)
        }
    }, [pathname])

    return (
        <ThemeContext.Provider
            value={{
                isDarkTheme: isDarkTheme,
            }}>
            {children}
        </ThemeContext.Provider>
    )
}