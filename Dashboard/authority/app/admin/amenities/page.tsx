"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import {
  BuildingStorefrontIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

// Color mapping for marker icons
const markerColors: Record<string, string> = {
  Hospital: "red",
  "Police Station": "blue",
  Hotel: "green",
  Transport: "orange",
  "Tourist Info": "violet", // <-- change from "purple" to "violet" to match available marker icons
  Default: "gray",
};

// Expanded dummy data with more fields
const amenities = [
  {
    name: "Apollo Hospital Guwahati",
    type: "Hospital",
    lat: 26.1445,
    lng: 91.7362,
    icon: "hospital",
    details: "24x7 Emergency, Multi-speciality",
    registeredAt: "2012-05-10",
    documents: ["License.pdf", "Accreditation.pdf"],
    contacts: ["+91-361-2222222", "+91-9876543210"],
    touristRating: 4.6,
  },
  {
    name: "Guwahati Police Station",
    type: "Police Station",
    lat: 26.145,
    lng: 91.735,
    icon: "shield",
    details: "Central police station, emergency response",
    registeredAt: "2008-11-23",
    documents: ["GovtOrder.pdf"],
    contacts: ["100", "+91-361-1001001"],
    touristRating: 4.2,
  },
  {
    name: "Kaziranga Tourist Lodge",
    type: "Hotel",
    lat: 26.5775,
    lng: 93.1711,
    icon: "hotel",
    details: "Tourist lodge near Kaziranga gate",
    registeredAt: "2015-07-01",
    documents: ["FireSafety.pdf", "TourismBoard.pdf"],
    contacts: ["+91-3776-123456"],
    touristRating: 4.8,
  },
  {
    name: "Silchar Medical College",
    type: "Hospital",
    lat: 24.8333,
    lng: 92.7789,
    icon: "hospital",
    details: "Govt. medical college, emergency care",
    registeredAt: "1998-03-15",
    documents: ["GovtLicense.pdf"],
    contacts: ["+91-3842-222222"],
    touristRating: 4.1,
  },
  {
    name: "Jorhat Railway Station",
    type: "Transport",
    lat: 26.75,
    lng: 94.2167,
    icon: "train",
    details: "Major railway hub in Upper Assam",
    registeredAt: "1975-09-30",
    documents: ["RailwayBoard.pdf"],
    contacts: ["139", "+91-376-2233445"],
    touristRating: 4.0,
  },
  {
    name: "Tezpur Tourist Info Center",
    type: "Tourist Info",
    lat: 26.6338,
    lng: 92.8,
    icon: "info",
    details: "Tourist information and helpdesk",
    registeredAt: "2019-01-20",
    documents: ["TourismDept.pdf"],
    contacts: ["+91-3712-112233"],
    touristRating: 4.7,
  },
  // More dummy data
  {
    name: "Dibrugarh Airport",
    type: "Transport",
    lat: 27.4839,
    lng: 95.0169,
    icon: "plane",
    details: "Domestic airport, taxi services available",
    registeredAt: "2002-06-18",
    documents: ["AirportLicense.pdf"],
    contacts: ["+91-373-2381234"],
    touristRating: 4.3,
  },
  {
    name: "Shillong Guest House",
    type: "Hotel",
    lat: 25.5788,
    lng: 91.8933,
    icon: "hotel",
    details: "Budget guest house for tourists",
    registeredAt: "2017-10-05",
    documents: ["HotelLicense.pdf"],
    contacts: ["+91-364-2233445"],
    touristRating: 4.5,
  },
  {
    name: "Dispur Fire Station",
    type: "Police Station",
    lat: 26.1411,
    lng: 91.7906,
    icon: "fire",
    details: "Fire emergency services",
    registeredAt: "2010-04-12",
    documents: ["FireDept.pdf"],
    contacts: ["101", "+91-361-1011011"],
    touristRating: 4.4,
  },
  {
    name: "Majuli Eco Camp",
    type: "Hotel",
    lat: 27.0226,
    lng: 94.1586,
    icon: "hotel",
    details: "Eco-friendly camp for tourists",
    registeredAt: "2021-08-15",
    documents: ["EcoCert.pdf"],
    contacts: ["+91-3775-998877"],
    touristRating: 4.9,
  },
];

// Move dynamic imports inside the component and only after isClient is true
export default function AmenitiesPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState<any | null>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [filterType, setFilterType] = useState<string>("All");
  const getColoredIconRef = useRef<any>(null);

  // Dynamic imports for react-leaflet components (must be outside render)
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

  useEffect(() => {
    setIsClient(true);
    import("leaflet").then((L) => {
      import("leaflet/dist/leaflet.css");
      getColoredIconRef.current = (type: string) => {
        // Only allow valid colors from the marker icon set
        const allowedColors = [
          "red",
          "blue",
          "green",
          "orange",
          "violet",
          "gray",
        ];
        const color =
          markerColors[type] && allowedColors.includes(markerColors[type])
            ? markerColors[type]
            : markerColors.Default;
        return new L.Icon({
          iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });
      };
      setLeafletLoaded(true);
    });
  }, []);

  // Get unique amenity types for filter dropdown
  const amenityTypes = Array.from(new Set(amenities.map((a) => a.type)));
  amenityTypes.unshift("All");

  // Filtered amenities
  const filteredAmenities =
    filterType === "All"
      ? amenities
      : amenities.filter((a) => a.type === filterType);

  // Modal for detailed view
  function AmenityDetailModal({
    amenity,
    onClose,
  }: {
    amenity: any;
    onClose: () => void;
  }) {
    if (!amenity) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-white/10">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative z-[101]">
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
          <h3 className="text-xl font-bold text-blue-700 mb-2">
            {amenity.name}
          </h3>
          <div className="mb-1 text-sm text-gray-700 font-semibold">
            {amenity.type}
          </div>
          <div className="mb-2 text-sm text-gray-600">{amenity.details}</div>
          <div className="mb-2 text-xs text-gray-500">
            <span className="font-semibold">Registered:</span>{" "}
            {amenity.registeredAt}
          </div>
          <div className="mb-2 text-xs text-gray-500">
            <span className="font-semibold">Documents:</span>{" "}
            {amenity.documents && amenity.documents.length > 0
              ? amenity.documents.join(", ")
              : "N/A"}
          </div>
          <div className="mb-2 text-xs text-gray-500">
            <span className="font-semibold">Contacts:</span>{" "}
            {amenity.contacts && amenity.contacts.length > 0
              ? amenity.contacts.join(", ")
              : "N/A"}
          </div>
          <div className="mb-2 text-xs text-gray-500">
            <span className="font-semibold">Tourist Rating:</span>{" "}
            <span className="text-yellow-500 font-bold">
              {amenity.touristRating} / 5
            </span>
          </div>
          <div className="text-xs text-gray-400">
            Lat: {amenity.lat}, Lng: {amenity.lng}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeMenuItem="Amenities Map" setActiveMenuItem={() => {}} />
      <SideMenu activeMenuItem="Amenities Map" setActiveMenuItem={() => {}} />
      <div className="flex-1 ml-64 p-4 flex justify-center">
        <div className="w-full max-w-5xl">
          {/* <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BuildingStorefrontIcon className="w-7 h-7 text-blue-600" />
            Amenities Map (Dummy)
          </h1> */}
          {/* <p className="text-gray-700 mb-6">
            Explore key amenities for tourists in Assam. This is a demo map with
            sample data.
          </p> */}
          {/* Filter Dropdown */}
          <div className="mb-4 flex items-center gap-2">
            <label
              htmlFor="amenity-type"
              className="text-sm font-medium text-gray-700"
            >
              Filter by type:
            </label>
            <select
              id="amenity-type"
              className="border rounded px-2 py-1 text-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {amenityTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-white border rounded-lg shadow p-4 mb-6">
            <div className="w-full h-96 rounded-lg overflow-hidden">
              {isClient &&
                leafletLoaded &&
                getColoredIconRef.current &&
                DynamicMapContainer &&
                DynamicTileLayer &&
                DynamicMarker &&
                DynamicPopup && (
                  <DynamicMapContainer
                    center={[26.2, 92.9]}
                    zoom={7}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%", zIndex: 10 }}
                  >
                    <DynamicTileLayer
                      attribution="&copy; OpenStreetMap contributors"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filteredAmenities.map((a, idx) => (
                      <DynamicMarker
                        key={idx}
                        position={[a.lat, a.lng]}
                        icon={getColoredIconRef.current(a.type)}
                        eventHandlers={{
                          click: () => setSelectedAmenity(a),
                        }}
                      >
                        <DynamicPopup>
                          <div>
                            <div
                              className="font-bold text-blue-700 mb-1 cursor-pointer"
                              onClick={() => setSelectedAmenity(a)}
                            >
                              {a.name}
                            </div>
                            <div className="text-xs text-gray-700 mb-1">
                              <span className="font-semibold">{a.type}</span>
                            </div>
                            <div className="text-xs text-gray-600">
                              {a.details}
                            </div>
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
            {/* <h2 className="text-lg font-semibold mb-2">
              Amenities List (Dummy)
            </h2> */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAmenities.map((a, idx) => (
                <li
                  key={idx}
                  className="border rounded p-2 flex flex-col hover:bg-blue-50 cursor-pointer"
                  onClick={() => setSelectedAmenity(a)}
                >
                  <span className="font-bold text-blue-700">{a.name}</span>
                  <span className="text-xs text-gray-700">{a.type}</span>
                  <span className="text-xs text-gray-600">{a.details}</span>
                  <span className="text-xs text-gray-400">
                    Lat: {a.lat}, Lng: {a.lng}
                  </span>
                  <span className="text-xs text-gray-500">
                    Registered: {a.registeredAt}
                  </span>
                  <span className="text-xs text-gray-500">
                    Contacts: {a.contacts?.join(", ")}
                  </span>
                  <span className="text-xs text-gray-500">
                    Tourist Rating:{" "}
                    <span className="text-yellow-500 font-bold">
                      {a.touristRating}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {selectedAmenity && (
          <AmenityDetailModal
            amenity={selectedAmenity}
            onClose={() => setSelectedAmenity(null)}
          />
        )}
      </div>
      <style jsx global>{`
        .leaflet-container {
          font-family: "Inter", sans-serif;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
        /* Ensure modal is always above the map */
        .leaflet-container {
          z-index: 10 !important;
        }
        .leaflet-pane,
        .leaflet-top,
        .leaflet-bottom {
          z-index: 10 !important;
        }
        .fixed.z-\\[100\\] {
          z-index: 100 !important;
        }
      `}</style>
    </div>
  );
}
