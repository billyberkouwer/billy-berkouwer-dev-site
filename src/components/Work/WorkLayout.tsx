"use client";

import { useEffect, useRef, useState } from "react";
import "./work-page.scss";
import useMousePosition from "@/hooks/useMousePosition";
import { WorkData } from "@/lib/types/main";
import Image from "next/image";

export default function WorkLayout({logos}: WorkData) {
  const panWrapperRef = useRef<HTMLElement>();
  const [isTouched, setIsTouched] = useState(false);
  const { x, y } = useMousePosition();
  const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 });
  const [panWrapperPosition, setPanWrapperPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (panWrapperRef.current) {
      panWrapperRef.current.style.minWidth = panWrapperRef.current.clientWidth + 'px';
      panWrapperRef.current.style.maxWidth = panWrapperRef.current.clientWidth + 'px';
      panWrapperRef.current.style.minHeight = panWrapperRef.current.clientHeight + 'px';
      panWrapperRef.current.style.maxHeight = panWrapperRef.current.clientHeight + 'px';
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
              <Image onDragStart={(e) => e.preventDefault()} alt={logo.name} src={logo.path} width={1000} height={500} className="client-image" />
            </div>
          )
        })}
        <div className="pan-layout__column">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda
          labore sint voluptatibus ab quo quia quae fuga corporis distinctio eos
          amet qui debitis repellendus modi magnam voluptatem doloribus, ea
          suscipit!
        </div>
        <div className="pan-layout__column">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi eos
          aliquid praesentium quae. Recusandae nostrum veniam voluptatibus vitae
          officia quisquam harum ex sed non praesentium impedit, ullam laborum
          cumque quos?
        </div>
        <div className="pan-layout__column">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          suscipit a officiis culpa, numquam eum asperiores perspiciatis ea
          deserunt praesentium accusantium, necessitatibus voluptas. Eveniet
          velit voluptatum asperiores iure, quisquam quibusdam!
        </div>
      </div>
      <div className="pan-layout__row">
        <div className="pan-layout__column">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum pariatur
          neque illo odit, quod blanditiis! Magnam, reprehenderit rerum tenetur
          sunt consequatur officia sed veniam, nobis ullam cumque voluptatibus
          eius vitae!
        </div>
        <div className="pan-layout__column"></div>
        <div className="pan-layout__column"></div>
      </div>
      <div className="pan-layout__row">
        <div className="pan-layout__column"></div>
        <div className="pan-layout__column"></div>
        <div className="pan-layout__column"></div>
      </div>
    </main>
  );
}
