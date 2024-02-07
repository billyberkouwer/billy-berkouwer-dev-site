"use client";

import { Canvas } from "@react-three/fiber";
import HomepageScene from "../Three/HomepageScene";
import "./home-page.scss";
import { useEffect, useState } from "react";
import InfoBox from "./InfoBox";
import LoadingIcon from "./Loading";

export default function HomeLayout() {
  const [isSceneVisible, setIsSceneVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSceneVisible(true);
    }, 500);
  }, []);

  return (
    <div className="wrapper__full-h">
      <InfoBox />
      <div
        className={`scene-fade ${!isSceneVisible ? "visible" : "hidden"}`}
      ></div>
      <div className="container__splash">
        <h1 className={`title ${!isSceneVisible ? "visible" : "hidden"}`}>
          Billy Myles-Berkouwer
        </h1>
        <LoadingIcon isSceneVisible={isSceneVisible} />
      </div>
      <Canvas className={`three-canvas`}>
        <HomepageScene />
      </Canvas>
    </div>
  );
}
