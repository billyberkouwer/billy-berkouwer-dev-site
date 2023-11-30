'use client'

import { Canvas } from "@react-three/fiber"
import HomepageScene from "../Three/HomepageScene"
import "./homepage.scss";

export default function HomeLayout() {
    return (
        <div className="wrapper__full-h">
            <Canvas >
                <HomepageScene />
            </Canvas>
        </div>
    )
}