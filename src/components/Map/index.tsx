import { RefObject } from "react";

export const MapView = ({ map }: { map: RefObject<HTMLDivElement> }) => {
  return <div ref={map} className="map-container" />;
};
