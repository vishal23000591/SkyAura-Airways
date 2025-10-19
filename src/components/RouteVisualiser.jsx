import React from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function RouteVisualiser({ source, destination }) {
  const center = [
    (source.lat + destination.lat) / 2,
    (source.lon + destination.lon) / 2,
  ];

  const route = [
    [source.lat, source.lon],
    [destination.lat, destination.lon],
  ];

  return (
    <MapContainer center={center} zoom={5} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[source.lat, source.lon]}>
        <Popup>{source.name}</Popup>
      </Marker>
      <Marker position={[destination.lat, destination.lon]}>
        <Popup>{destination.name}</Popup>
      </Marker>
      <Polyline positions={route} color="blue" />
    </MapContainer>
  );
}

export default RouteVisualiser;
