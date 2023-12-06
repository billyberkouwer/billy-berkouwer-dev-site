'use client'

import { Canvas } from "@react-three/fiber"
import HomepageScene, { Loader } from "../Three/HomepageScene"
import "./homepage.scss";
import { Suspense, useEffect, useState } from "react";

export default function HomeLayout() {
    const [isSceneVisible, setIsSceneVisible] = useState(false);

    useEffect(() => {
        const fade = setTimeout(() => {
            setIsSceneVisible(true);
        }, 3000);

        return () => {
            clearTimeout(fade);
        }
    }, []);

    return (
        <div className="wrapper__full-h">
            <div className={`scene-fade ${!isSceneVisible ? 'visible' : 'hidden'}`}></div>
            <h1 className={`title ${!isSceneVisible ? 'visible' : 'hidden'}`}>Billy Myles-Berkouwer</h1>
            <Canvas className={`three-canvas`} >
                <HomepageScene />
            </Canvas>
        </div>
    )
}