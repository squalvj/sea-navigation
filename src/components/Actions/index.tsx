import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/MapContext";
import { generateNewMarker } from "../../utils/generateNewMarker";
import { Marker } from "mapbox-gl";
import TextField from "../TextField";
import SearchBox, { Suggestion } from "../SearchBox";
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

type CoordinatesMap = {
  type: RouteTypes;
  coordinates: TCoordinates;
};

const BoxPoint = ({
  query,
  handleClickSuggestion,
  placeholder,
}: {
  query: string;
  handleClickSuggestion: (param: Suggestion<[string, string]>) => void;
  placeholder: string;
}) => {
  const { loading, error, getPort, suggestions } = usePortQuery(query);
  return (
    <SearchBox
      q={query}
      placeholder={placeholder}
      error={error}
      loading={loading}
      onSearch={getPort}
      handleClickSuggestion={(e) => handleClickSuggestion(e)}
      suggestionsOption={suggestions}
    />
  );
};

const Actions = () => {
  const map = useContext(MapContext);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [coords, setCoords] = useState<CoordinatesMap[]>([]);
  const [markers, setMarkers] = useState([])

  

  return (
    <div className="absolute top-0 left-0 bg-blue p-4 z-10 flex flex-col gap-4 w-[400px] text-white items-start">
      <div className="flex w-full">
        <div className="flex flex-col"></div>
        <div className="flex flex-col w-full gap-4">
          <BoxPoint
            placeholder="Choose starting point..."
            handleClickSuggestion={(e) => {
              console.log({e});
              setFrom(e.label);
              setCoords((prev) => [
                ...prev,
                { type: "FROM", coordinates: e.value },
              ]);
            }}
            query={from}
          />

          <BoxPoint
            placeholder="Choose destination..."
            handleClickSuggestion={(e) => {
              setTo(e.label);
              setCoords((prev) => [
                ...prev,
                { type: "TO", coordinates: e.value },
              ]);
            }}
            query={to}
          />
        </div>
      </div>
    </div>
  );
};

export default Actions;
