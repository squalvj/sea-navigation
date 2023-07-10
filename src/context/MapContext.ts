import { MutableRefObject, createContext } from "react";
import { Map } from "mapbox-gl";

type TMapContext = {
    map: MutableRefObject<Map | null>
    drawPoint: (a: Record<any, any>) => void
    clearPoint: () => void
}

export const MapContext = createContext<TMapContext | null>(null);
