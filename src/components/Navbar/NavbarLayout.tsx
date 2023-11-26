'use client';

import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../Global/ThemeProvider";
import './navbar.scss';

export default function NavbarLayout() {
    const { isDarkTheme } = useContext(ThemeContext);

    console.log(isDarkTheme)

    return (
        <div className={`container__navbar ${isDarkTheme ? 'dark-theme' : ''}`}>
            <Link className="link__navbar" href={'/'}>Home</Link>
            <Link className="link__navbar" href={'#'}>Work</Link>
            <Link className="link__navbar" href={'#'}>Experiments</Link>
            <Link className="link__navbar" href={'#'}>Contact</Link>
        </div>
    )
}