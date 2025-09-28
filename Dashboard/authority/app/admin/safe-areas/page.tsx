"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

// All safe/unsafe/restricted areas (from the Python code)
const safeAreas = [
  {
    name: "Guwahati City Center",
    lat: 26.1445,
    lng: 91.7362,
    status: "Safe",
    description: "Low crime rate, high police presence, well-lit streets.",
    marked_on: "2025-01-08",
    radius: 12000,
  },
  {
    name: "Kaziranga National Park",
    lat: 26.5775,
    lng: 93.1711,
    status: "Safe",
    description: "Protected wildlife zone, regular patrols, tourist-friendly.",
    marked_on: "2025-01-07",
    radius: 18000,
  },
  {
    name: "Manas National Park",
    lat: 26.6593,
    lng: 90.9391,
    status: "Unsafe",
    description: "Recent wildlife incidents, limited emergency access.",
    marked_on: "2025-01-06",
    radius: 16000,
  },
  {
    name: "Sivasagar Heritage Zone",
    lat: 26.9821,
    lng: 94.6426,
    status: "Safe",
    description: "Tourist zone, monitored by local authorities.",
    marked_on: "2025-01-05",
    radius: 11000,
  },
  {
    name: "Border Area (Assam-Meghalaya)",
    lat: 25.9,
    lng: 92.5,
    status: "Unsafe",
    description: "Reported trespassing and cross-border incidents.",
    marked_on: "2025-01-04",
    radius: 20000,
  },
  {
    name: "Silchar Urban Area",
    lat: 24.8333,
    lng: 92.7789,
    status: "Safe",
    description: "Urban center, good medical and police facilities.",
    marked_on: "2025-01-03",
    radius: 13000,
  },
  {
    name: "North Cachar Hills",
    lat: 25.5,
    lng: 93.0,
    status: "Unsafe",
    description: "Remote region, limited connectivity, recent landslides.",
    marked_on: "2025-01-02",
    radius: 17000,
  },
  {
    name: "Goalpara Wetlands",
    lat: 26.1833,
    lng: 90.6167,
    status: "Safe",
    description: "Eco-tourism zone, regular monitoring, safe for visitors.",
    marked_on: "2025-01-01",
    radius: 14000,
  },
  {
    name: "Jorhat Tea Gardens",
    lat: 26.75,
    lng: 94.2167,
    status: "Safe",
    description: "Well-managed tea estates, regular security patrols.",
    marked_on: "2025-01-08",
    radius: 10000,
  },
  {
    name: "Barak Valley",
    lat: 24.8333,
    lng: 92.8333,
    status: "Safe",
    description: "Scenic region, moderate population, low incident rate.",
    marked_on: "2025-01-07",
    radius: 15000,
  },
  {
    name: "Diphu Eco Zone",
    lat: 25.84,
    lng: 93.43,
    status: "Safe",
    description: "Eco-tourism, active local monitoring, safe for families.",
    marked_on: "2025-01-06",
    radius: 12000,
  },
  {
    name: "Dibrugarh Riverside",
    lat: 27.4728,
    lng: 94.912,
    status: "Unsafe",
    description: "Flood-prone area, recent thefts reported.",
    marked_on: "2025-01-05",
    radius: 17000,
  },
  {
    name: "Tezpur Cultural Zone",
    lat: 26.6338,
    lng: 92.8,
    status: "Safe",
    description: "Cultural hub, frequent events, good emergency response.",
    marked_on: "2025-01-04",
    radius: 11000,
  },
  {
    name: "Haflong Hill Station",
    lat: 25.1706,
    lng: 93.0176,
    status: "Safe",
    description: "Hill station, tourist-friendly, regular police patrols.",
    marked_on: "2025-01-03",
    radius: 13000,
  },
  {
    name: "Bongaigaon Urban Zone",
    lat: 26.4826,
    lng: 90.561,
    status: "Safe",
    description: "Urban center, moderate crime, active community watch.",
    marked_on: "2025-01-02",
    radius: 12000,
  },
  {
    name: "Dhemaji Riverside",
    lat: 27.4861,
    lng: 94.6167,
    status: "Unsafe",
    description: "Flooding risk, limited medical facilities.",
    marked_on: "2025-01-01",
    radius: 18000,
  },
  {
    name: "Tinsukia Eco Park",
    lat: 27.4922,
    lng: 95.3537,
    status: "Safe",
    description: "Nature park, regular staff patrols, safe for visitors.",
    marked_on: "2025-01-08",
    radius: 10000,
  },
  {
    name: "Majuli Island",
    lat: 26.9546,
    lng: 94.203,
    status: "Unsafe",
    description: "Seasonal flooding, ferry delays, limited emergency access.",
    marked_on: "2025-01-07",
    radius: 16000,
  },
  {
    name: "Nagaon Heritage Zone",
    lat: 26.35,
    lng: 92.6833,
    status: "Safe",
    description: "Heritage sites, local authority monitoring.",
    marked_on: "2025-01-06",
    radius: 11000,
  },
  {
    name: "Sonitpur Forest Area",
    lat: 26.7,
    lng: 92.9,
    status: "Unsafe",
    description: "Wildlife movement, restricted access, recent incidents.",
    marked_on: "2025-01-05",
    radius: 20000,
  },
  {
    name: "Karimganj Border",
    lat: 24.86,
    lng: 92.36,
    status: "Unsafe",
    description: "Border zone, recent trespassing, limited security.",
    marked_on: "2025-01-04",
    radius: 17000,
  },
  {
    name: "Morigaon Town",
    lat: 26.25,
    lng: 92.34,
    status: "Safe",
    description: "Town area, active police, low incident rate.",
    marked_on: "2025-01-03",
    radius: 12000,
  },
  {
    name: "Lakhimpur Riverside",
    lat: 27.2,
    lng: 94.1,
    status: "Unsafe",
    description: "Flood-prone, recent evacuation, limited access.",
    marked_on: "2025-01-02",
    radius: 18000,
  },
  {
    name: "Dima Hasao Hills",
    lat: 25.5,
    lng: 93.2,
    status: "Safe",
    description: "Hill region, eco-tourism, regular monitoring.",
    marked_on: "2025-01-01",
    radius: 13000,
  },
  {
    name: "Nalbari Town",
    lat: 26.44,
    lng: 91.45,
    status: "Safe",
    description: "Town area, good civic amenities, low crime.",
    marked_on: "2025-01-08",
    radius: 11000,
  },
  {
    name: "Baksa Forest",
    lat: 26.65,
    lng: 91.15,
    status: "Unsafe",
    description: "Dense forest, wildlife movement, restricted entry.",
    marked_on: "2025-01-07",
    radius: 19000,
  },
  {
    name: "Sadiya Border",
    lat: 27.83,
    lng: 95.6,
    status: "Unsafe",
    description: "Border zone, recent security incidents.",
    marked_on: "2025-01-06",
    radius: 17000,
  },
  {
    name: "Dhubri Riverside",
    lat: 26.02,
    lng: 89.97,
    status: "Unsafe",
    description: "Flood-prone, limited rescue access.",
    marked_on: "2025-01-05",
    radius: 18000,
  },
  {
    name: "Mangaldoi Town",
    lat: 26.43,
    lng: 92.03,
    status: "Safe",
    description: "Town area, active police, safe for tourists.",
    marked_on: "2025-01-04",
    radius: 12000,
  },
  {
    name: "Hojai Urban Area",
    lat: 26.0,
    lng: 92.85,
    status: "Safe",
    description: "Urban center, good medical facilities.",
    marked_on: "2025-01-03",
    radius: 11000,
  },
  {
    name: "Udalguri Forest",
    lat: 26.75,
    lng: 92.13,
    status: "Unsafe",
    description: "Forest zone, recent wildlife incidents.",
    marked_on: "2025-01-02",
    radius: 20000,
  },
  {
    name: "Biswanath Chariali",
    lat: 26.73,
    lng: 93.13,
    status: "Safe",
    description: "Town area, regular patrols, safe for families.",
    marked_on: "2025-01-01",
    radius: 12000,
  },
  {
    name: "Moranhat",
    lat: 27.1,
    lng: 94.9,
    status: "Safe",
    description: "Small town, low incident rate.",
    marked_on: "2025-01-08",
    radius: 10000,
  },
  {
    name: "Dhekiajuli",
    lat: 26.7,
    lng: 92.5,
    status: "Safe",
    description: "Town area, active community watch.",
    marked_on: "2025-01-07",
    radius: 11000,
  },
  {
    name: "Gohpur",
    lat: 26.88,
    lng: 93.63,
    status: "Safe",
    description: "Town area, good emergency response.",
    marked_on: "2025-01-06",
    radius: 12000,
  },
  {
    name: "Bilasipara",
    lat: 26.23,
    lng: 90.23,
    status: "Unsafe",
    description: "Flood-prone, limited medical facilities.",
    marked_on: "2025-01-05",
    radius: 17000,
  },
  {
    name: "Sibsagar",
    lat: 26.98,
    lng: 94.63,
    status: "Safe",
    description: "Heritage town, monitored by authorities.",
    marked_on: "2025-01-04",
    radius: 11000,
  },
  {
    name: "Jorabat",
    lat: 25.97,
    lng: 91.89,
    status: "Safe",
    description: "Entry point, high police presence.",
    marked_on: "2025-01-03",
    radius: 12000,
  },
  {
    name: "Duliajan",
    lat: 27.36,
    lng: 95.32,
    status: "Safe",
    description: "Oil town, regular security patrols.",
    marked_on: "2025-01-02",
    radius: 10000,
  },
  {
    name: "Tinsukia Town",
    lat: 27.49,
    lng: 95.36,
    status: "Safe",
    description: "Urban center, good civic amenities.",
    marked_on: "2025-01-01",
    radius: 11000,
  },
  // Restricted areas
  {
    name: "Dampa Tiger Reserve",
    lat: 24.25,
    lng: 92.45,
    status: "Restricted",
    description:
      "Tiger reserve, entry only with permit. Restricted for wildlife protection.",
    marked_on: "2025-01-09",
    radius: 22000,
  },
  {
    name: "Nameri National Park",
    lat: 26.94,
    lng: 92.85,
    status: "Restricted",
    description:
      "Sensitive forest area, restricted for conservation. Entry only for research.",
    marked_on: "2025-01-08",
    radius: 20000,
  },
  {
    name: "Assam-Arunachal Border Forest",
    lat: 27.15,
    lng: 93.92,
    status: "Restricted",
    description:
      "Border forest, restricted due to security and wildlife movement.",
    marked_on: "2025-01-07",
    radius: 21000,
  },
  {
    name: "Burachapori Wildlife Sanctuary",
    lat: 26.65,
    lng: 92.45,
    status: "Restricted",
    description: "Wildlife sanctuary, restricted for habitat protection.",
    marked_on: "2025-01-06",
    radius: 18000,
  },
  {
    name: "Chakrashila Wildlife Sanctuary",
    lat: 26.25,
    lng: 90.25,
    status: "Restricted",
    description: "Restricted for Golden Langur conservation.",
    marked_on: "2025-01-05",
    radius: 17000,
  },
  {
    name: "Border Area (Assam-Nagaland)",
    lat: 26.0,
    lng: 94.0,
    status: "Restricted",
    description: "Border zone, restricted due to cross-border security.",
    marked_on: "2025-01-04",
    radius: 20000,
  },
];

// Status color mapping for map and UI
const statusColors: Record<string, string> = {
  Safe: "green",
  Unsafe: "red",
  Restricted: "violet",
  Default: "gray",
};

export default function SafeAreasPage() {
  const [isClient, setIsClient] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [selectedArea, setSelectedArea] = useState<any | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const getCircleOptionsRef = useRef<any>(null);

  // Dynamic imports for react-leaflet
  const DynamicMapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
  );
  const DynamicTileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
  );
  const DynamicCircle = dynamic(
    () => import("react-leaflet").then((mod) => mod.Circle),
    { ssr: false }
  );
  const DynamicPopup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    { ssr: false }
  );
  const DynamicTooltip = dynamic(
    () => import("react-leaflet").then((mod) => mod.Tooltip),
    { ssr: false }
  );

  useEffect(() => {
    setIsClient(true);
    import("leaflet").then(() => {
      import("leaflet/dist/leaflet.css");
      getCircleOptionsRef.current = (status: string) => {
        const color = statusColors[status] || statusColors.Default;
        let fillOpacity = 0.4;
        if (status === "Unsafe") fillOpacity = 0.6;
        if (status === "Restricted") fillOpacity = 0.5;
        return {
          color,
          fillColor: color,
          fillOpacity,
          weight: 2,
        };
      };
      setLeafletLoaded(true);
    });
  }, []);

  // Get unique status types for filter dropdown
  const statusTypes = [
    "All",
    ...Array.from(new Set(safeAreas.map((a) => a.status))),
  ];

  // Filtered areas
  const filteredAreas =
    filterStatus === "All"
      ? safeAreas
      : safeAreas.filter((a) => a.status === filterStatus);

  // Modal for detailed view
  function AreaDetailModal({
    area,
    onClose,
  }: {
    area: any;
    onClose: () => void;
  }) {
    if (!area) return null;
    const color = statusColors[area.status] || statusColors.Default;
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
          <h3 className="text-xl font-bold mb-2" style={{ color }}>
            {area.name}
          </h3>
          <div className="mb-1 text-sm font-semibold" style={{ color }}>
            {area.status}
          </div>
          <div className="mb-2 text-sm text-gray-600">{area.description}</div>
          <div className="mb-2 text-xs text-gray-500">
            <span className="font-semibold">Date Plotted:</span>{" "}
            {area.marked_on}
          </div>
          <div className="mb-2 text-xs text-gray-500">
            <span className="font-semibold">Coverage Radius:</span>{" "}
            {(area.radius / 1000).toFixed(1)} km
          </div>
          <div className="text-xs text-gray-400">
            Lat: {area.lat}, Lng: {area.lng}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeMenuItem="Safe Areas" setActiveMenuItem={() => {}} />
      <SideMenu activeMenuItem="Safe Areas" setActiveMenuItem={() => {}} />
      <div className="flex-1 ml-64 p-4 flex justify-center">
        <div className="w-full max-w-5xl">
          {/* <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheckIcon className="w-7 h-7 text-orange-500" />
            Safe Area Management
          </h1>
          <p className="text-gray-700 mb-6">
            Mark, manage, and monitor safe, dangerous, reserved, or restricted
            areas.
          </p> */}
          {/* Filter Dropdown */}
          <div className="mb-4 flex items-center gap-2">
            <label
              htmlFor="area-status"
              className="text-sm font-medium text-gray-700"
            >
              Filter by status:
            </label>
            <select
              id="area-status"
              className="border rounded px-2 py-1 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statusTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {/* Map Section */}
          <div className="bg-white border rounded-lg shadow p-4 mb-6">
            <div className="w-full h-96 rounded-lg overflow-hidden">
              {isClient &&
                leafletLoaded &&
                getCircleOptionsRef.current &&
                DynamicMapContainer &&
                DynamicTileLayer &&
                DynamicCircle &&
                DynamicPopup &&
                DynamicTooltip && (
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
                    {filteredAreas.map((a, idx) => (
                      <DynamicCircle
                        key={a.name}
                        center={[a.lat, a.lng]}
                        radius={a.radius}
                        pathOptions={getCircleOptionsRef.current(a.status)}
                        eventHandlers={{
                          click: () => setSelectedArea(a),
                        }}
                      >
                        <DynamicPopup>
                          <div>
                            <div
                              className="font-bold mb-1 cursor-pointer"
                              style={{
                                color:
                                  statusColors[a.status] ||
                                  statusColors.Default,
                              }}
                              onClick={() => setSelectedArea(a)}
                            >
                              {a.name}
                            </div>
                            <div
                              className="text-xs mb-1"
                              style={{
                                color:
                                  statusColors[a.status] ||
                                  statusColors.Default,
                              }}
                            >
                              <span className="font-semibold">{a.status}</span>
                            </div>
                            <div className="text-xs text-gray-600">
                              {a.description}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              Lat: {a.lat}, Lng: {a.lng}
                            </div>
                            <div className="text-xs text-gray-500">
                              Plotted: {a.marked_on}
                            </div>
                            <div className="text-xs text-gray-500">
                              Radius: {(a.radius / 1000).toFixed(1)} km
                            </div>
                          </div>
                        </DynamicPopup>
                        <DynamicTooltip sticky>
                          <div>
                            {a.name} ({a.status}) - Plotted: {a.marked_on}
                          </div>
                        </DynamicTooltip>
                      </DynamicCircle>
                    ))}
                  </DynamicMapContainer>
                )}
            </div>
          </div>
          {/* List Section */}
          <div className="bg-white border rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-2">
              Safe/Unsafe/Restricted Areas List
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAreas.map((a) => (
                <li
                  key={a.name}
                  className="border rounded p-2 flex flex-col hover:bg-orange-50 cursor-pointer"
                  onClick={() => setSelectedArea(a)}
                >
                  <span
                    className="font-bold"
                    style={{
                      color: statusColors[a.status] || statusColors.Default,
                    }}
                  >
                    {a.name}
                  </span>
                  <span
                    className="text-xs"
                    style={{
                      color: statusColors[a.status] || statusColors.Default,
                    }}
                  >
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium`}
                      style={{
                        background:
                          a.status === "Safe"
                            ? "#bbf7d0"
                            : a.status === "Restricted"
                            ? "#ede9fe"
                            : "#fecaca",
                        color:
                          a.status === "Safe"
                            ? "#166534"
                            : a.status === "Restricted"
                            ? "#6d28d9"
                            : "#991b1b",
                      }}
                    >
                      {a.status}
                    </span>
                  </span>
                  <span className="text-xs text-gray-600">{a.description}</span>
                  <span className="text-xs text-gray-500">
                    Plotted: {a.marked_on}
                  </span>
                  <span className="text-xs text-gray-500">
                    Radius: {(a.radius / 1000).toFixed(1)} km
                  </span>
                  <span className="text-xs text-gray-400">
                    Lat: {a.lat}, Lng: {a.lng}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {selectedArea && (
          <AreaDetailModal
            area={selectedArea}
            onClose={() => setSelectedArea(null)}
          />
        )}
      </div>
      <style jsx global>{`
        .leaflet-container {
          font-family: "Inter", sans-serif;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
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
