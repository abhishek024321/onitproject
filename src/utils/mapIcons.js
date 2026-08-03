import L from "leaflet";
import { T } from "../constants/theme";

export function makeLocationIcon(count, matched) {
  return L.divIcon({
    className: "",
    html: `<div style="
      display:flex;align-items:center;justify-content:center;
      width:26px;height:26px;border-radius:9999px;
      background:${T.blue};color:#fff;font-size:10px;font-weight:700;
      font-family:inherit;border:2px solid #fff;
      box-shadow:0 1px 4px rgba(0,0,0,0.3);
      opacity:${matched ? 1 : 0.35};transition:opacity 0.2s;
    ">${String(count).padStart(2, "0")}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -14],
  });
}