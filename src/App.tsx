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
          {/* <div className="control absolute top-0 right-0 p-4 bg-white">
          <button onClick={handleAddFrom}>
            Add From
          </button>
        </div> */}
          <Actions />
        </div>
      </div>
    </MapContext.Provider>
  );
}

export default App;
