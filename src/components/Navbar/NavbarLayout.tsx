'use client';

import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../Global/ThemeProvider";
import './navbar.scss';
import { motion } from "framer-motion";
import { fadeRiseAnimation } from "@/lib/framer/Animations";

export default function NavbarLayout() {
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <motion.div variants={fadeRiseAnimation} initial="hidden" animate="visible" className={`container__navbar ${isDarkTheme ? 'dark-theme' : ''}`}>
            <motion.li className="link__navbar" variants={fadeRiseAnimation}><Link href={'/'}>Home</Link></motion.li>
            <motion.li className="link__navbar" variants={fadeRiseAnimation}><Link href={'#'}>Work</Link></motion.li>
            <motion.li className="link__navbar" variants={fadeRiseAnimation}><Link href={'#'}>Experiments</Link></motion.li>
            <motion.li className="link__navbar" variants={fadeRiseAnimation}><Link href={'#'}>Contact</Link></motion.li>
        </motion.div>
    )
}