"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const yellowIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const grayIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function GuideMap({ guides }: { guides: any[] }) {
  return (
    <MapContainer
      center={[26.2, 92.9]}
      zoom={7}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {guides.map((g) => {
        let icon = greenIcon;
        if (g.status !== "Active") icon = grayIcon;
        else if (!g.idVerified) icon = yellowIcon;
        return (
          <Marker key={g.id} position={g.lastLocation} icon={icon}>
            <Popup>
              <div>
                <div className="font-bold text-orange-700 mb-1">{g.name}</div>
                <div className="text-xs text-gray-700 mb-1">
                  <span className="font-semibold">Last Place:</span>{" "}
                  {g.lastPlace}
                </div>
                <div className="text-xs text-gray-600">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={
                      g.status === "Active" ? "text-green-700" : "text-gray-700"
                    }
                  >
                    {g.status}
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  <span className="font-semibold">ID Verified:</span>{" "}
                  <span
                    className={
                      g.idVerified ? "text-green-700" : "text-yellow-700"
                    }
                  >
                    {g.idVerified ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
