import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/MapContext";
import { generateNewMarker } from "../../utils/generateNewMarker";
import { Marker } from "mapbox-gl";
import { TCoordinates } from "../../types/coordinates";
import BoxSearch from "../BoxSearch";
import { getSeaRoutes } from "../../utils/searoute";

type RouteTypes =
  | "FROM"
  | "TO"
  | "STOP_1"
  | "STOP_2"
  | "STOP_3"
  | "STOP_4"
  | "STOP_5";

type TCoordinatesMap = {
  type: RouteTypes;
  coordinates: TCoordinates;
};

type TMarkers = {
  type: RouteTypes;
  marker: Marker;
};

const Actions = () => {
  const map = useContext(MapContext);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [coords, setCoords] = useState<TCoordinatesMap[]>([]);
  const [markers, setMarkers] = useState<TMarkers[]>([]);

  const handleAddPoint = (type: RouteTypes, coordinates: TCoordinates) => {
    const MAP_TYPES = {
      FROM: "Starting Point",
      TO: "Destination Point",
      STOP_1: "Stop 1 Point",
      STOP_2: "Stop 2 Point",
      STOP_3: "Stop 3 Point",
      STOP_4: "Stop 4 Point",
      STOP_5: "Stop 5 Point",
    };
    const marker = generateNewMarker({
      map: map?.map?.current!,
      lat: coordinates[1],
      lng: coordinates[0],
      text: MAP_TYPES?.[type],
    });

    map?.map?.current?.flyTo({
      center: coordinates,
      essential: true,
      zoom: 10,
    });

    setMarkers((prev) => [...prev, { type, marker }]);
  };

  const handleRemovePoint = (type: RouteTypes) => {
    const marker = markers.find((m) => m.type === type);
    if (marker) {
      marker.marker.remove();
      setMarkers((prev) => prev.filter((m) => m.type !== type));
      setCoords((prev) => prev.filter((c) => c.type !== type));
    }
  };

  useEffect(() => {
    const from = coords.find((c) => c.type === "FROM")?.coordinates;
    const to = coords.find((c) => c.type === "TO")?.coordinates;
    map?.clearPoint();
    if (from && to) {
      const coordinates = [from, to].map(([lng, lat]) => ({ lng, lat }));
      getSeaRoutes(coordinates)
        .then((data) => {
          const features = data?.features;
          const error = data?.error;

          if (error) {
            alert("Route not found, please try another destination")
          } else {
            map?.drawPoint({ id: coordinates, features });
          }
        })
        .catch((er) => {
          alert("Something went wrong, try again")
        });
    }
  }, [coords]);

  console.log({ coords });

  return (
    <div className="absolute top-0 left-0 bg-blue p-4 z-10 flex flex-col gap-4 w-[400px] text-white items-start">
      <div className="flex w-full">
        <div className="flex flex-col"></div>
        <div className="flex flex-col w-full gap-4">
          <BoxSearch
            placeholder="Choose starting point..."
            handleClickSuggestion={(e) => {
              setFrom(e.label);
              setCoords((prev) => [
                ...prev,
                { type: "FROM", coordinates: e.value },
              ]);
              handleAddPoint("FROM", e.value);
            }}
            query={from}
            handleDelete={() => {
              setFrom("");
              handleRemovePoint("FROM");
            }}
          />

          <BoxSearch
            placeholder="Choose destination..."
            handleClickSuggestion={(e) => {
              setTo(e.label);
              setCoords((prev) => [
                ...prev,
                { type: "TO", coordinates: e.value },
              ]);
              handleAddPoint("TO", e.value);
            }}
            query={to}
            handleDelete={() => {
              setTo("");
              handleRemovePoint("TO");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Actions;
