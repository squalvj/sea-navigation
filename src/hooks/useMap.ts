import { useEffect, useRef, useState } from "react";
import { Map } from "mapbox-gl";
import { initMap } from "../utils/initMap";

// type TRoute = {
//   id: string;
//   features: any
// }

export const useMap = (container: React.RefObject<HTMLDivElement>) => {
  const mapInitRef = useRef<Map | null>(null);
  const [routes, setRoutes] = useState("");

  useEffect(() => {
    if (container.current) {
      mapInitRef.current = initMap(
        container.current,
        [-100.31019063199852, 25.66901932031443]
      );
    }
  }, []);

  const drawPoint = ({ features, id }: Record<any, any>) => {
    if (mapInitRef.current) {
      if (Array.isArray(features)) {
        features.forEach((f: any) => {
          try {
            mapInitRef?.current?.addSource(`source-${id}`, {
              type: "geojson",
              data: f,
            });
            mapInitRef?.current?.addLayer({
              id: `layer-${id}`,
              type: "line",
              source: `source-${id}`,
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "#888",
                "line-width": 8,
              },
            });
            setRoutes(id);
          } catch (_) {}
        });
      }
    }
  };

  const clearPoint = () => {
    if (mapInitRef.current) {
      if (routes) {
        mapInitRef.current.removeSource(`source-${routes}`);
        mapInitRef.current.removeLayer(`layer-${routes}`);
      }
    }
  };

  return { mapObject: mapInitRef, drawPoint, clearPoint };
};
