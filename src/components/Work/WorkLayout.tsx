"use client";

import { useEffect, useRef, useState } from "react";
import "./work-page.scss";
import useMousePosition from "@/hooks/useMousePosition";
import { WorkData } from "@/lib/types/main";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function WorkLayout({ logos }: WorkData) {
  redirect('/')

  const panWrapperRef = useRef<HTMLElement>();
  const [isTouched, setIsTouched] = useState(false);
  const { x, y } = useMousePosition();
  const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 });
  const [panWrapperPosition, setPanWrapperPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (panWrapperRef.current) {
      panWrapperRef.current.style.minWidth =
        panWrapperRef.current.clientWidth + "px";
      panWrapperRef.current.style.maxWidth =
        panWrapperRef.current.clientWidth + "px";
      panWrapperRef.current.style.minHeight =
        panWrapperRef.current.clientHeight + "px";
      panWrapperRef.current.style.maxHeight =
        panWrapperRef.current.clientHeight + "px";
    }
    window.addEventListener("mousedown", (e) => {
      if (panWrapperRef.current) {
        const mouseDownPos = { x: e.clientX, y: e.clientY };
        const panWrapperPos = {
          x: +panWrapperRef.current.style.top.substring(
            0,
            panWrapperRef.current.style.top.length - 2
          ),
          y: +panWrapperRef.current.style.left.substring(
            0,
            panWrapperRef.current.style.left.length - 2
          ),
        };
        setPanWrapperPosition(panWrapperPos);
        setMouseDownPosition(mouseDownPos);
        setIsTouched(true);
      }
    });
    window.addEventListener("mouseup", () => {
      setIsTouched(false);
    });
  }, []);

  useEffect(() => {
    if (isTouched && panWrapperRef.current) {
      const mouseMoveDistance = {
        x: x - mouseDownPosition.x + panWrapperPosition.x,
        y: y - mouseDownPosition.y + panWrapperPosition.y,
      };
      panWrapperRef.current.style.top = mouseMoveDistance.y + "px";
      panWrapperRef.current.style.left = mouseMoveDistance.x + "px";
    }
  }, [isTouched, mouseDownPosition, x, y, panWrapperPosition]);

  return (
    <main
      ref={(el) => (el ? (panWrapperRef.current = el) : null)}
      className="wrapper__pan-layout"
    >
      <div className="pan-layout__row">
        {logos.map((logo) => {
          return (
            <div key={logo.path} className="pan-layout__column">
              <Image
                onDragStart={(e) => e.preventDefault()}
                alt={logo.name}
                src={logo.path}
                width={1000}
                height={500}
                className="client-image"
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
