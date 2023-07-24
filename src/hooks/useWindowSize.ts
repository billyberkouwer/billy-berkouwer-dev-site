import { useEffect, useState } from "react";

type Coordinates = {
    x: number,
    y: number,
}

export default function useWindowSize() {
    const [pageSize, setPageSize] = useState<Coordinates>({x: 0, y: 0});

    useEffect(() => {
        let innerSize = {x: window.innerWidth, y: window.innerHeight};
        setPageSize(innerSize);

        function pageSizeSet(e: UIEvent) {
            setPageSize({x: window.innerWidth, y: window.innerHeight})
        }

        window.addEventListener('resize', (e) => pageSizeSet(e));

        return () => {
            window.removeEventListener('resize', pageSizeSet);
        }
    }, []);

    return pageSize;
}