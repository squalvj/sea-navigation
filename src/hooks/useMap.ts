import { useEffect, useRef, useState } from "react";
import { Map } from "mapbox-gl";
import { initMap } from "../utils/initMap";

export const useMap = (container: React.RefObject<HTMLDivElement>) => {
  const mapInitRef = useRef<Map | null>(null);
  const [routes, setRoutes] = useState<string[]>([]);

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
        features.forEach((f: any, i) => {
          const idx = id.join(";");
          try {
            mapInitRef?.current?.addSource(`source-${i}-${idx}`, {
              type: "geojson",
              data: f,
            });
            mapInitRef?.current?.addLayer({
              id: `layer-${i}-${idx}`,
              type: "line",
              source: `source-${i}-${idx}`,
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "#888",
                "line-width": 8,
              },
            });
            setRoutes((prev) => [...prev, `${i}-${idx}`]);
          } catch (_) {}
        });
      }
    }
  };

  const clearPoint = () => {
    if (mapInitRef.current) {
      if (routes.length > 0) {
        routes.forEach((r) => {
          console.log({r})
          try {
            mapInitRef?.current?.removeSource(`source-${r}`);
            mapInitRef?.current?.removeLayer(`layer-${r}`);
          } catch (_) {}
        });
      }
    }
  };

  return { mapObject: mapInitRef, drawPoint, clearPoint };
};
