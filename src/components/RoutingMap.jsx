// RoutingMap.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";

function RoutingMap({ source, destination }) {
  if (!source || !destination) return null;

  const position1 = [source.lat, source.lon];
  const position2 = [destination.lat, destination.lon];

  return (
    <MapContainer center={position1} zoom={4} className="leaflet-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position1}>
        <Popup>Source: {source.name}</Popup>
      </Marker>
      <Marker position={position2}>
        <Popup>Destination: {destination.name}</Popup>
      </Marker>
      <Polyline positions={[position1, position2]} color="blue" />
    </MapContainer>
  );
}

export default RoutingMap;
