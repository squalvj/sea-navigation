import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/MapContext";
import { generateNewMarker } from "../../utils/generateNewMarker";
import { Marker } from "mapbox-gl";
import TextField from "../TextField";
import SearchBox from "../SearchBox";
import { getPortByQuery } from "../../utils/searoute";
import { TCoordinates } from "../../types/coordinates";
import { usePortQuery } from "../../hooks/usePortQuery";

type LatLong = {
  lng: number | null;
  lat: number | null;
};

type RouteTypes =
  | "FROM"
  | "TO"
  | "STOP_1"
  | "STOP_2"
  | "STOP_3"
  | "STOP_4"
  | "STOP_5";

const DEFAULT_LNG_LAT = {
  lng: null,
  lat: null,
};

const Actions = () => {
  const map = useContext(MapContext);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [coords, setCoords] = useState<TCoordinates[]>();
  const { loading, error, getPort, q, suggestions } = usePortQuery(from);

  
  return (
    <div className="absolute top-0 left-0 bg-blue p-4 z-10 flex flex-col gap-4 w-[400px] text-white items-start">
      <div className="flex w-full">
        <div className="flex flex-col"></div>
        <div className="flex flex-col w-full">
          <SearchBox
            placeholder="Choose starting point..."
            error={error}
            loading={loading}
            onSearch={getPort}
            handleClickSuggestion={(e) => console.log({ e })}
            suggestionsOption={suggestions}
          />
        </div>
      </div>
    </div>
  );
};

export default Actions;
