"use client";

import {
  UserGroupIcon,
  MapPinIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Leaflet components for map visualization
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

// Use the same zones as leaderboard, but with more and accurate data
const zones = [
  {
    place: "Guwahati City Center",
    tourists: [
      {
        name: "John Doe",
        nationality: "USA",
        status: "Active",
        coords: [26.1445, 91.7362],
      },
      {
        name: "Priya Singh",
        nationality: "India",
        status: "Active",
        coords: [26.145, 91.735],
      },
      {
        name: "Alex Kim",
        nationality: "South Korea",
        status: "Active",
        coords: [26.146, 91.737],
      },
      {
        name: "Fatima Noor",
        nationality: "Bangladesh",
        status: "Active",
        coords: [26.143, 91.738],
      },
      {
        name: "Michael Brown",
        nationality: "UK",
        status: "Active",
        coords: [26.147, 91.734],
      },
      {
        name: "Li Wei",
        nationality: "China",
        status: "Active",
        coords: [26.148, 91.739],
      },
      {
        name: "Amit Sharma",
        nationality: "India",
        status: "Active",
        coords: [26.149, 91.736],
      },
      {
        name: "Maria Lopez",
        nationality: "Spain",
        status: "Active",
        coords: [26.142, 91.735],
      },
      {
        name: "Rajiv Das",
        nationality: "India",
        status: "Active",
        coords: [26.141, 91.733],
      },
      {
        name: "Emily Brown",
        nationality: "Australia",
        status: "Active",
        coords: [26.14, 91.732],
      },
    ],
    total: 320,
    international: 120,
    domestic: 200,
    highPriority: 5,
    coords: [26.1445, 91.7362],
    density: "High",
  },
  {
    place: "Kaziranga National Park",
    tourists: [
      {
        name: "Sarah Smith",
        nationality: "UK",
        status: "Active",
        coords: [26.5775, 93.1711],
      },
      {
        name: "Ravi Patel",
        nationality: "India",
        status: "Active",
        coords: [26.578, 93.172],
      },
      {
        name: "Chen Wei",
        nationality: "China",
        status: "Active",
        coords: [26.579, 93.17],
      },
      {
        name: "Olga Ivanova",
        nationality: "Russia",
        status: "Active",
        coords: [26.576, 93.173],
      },
      {
        name: "David Miller",
        nationality: "USA",
        status: "Active",
        coords: [26.575, 93.174],
      },
      {
        name: "Ayesha Khan",
        nationality: "Pakistan",
        status: "Active",
        coords: [26.574, 93.175],
      },
      {
        name: "Suresh Reddy",
        nationality: "India",
        status: "Active",
        coords: [26.573, 93.176],
      },
      {
        name: "Linda Lee",
        nationality: "Singapore",
        status: "Active",
        coords: [26.572, 93.177],
      },
    ],
    total: 210,
    international: 80,
    domestic: 130,
    highPriority: 3,
    coords: [26.5775, 93.1711],
    density: "High",
  },
  {
    place: "Majuli Island",
    tourists: [
      {
        name: "Rajiv Das",
        nationality: "India",
        status: "Active",
        coords: [26.9546, 94.203],
      },
      {
        name: "Maria Lopez",
        nationality: "Spain",
        status: "Active",
        coords: [26.955, 94.204],
      },
      {
        name: "Tomoko Sato",
        nationality: "Japan",
        status: "Active",
        coords: [26.956, 94.205],
      },
      {
        name: "Ahmed Hassan",
        nationality: "Egypt",
        status: "Active",
        coords: [26.957, 94.206],
      },
      {
        name: "Suman Roy",
        nationality: "India",
        status: "Active",
        coords: [26.958, 94.207],
      },
    ],
    total: 140,
    international: 40,
    domestic: 100,
    highPriority: 2,
    coords: [26.9546, 94.203],
    density: "Medium",
  },
  {
    place: "Agartala",
    tourists: [
      {
        name: "Emily Brown",
        nationality: "Australia",
        status: "Active",
        coords: [23.1645, 92.9376],
      },
      {
        name: "Amit Sharma",
        nationality: "India",
        status: "Active",
        coords: [23.165, 92.938],
      },
      {
        name: "Sofia Garcia",
        nationality: "Mexico",
        status: "Active",
        coords: [23.166, 92.939],
      },
      {
        name: "Mohammed Ali",
        nationality: "UAE",
        status: "Active",
        coords: [23.167, 92.94],
      },
      {
        name: "Sunita Devi",
        nationality: "India",
        status: "Active",
        coords: [23.168, 92.941],
      },
      {
        name: "Anna Schmidt",
        nationality: "Germany",
        status: "Active",
        coords: [23.169, 92.942],
      },
    ],
    total: 180,
    international: 60,
    domestic: 120,
    highPriority: 2,
    coords: [23.1645, 92.9376],
    density: "Medium",
  },
  {
    place: "Manas National Park",
    tourists: [
      {
        name: "Carlos Ruiz",
        nationality: "Spain",
        status: "Active",
        coords: [26.6593, 90.9391],
      },
      {
        name: "Meera Nair",
        nationality: "India",
        status: "Active",
        coords: [26.66, 90.94],
      },
      {
        name: "James Lee",
        nationality: "USA",
        status: "Active",
        coords: [26.661, 90.941],
      },
      {
        name: "Fatima Noor",
        nationality: "Bangladesh",
        status: "Active",
        coords: [26.662, 90.942],
      },
    ],
    total: 110,
    international: 40,
    domestic: 70,
    highPriority: 1,
    coords: [26.6593, 90.9391],
    density: "Medium",
  },
  {
    place: "Sivasagar Heritage Zone",
    tourists: [
      {
        name: "Ankit Das",
        nationality: "India",
        status: "Active",
        coords: [26.9821, 94.6426],
      },
      {
        name: "Julia Rossi",
        nationality: "Italy",
        status: "Active",
        coords: [26.983, 94.643],
      },
      {
        name: "Peter Novak",
        nationality: "Czech Republic",
        status: "Active",
        coords: [26.984, 94.644],
      },
    ],
    total: 90,
    international: 30,
    domestic: 60,
    highPriority: 1,
    coords: [26.9821, 94.6426],
    density: "Low",
  },
  {
    place: "Haflong Hill Station",
    tourists: [
      {
        name: "Sandeep Kumar",
        nationality: "India",
        status: "Active",
        coords: [25.1706, 93.0176],
      },
      {
        name: "Linda Lee",
        nationality: "Singapore",
        status: "Active",
        coords: [25.171, 93.018],
      },
    ],
    total: 60,
    international: 20,
    domestic: 40,
    highPriority: 0,
    coords: [25.1706, 93.0176],
    density: "Medium",
  },
  {
    place: "Dibrugarh Riverside",
    tourists: [
      {
        name: "Mohammed Ali",
        nationality: "UAE",
        status: "Active",
        coords: [27.4728, 94.912],
      },
      {
        name: "Sunita Devi",
        nationality: "India",
        status: "Active",
        coords: [27.473, 94.913],
      },
    ],
    total: 50,
    international: 15,
    domestic: 35,
    highPriority: 0,
    coords: [27.4728, 94.912],
    density: "Low",
  },
  {
    place: "Tezpur Cultural Zone",
    tourists: [
      {
        name: "Anna Schmidt",
        nationality: "Germany",
        status: "Active",
        coords: [26.6338, 92.8],
      },
      {
        name: "Suresh Reddy",
        nationality: "India",
        status: "Active",
        coords: [26.634, 92.801],
      },
    ],
    total: 40,
    international: 10,
    domestic: 30,
    highPriority: 0,
    coords: [26.6338, 92.8],
    density: "Medium",
  },
  {
    place: "Jorhat Tea Gardens",
    tourists: [
      {
        name: "Olga Ivanova",
        nationality: "Russia",
        status: "Active",
        coords: [26.75, 94.2167],
      },
      {
        name: "Meera Nair",
        nationality: "India",
        status: "Active",
        coords: [26.751, 94.217],
      },
    ],
    total: 35,
    international: 10,
    domestic: 25,
    highPriority: 0,
    coords: [26.75, 94.2167],
    density: "Medium",
  },
  {
    place: "Barak Valley",
    tourists: [
      {
        name: "James Lee",
        nationality: "USA",
        status: "Active",
        coords: [24.8333, 92.8333],
      },
      {
        name: "Fatima Noor",
        nationality: "Bangladesh",
        status: "Active",
        coords: [24.834, 92.834],
      },
    ],
    total: 30,
    international: 8,
    domestic: 22,
    highPriority: 0,
    coords: [24.8333, 92.8333],
    density: "Low",
  },
  {
    place: "Diphu Eco Zone",
    tourists: [
      {
        name: "Peter Novak",
        nationality: "Czech Republic",
        status: "Active",
        coords: [25.84, 93.43],
      },
      {
        name: "Suman Roy",
        nationality: "India",
        status: "Active",
        coords: [25.841, 93.431],
      },
    ],
    total: 25,
    international: 7,
    domestic: 18,
    highPriority: 0,
    coords: [25.84, 93.43],
    density: "Medium",
  },
  {
    place: "Silchar Urban Area",
    tourists: [
      {
        name: "Julia Rossi",
        nationality: "Italy",
        status: "Active",
        coords: [24.8333, 92.7789],
      },
      {
        name: "Amit Sharma",
        nationality: "India",
        status: "Active",
        coords: [24.834, 92.779],
      },
    ],
    total: 22,
    international: 6,
    domestic: 16,
    highPriority: 0,
    coords: [24.8333, 92.7789],
    density: "Medium",
  },
  {
    place: "North Cachar Hills",
    tourists: [
      {
        name: "Tomoko Sato",
        nationality: "Japan",
        status: "Active",
        coords: [25.5, 93.0],
      },
      {
        name: "Meera Nair",
        nationality: "India",
        status: "Active",
        coords: [25.501, 93.001],
      },
    ],
    total: 20,
    international: 5,
    domestic: 15,
    highPriority: 0,
    coords: [25.5, 93.0],
    density: "Low",
  },
  {
    place: "Goalpara Wetlands",
    tourists: [
      {
        name: "Ahmed Hassan",
        nationality: "Egypt",
        status: "Active",
        coords: [26.1833, 90.6167],
      },
      {
        name: "Suresh Reddy",
        nationality: "India",
        status: "Active",
        coords: [26.184, 90.617],
      },
    ],
    total: 18,
    international: 4,
    domestic: 14,
    highPriority: 0,
    coords: [26.1833, 90.6167],
    density: "Low",
  },
  {
    place: "Tinsukia Eco Park",
    tourists: [
      {
        name: "Linda Lee",
        nationality: "Singapore",
        status: "Active",
        coords: [27.4926, 95.3537],
      },
      {
        name: "Rajiv Das",
        nationality: "India",
        status: "Active",
        coords: [27.493, 95.354],
      },
    ],
    total: 16,
    international: 3,
    domestic: 13,
    highPriority: 0,
    coords: [27.4926, 95.3537],
    density: "Medium",
  },
  {
    place: "Bongaigaon Urban Zone",
    tourists: [
      {
        name: "Fatima Noor",
        nationality: "Bangladesh",
        status: "Active",
        coords: [26.4826, 90.561],
      },
      {
        name: "Amit Sharma",
        nationality: "India",
        status: "Active",
        coords: [26.483, 90.562],
      },
    ],
    total: 14,
    international: 2,
    domestic: 12,
    highPriority: 0,
    coords: [26.4826, 90.561],
    density: "Medium",
  },
  {
    place: "Dhemaji Riverside",
    tourists: [
      {
        name: "Maria Lopez",
        nationality: "Spain",
        status: "Active",
        coords: [27.4861, 94.6167],
      },
      {
        name: "Suman Roy",
        nationality: "India",
        status: "Active",
        coords: [27.487, 94.617],
      },
    ],
    total: 12,
    international: 2,
    domestic: 10,
    highPriority: 0,
    coords: [27.4861, 94.6167],
    density: "Low",
  },
  {
    place: "Nagaon Heritage Zone",
    tourists: [
      {
        name: "Olga Ivanova",
        nationality: "Russia",
        status: "Active",
        coords: [26.35, 92.6833],
      },
      {
        name: "Meera Nair",
        nationality: "India",
        status: "Active",
        coords: [26.351, 92.684],
      },
    ],
    total: 10,
    international: 1,
    domestic: 9,
    highPriority: 0,
    coords: [26.35, 92.6833],
    density: "Medium",
  },
];

export default function TouristAnalyticsPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("Tourist Analytics");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof (typeof zones)[0]>("place");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [mapFocus, setMapFocus] = useState<[number, number] | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedZone, setSelectedZone] = useState<any>(null);

  // Modal search/filter for tourists
  const [touristSearch, setTouristSearch] = useState("");
  const [touristNationality, setTouristNationality] = useState("All");

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Metrics
  const totalTourists = zones.reduce((acc, z) => acc + z.total, 0);
  const internationalTourists = zones.reduce(
    (acc, z) => acc + z.international,
    0
  );
  const domesticTourists = zones.reduce((acc, z) => acc + z.domestic, 0);
  const highPriorityTourists = zones.reduce(
    (acc, z) => acc + z.highPriority,
    0
  );

  // Table filter/sort
  let filteredZones = zones.filter((z) =>
    z.place.toLowerCase().includes(search.toLowerCase())
  );
  filteredZones = [...filteredZones].sort((a, b) => {
    let valA = a[sortKey];
    let valB = b[sortKey];
    if (typeof valA === "string" && typeof valB === "string") {
      return sortDir === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
    if (typeof valA === "number" && typeof valB === "number") {
      return sortDir === "asc" ? valA - valB : valB - valA;
    }
    return 0;
  });

  // Modal tourist filter
  let filteredTourists: any[] = [];
  if (selectedZone) {
    filteredTourists = selectedZone.tourists.filter((t: any) => {
      const matchesSearch = t.name
        .toLowerCase()
        .includes(touristSearch.toLowerCase());
      const matchesNationality =
        touristNationality === "All" || t.nationality === touristNationality;
      return matchesSearch && matchesNationality;
    });
  }

  // Collect only nationalities present in filteredTourists for dropdown
  const presentNationalities =
    filteredTourists.length > 0
      ? Array.from(new Set(filteredTourists.map((t: any) => t.nationality)))
      : [];

  const mapCenter = mapFocus ? mapFocus : [26.5, 92.5];

  // Collect all nationalities for filter dropdown
  const allNationalities = selectedZone
    ? Array.from(new Set(selectedZone.tourists.map((t: any) => t.nationality)))
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />
      <SideMenu
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />
      <div className="flex-1 ml-64 p-4">
        {/* Dashboard Grid Layout - same as SOS Notifications */}
        <div className="grid grid-cols-4 grid-rows-3 gap-4 mb-4">
          {/* r1c1: Total Tourists */}
          <div className="row-start-1 row-end-1 col-start-1 col-end-1 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <span className="text-xs text-gray-500 mb-1">Total Tourists</span>
            <span className="text-3xl font-bold text-gray-900">
              {totalTourists}
            </span>
          </div>
          {/* r1c2: International Tourists */}
          <div className="row-start-1 row-end-1 col-start-2 col-end-2 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <span className="text-xs text-gray-500 mb-1">
              International Tourists
            </span>
            <span className="text-3xl font-bold text-blue-700">
              {internationalTourists}
            </span>
          </div>
          {/* r2c1: Domestic Tourists */}
          <div className="row-start-2 row-end-2 col-start-1 col-end-1 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <span className="text-xs text-gray-500 mb-1">
              Domestic Tourists
            </span>
            <span className="text-3xl font-bold text-green-700">
              {domesticTourists}
            </span>
          </div>
          {/* r2c2: High Priority */}
          <div className="row-start-2 row-end-2 col-start-2 col-end-2 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <span className="text-xs text-gray-500 mb-1">High Priority</span>
            <span className="text-3xl font-bold text-orange-700">
              {highPriorityTourists}
            </span>
          </div>
          {/* r3c1-2: Table Controls */}
          <div className="row-start-3 row-end-3 col-span-2 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <div className="w-full flex flex-col gap-4">
              <input
                type="text"
                placeholder="Search zone..."
                className="border px-3 py-2 rounded-lg text-sm w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex gap-4">
                <select
                  className="border px-2 py-2 rounded-lg text-sm w-full"
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as any)}
                >
                  <option value="place">Sort by Place</option>
                  <option value="total">Sort by Total Tourists</option>
                  <option value="international">Sort by International</option>
                  <option value="domestic">Sort by Domestic</option>
                  <option value="highPriority">Sort by High Priority</option>
                  <option value="density">Sort by Density</option>
                </select>
                <button
                  className="border px-2 py-2 rounded-lg text-sm w-20"
                  onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
                >
                  {sortDir === "asc" ? "Asc" : "Desc"}
                </button>
              </div>
            </div>
          </div>
          {/* r1-3 c3-4: Map Visualization */}
          <div className="row-span-3 col-span-2 col-start-3 col-end-5 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <div className="flex items-center gap-2 mb-2">
              <MapPinIcon className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Tourist Cluster Map
              </span>
            </div>
            <div className="w-full h-92 rounded-lg overflow-hidden border">
              {isClient && (
                <DynamicMapContainer
                  center={mapCenter}
                  zoom={mapFocus ? 10 : 7}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <DynamicTileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {zones.map((zone) => (
                    <DynamicCircle
                      key={zone.place}
                      center={zone.coords as [number, number]}
                      radius={5000 + (zone.total / totalTourists) * 30000}
                      color={
                        zone.density === "High"
                          ? "orange"
                          : zone.density === "Medium"
                          ? "yellow"
                          : "gray"
                      }
                      fillOpacity={0.3}
                      eventHandlers={{
                        click: () =>
                          setMapFocus(zone.coords as [number, number]),
                      }}
                    >
                      <DynamicPopup>
                        <div className="font-semibold">{zone.place}</div>
                        <div>Total Tourists: {zone.total}</div>
                        <div>International: {zone.international}</div>
                        <div>Domestic: {zone.domestic}</div>
                        <div>High Priority: {zone.highPriority}</div>
                        <div>Density: {zone.density}</div>
                      </DynamicPopup>
                    </DynamicCircle>
                  ))}
                </DynamicMapContainer>
              )}
            </div>
            <div className="mt-4 text-xs text-gray-500 text-center">
              Click on any cluster for details.
            </div>
          </div>
        </div>

        {/* Clusters Table - More elaborate */}
        <div className="bg-white border rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Tourist Clusters
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Place</th>
                <th className="p-2 text-left">Total Tourists</th>
                <th className="p-2 text-left">International</th>
                <th className="p-2 text-left">Domestic</th>
                <th className="p-2 text-left">High Priority</th>
                <th className="p-2 text-left">Density</th>
                <th className="p-2 text-left">Map</th>
              </tr>
            </thead>
            <tbody>
              {filteredZones.map((z) => (
                <tr
                  key={z.place}
                  className="border-b cursor-pointer hover:bg-orange-50"
                  onClick={() => setSelectedZone(z)}
                >
                  <td className="p-2 font-semibold">{z.place}</td>
                  <td className="p-2">{z.total}</td>
                  <td className="p-2">{z.international}</td>
                  <td className="p-2">{z.domestic}</td>
                  <td className="p-2">{z.highPriority}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        z.density === "High"
                          ? "bg-orange-100 text-orange-800"
                          : z.density === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {z.density}
                    </span>
                  </td>
                  <td className="p-2">
                    <button
                      className="text-blue-600 hover:text-orange-600"
                      title="Show on Map"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMapFocus(z.coords as [number, number]);
                      }}
                    >
                      <MapPinIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Zone Details Modal */}
        {selectedZone && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              backdropFilter: "blur(8px)",
              background: "rgba(255,255,255,0.3)",
            }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                onClick={() => setSelectedZone(null)}
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <MapPinIcon className="w-6 h-6 text-blue-600" />
                {selectedZone.place}
              </h2>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Total Tourists:</span>{" "}
                {selectedZone.tourists.length}
                <span className="ml-4 font-semibold">International:</span>{" "}
                {selectedZone.international}
                <span className="ml-4 font-semibold">Domestic:</span>{" "}
                {selectedZone.domestic}
                <span className="ml-4 font-semibold">High Priority:</span>{" "}
                {selectedZone.highPriority}
                <span className="ml-4 font-semibold">Density:</span>{" "}
                {selectedZone.density}
              </div>
              {/* Tourist Search/Filter */}
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Search tourist name..."
                  className="border px-2 py-1 rounded text-xs w-full"
                  value={touristSearch}
                  onChange={(e) => setTouristSearch(e.target.value)}
                />
                <select
                  className="border px-2 py-1 rounded text-xs w-full"
                  value={touristNationality}
                  onChange={(e) => setTouristNationality(e.target.value)}
                >
                  <option value="All">All Nationalities</option>
                  {presentNationalities.map((nat) => (
                    <option key={nat} value={nat}>
                      {nat}
                    </option>
                  ))}
                </select>
              </div>
              {/* Map of tourists in zone */}
              <div className="w-full h-56 rounded-lg overflow-hidden border mb-4">
                {isClient && (
                  <DynamicMapContainer
                    center={selectedZone.coords}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <DynamicTileLayer
                      attribution="&copy; OpenStreetMap contributors"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filteredTourists.map((t, idx) => (
                      <DynamicCircle
                        key={t.name + idx}
                        center={t.coords as [number, number]}
                        radius={200}
                        color="blue"
                        fillOpacity={0.7}
                      >
                        <DynamicPopup>
                          <div className="font-semibold">{t.name}</div>
                          <div>Nationality: {t.nationality}</div>
                          <div>Status: {t.status}</div>
                        </DynamicPopup>
                      </DynamicCircle>
                    ))}
                  </DynamicMapContainer>
                )}
              </div>
              {/* List of tourists */}
              <div>
                <h3 className="text-md font-semibold text-gray-900 mb-2">
                  Tourists in Zone ({filteredTourists.length})
                </h3>
                <ul className="space-y-2 max-h-48 overflow-y-auto">
                  {filteredTourists.length > 0 ? (
                    filteredTourists.map((t, idx) => (
                      <li
                        key={t.name + idx}
                        className="border rounded p-2 bg-gray-50 flex justify-between items-center"
                      >
                        <div>
                          <span className="font-semibold text-gray-800">
                            {t.name}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            {t.nationality}
                          </span>
                          <span className="ml-2 text-xs text-gray-400">
                            Lat: {t.coords[0]}, Lng: {t.coords[1]}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            t.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {t.status}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-gray-500">
                      No tourists found for this zone.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        .leaflet-container {
          font-family: "Inter", sans-serif;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
        /* Table controls UI enhancement */
        .bg-white.border.rounded-lg.shadow.flex.flex-col.items-center.justify-center.p-6
          input,
        .bg-white.border.rounded-lg.shadow.flex.flex-col.items-center.justify-center.p-6
          select,
        .bg-white.border.rounded-lg.shadow.flex.flex-col.items-center.justify-center.p-6
          button {
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </div>
  );
}
