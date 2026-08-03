import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FitBounds } from "./FitBounds";
import { makeLocationIcon } from "../utils/mapIcons";

export function LocationsMap({ points, matchedNames, height }) {
  return (
    <div
      className="w-full rounded-lg relative overflow-hidden"
      style={{ height: height || "100%" }}
    >
      <MapContainer
        center={[22.5, 79]}
        zoom={4}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <FitBounds points={points} />
        {points.map((loc) => {
          const matched = matchedNames.includes(loc.name);
          return (
            <Marker
              key={loc.name}
              position={[loc.lat, loc.lng]}
              icon={makeLocationIcon(loc.count, matched)}
            >
              <Popup>
                <strong>{loc.name}</strong>
                <br />
                {loc.count} jobs
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}