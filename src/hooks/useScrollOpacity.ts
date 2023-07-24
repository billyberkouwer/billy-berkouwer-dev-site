import { MutableRefObject, useEffect } from "react";

export default function useScrollOpacity(element: MutableRefObject<HTMLButtonElement> | undefined, y: number) {
    useEffect(() => {
        function handleScroll() {
            if (element?.current && document?.scrollingElement?.scrollTop) {
                if (document.scrollingElement.scrollTop > y) {
                    element.current.style.display = 'block';
                    element.current.style.opacity = '1';
                } else {
                    element.current.style.opacity = '0';
                    const timemout = setTimeout(() => {
                        element.current.style.display = 'none';
                    }, 500);
                    return clearTimeout(timemout);
                }
            }
        };

        document.addEventListener('scroll', () => handleScroll())
            
        return () => {
            document.removeEventListener('scroll', handleScroll);
        }
    }, [element, y]);
}