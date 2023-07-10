import { Map } from "mapbox-gl";

export const initMap = (
  container: HTMLDivElement,
  coords: [number, number]
) => {
  return new Map({
    container,
    style: "mapbox://styles/mapbox/streets-v12",
    pitchWithRotate: false,
    center: coords,
    zoom: 15,
    accessToken:
      "pk.eyJ1Ijoic3F1YWx2aiIsImEiOiJjbGp2MTlnc2QwMXJ6M3NwZ3kwNDU2d2R6In0.-TN3bQieKEgXushqhI4bsQ",
    doubleClickZoom: false,
  });
};
