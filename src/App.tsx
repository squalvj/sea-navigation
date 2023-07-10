import { useRef } from "react";
import "./App.css";
import { MapView } from "./components/Map";
import { useMap } from "./hooks/useMap";
import { MapContext } from "./context/MapContext";
import Actions from "./components/Actions";

function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { mapObject, drawPoint, clearPoint } = useMap(mapRef);
  return (
    <MapContext.Provider value={{
      map: mapObject,
      drawPoint,
      clearPoint
    }}>
      <div className="App relative">
        <div>
          <MapView map={mapRef} />
          <Actions />
        </div>
      </div>
    </MapContext.Provider>
  );
}

export default App;
