import { MutableRefObject, createContext } from "react";
import { Map } from "mapbox-gl";

export const MapContext = createContext<MutableRefObject<Map | null> | null>(null);
