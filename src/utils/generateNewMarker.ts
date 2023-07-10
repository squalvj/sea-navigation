import { Popup, Marker, Map } from "mapbox-gl";

export const generateNewMarker = ({
  lat,
  lng,
  map,
  color,
  text,
}: {
  lng: number;
  lat: number;
  map: Map;
  color?: string;
  text: string;
}) => {
  const popUp = new Popup({ closeButton: false, anchor: "left" }).setHTML(
    `<div class="popup">${text}: <br/>[${lng},  ${lat}]</div>`
  );

  return new Marker({ color: color ?? "#63df29", scale: 1.5 })
    .setLngLat([lng, lat])
    .setPopup(popUp)
    .addTo(map);
};
