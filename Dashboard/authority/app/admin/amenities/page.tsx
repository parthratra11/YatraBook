"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import {
  BuildingStorefrontIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

// Dynamically import Leaflet components
const DynamicMapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const DynamicTileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const DynamicMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const DynamicPopup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

const amenities = [
  {
    name: "Apollo Hospital Guwahati",
    type: "Hospital",
    lat: 26.1445,
    lng: 91.7362,
    icon: "hospital",
    details: "24x7 Emergency, Multi-speciality",
  },
  {
    name: "Guwahati Police Station",
    type: "Police Station",
    lat: 26.145,
    lng: 91.735,
    icon: "shield",
    details: "Central police station, emergency response",
  },
  {
    name: "Kaziranga Tourist Lodge",
    type: "Hotel",
    lat: 26.5775,
    lng: 93.1711,
    icon: "hotel",
    details: "Tourist lodge near Kaziranga gate",
  },
  {
    name: "Silchar Medical College",
    type: "Hospital",
    lat: 24.8333,
    lng: 92.7789,
    icon: "hospital",
    details: "Govt. medical college, emergency care",
  },
  {
    name: "Jorhat Railway Station",
    type: "Transport",
    lat: 26.75,
    lng: 94.2167,
    icon: "train",
    details: "Major railway hub in Upper Assam",
  },
  {
    name: "Tezpur Tourist Info Center",
    type: "Tourist Info",
    lat: 26.6338,
    lng: 92.8,
    icon: "info",
    details: "Tourist information and helpdesk",
  },
];

export default function AmenitiesPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    import("leaflet/dist/leaflet.css");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeMenuItem="Amenities Map" setActiveMenuItem={() => {}} />
      <SideMenu activeMenuItem="Amenities Map" setActiveMenuItem={() => {}} />
      <div className="flex-1 ml-64 p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BuildingStorefrontIcon className="w-7 h-7 text-blue-600" />
          Amenities Map (Dummy)
        </h1>
        <p className="text-gray-700 mb-6">
          Explore key amenities for tourists in Assam. This is a demo map with
          sample data.
        </p>
        <div className="bg-white border rounded-lg shadow p-4 mb-6">
          <div className="w-full h-96 rounded-lg overflow-hidden">
            {isClient && (
              <DynamicMapContainer
                center={[26.2, 92.9]}
                zoom={7}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <DynamicTileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {amenities.map((a, idx) => (
                  <DynamicMarker key={idx} position={[a.lat, a.lng]}>
                    <DynamicPopup>
                      <div>
                        <div className="font-bold text-blue-700 mb-1">
                          {a.name}
                        </div>
                        <div className="text-xs text-gray-700 mb-1">
                          <span className="font-semibold">{a.type}</span>
                        </div>
                        <div className="text-xs text-gray-600">{a.details}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          Lat: {a.lat}, Lng: {a.lng}
                        </div>
                      </div>
                    </DynamicPopup>
                  </DynamicMarker>
                ))}
              </DynamicMapContainer>
            )}
          </div>
        </div>
        <div className="bg-white border rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Amenities List (Dummy)</h2>
          <ul className="space-y-2">
            {amenities.map((a, idx) => (
              <li key={idx} className="border rounded p-2 flex flex-col">
                <span className="font-bold text-blue-700">{a.name}</span>
                <span className="text-xs text-gray-700">{a.type}</span>
                <span className="text-xs text-gray-600">{a.details}</span>
                <span className="text-xs text-gray-400">
                  Lat: {a.lat}, Lng: {a.lng}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx global>{`
        .leaflet-container {
          font-family: "Inter", sans-serif;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
      `}</style>
    </div>
  );
}
