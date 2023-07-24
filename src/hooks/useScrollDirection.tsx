import { MutableRefObject, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export default function useScrollDirection() {
  const [isScrollDown, setIsScrollDown] = useState(true);
  const prevScrollAmount = useRef(0) as MutableRefObject<number>;

  useEffect(() => {
    function scrollEventListener() {
      document.addEventListener('scroll', (e: any) => {
        const scrollAmount = e.target?.scrollingElement?.scrollTop;
        if (prevScrollAmount.current < scrollAmount) {
          setIsScrollDown(true)
        } else if (prevScrollAmount.current === scrollAmount) {
          return
        } else {
          setIsScrollDown(false)
        }
        if (typeof prevScrollAmount.current !== 'undefined') {
          prevScrollAmount.current = scrollAmount;
        }
      })
    }
    scrollEventListener();
    
    return () => {
      removeEventListener('scroll', scrollEventListener)
    }
  }, []);

  return isScrollDown;
}