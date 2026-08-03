import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export function FitBounds({ points }) {
  const map = useMap();

  useEffect(() => {
    // The map container can start at 0 height inside a flex/grid layout
    // (especially while the Tailwind CDN is still loading styles), which
    // makes Leaflet compute the wrong tile positions/zoom. Force a resize
    // check right after mount and again shortly after, then fit bounds.
    map.invalidateSize();
    const t = setTimeout(() => map.invalidateSize(), 250);

    const container = map.getContainer();
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(container);

    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [map]);

  useEffect(() => {
    if (!points.length) return;
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    // Give the container a moment to settle before fitting, otherwise
    // fitBounds can be computed against a stale (zero-size) viewport.
    const t = setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(bounds, { padding: [28, 28] });
    }, 60);
    return () => clearTimeout(t);
  }, [points, map]);

  return null;
}