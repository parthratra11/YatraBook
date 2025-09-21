"use client";

import {
  TrophyIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  SignalIcon,
  MapIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid"; // Add this import for pin icon
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Leaflet components (always render on client)
const DynamicMapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
    loading: () => <div className="h-72 w-full bg-gray-100 rounded-lg" />,
  }
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

// Add all major zones of Assam, remove city info, add incidents array for each zone
const dummyLeaderboard = [
  {
    rank: 1,
    place: "Guwahati City Center",
    safetyScore: 97,
    compliance: "Excellent",
    incidents: 2,
    lastIncident: "2025-01-05",
    density: "High",
    safeZones: 5,
    restrictedZones: 1,
    coords: [26.1445, 91.7362],
    details: "Recent incidents: 2 (minor thefts).",
    reports: [
      {
        id: 1,
        date: "2025-01-03",
        type: "Theft",
        description: "Minor theft reported near railway station.",
        status: "Resolved",
      },
      {
        id: 2,
        date: "2025-01-05",
        type: "Lost Property",
        description: "Tourist lost wallet in market area.",
        status: "Filed",
      },
    ],
  },
  {
    rank: 2,
    place: "Kaziranga National Park",
    safetyScore: 94,
    compliance: "Excellent",
    incidents: 3,
    lastIncident: "2025-01-06",
    density: "High",
    safeZones: 6,
    restrictedZones: 2,
    coords: [26.5775, 93.1711],
    details: "Recent incidents: 3 (wildlife crossing).",
    reports: [
      {
        id: 1,
        date: "2025-01-02",
        type: "Wildlife Crossing",
        description: "Elephant crossing caused traffic delay.",
        status: "Resolved",
      },
      {
        id: 2,
        date: "2025-01-04",
        type: "Lost Tourist",
        description: "Tourist lost in forest trail, found safe.",
        status: "Resolved",
      },
      {
        id: 3,
        date: "2025-01-06",
        type: "Minor Injury",
        description: "Minor injury during safari.",
        status: "Filed",
      },
    ],
  },
  {
    rank: 3,
    place: "Majuli Island",
    safetyScore: 91,
    compliance: "Good",
    incidents: 4,
    lastIncident: "2025-01-04",
    density: "Medium",
    safeZones: 3,
    restrictedZones: 1,
    coords: [26.9546, 94.203],
    details: "Recent incidents: 4 (ferry delays, minor injuries).",
    reports: [
      {
        id: 1,
        date: "2025-01-01",
        type: "Ferry Delay",
        description: "Ferry delayed due to fog.",
        status: "Resolved",
      },
      {
        id: 2,
        date: "2025-01-02",
        type: "Minor Injury",
        description: "Tourist slipped on wet dock.",
        status: "Resolved",
      },
      {
        id: 3,
        date: "2025-01-03",
        type: "Lost Property",
        description: "Lost bag reported.",
        status: "Filed",
      },
      {
        id: 4,
        date: "2025-01-04",
        type: "Crowd Management",
        description: "Crowd management required at festival.",
        status: "Resolved",
      },
    ],
  },
  {
    rank: 4,
    place: "Manas National Park",
    safetyScore: 89,
    compliance: "Good",
    incidents: 5,
    lastIncident: "2025-01-07",
    density: "Medium",
    safeZones: 4,
    restrictedZones: 2,
    coords: [26.6593, 90.9391],
    details: "Recent incidents: 5 (wildlife crossing, lost tourists).",
    reports: [
      {
        id: 1,
        date: "2025-01-03",
        type: "Wildlife Crossing",
        description: "Rhino crossing observed.",
        status: "Resolved",
      },
      {
        id: 2,
        date: "2025-01-04",
        type: "Lost Tourist",
        description: "Tourist lost, found after 2 hours.",
        status: "Resolved",
      },
      {
        id: 3,
        date: "2025-01-05",
        type: "Minor Injury",
        description: "Minor injury during trekking.",
        status: "Filed",
      },
      {
        id: 4,
        date: "2025-01-06",
        type: "Permit Issue",
        description: "Permit verification delay.",
        status: "Resolved",
      },
      {
        id: 5,
        date: "2025-01-07",
        type: "Crowd Management",
        description: "Crowd management at entrance gate.",
        status: "Resolved",
      },
    ],
  },
  {
    rank: 5,
    place: "Sivasagar Heritage Zone",
    safetyScore: 87,
    compliance: "Moderate",
    incidents: 6,
    lastIncident: "2025-01-03",
    density: "Low",
    safeZones: 2,
    restrictedZones: 3,
    coords: [26.9821, 94.6426],
    details: "Recent incidents: 6 (crowd management, minor thefts).",
    reports: [
      {
        id: 1,
        date: "2025-01-01",
        type: "Crowd Management",
        description: "Large crowd at monument entry.",
        status: "Resolved",
      },
      {
        id: 2,
        date: "2025-01-02",
        type: "Minor Theft",
        description: "Pickpocketing reported.",
        status: "Filed",
      },
      {
        id: 3,
        date: "2025-01-03",
        type: "Lost Property",
        description: "Lost camera reported.",
        status: "Filed",
      },
      {
        id: 4,
        date: "2025-01-03",
        type: "Permit Issue",
        description: "Permit not scanned at checkpoint.",
        status: "Resolved",
      },
      {
        id: 5,
        date: "2025-01-03",
        type: "Minor Injury",
        description: "Minor injury at stairs.",
        status: "Resolved",
      },
      {
        id: 6,
        date: "2025-01-03",
        type: "Crowd Management",
        description: "Crowd dispersal after event.",
        status: "Resolved",
      },
    ],
  },
  {
    rank: 6,
    place: "Haflong Hill Station",
    safetyScore: 85,
    compliance: "Good",
    incidents: 3,
    lastIncident: "2025-01-02",
    density: "Medium",
    safeZones: 4,
    restrictedZones: 1,
    coords: [25.1706, 93.0176],
    details:
      "Haflong is Assam's only hill station, with scenic views and moderate density. Recent incidents: 3 (road blockages, minor injuries).",
  },
  {
    rank: 7,
    place: "Dibrugarh Riverside",
    safetyScore: 83,
    compliance: "Moderate",
    incidents: 7,
    lastIncident: "2025-01-01",
    density: "Low",
    safeZones: 2,
    restrictedZones: 2,
    coords: [27.4728, 94.912],
    details:
      "Dibrugarh is a major river port, with moderate compliance and low density. Recent incidents: 7 (ferry delays, minor thefts).",
  },
  {
    rank: 8,
    place: "Tezpur Cultural Zone",
    safetyScore: 81,
    compliance: "Moderate",
    incidents: 4,
    lastIncident: "2025-01-08",
    density: "Medium",
    safeZones: 3,
    restrictedZones: 1,
    coords: [26.6338, 92.8],
    details:
      "Tezpur is known for its cultural heritage. Recent incidents: 4 (crowd management, minor injuries).",
  },
  {
    rank: 9,
    place: "Jorhat Tea Gardens",
    safetyScore: 90,
    compliance: "Good",
    incidents: 2,
    lastIncident: "2025-01-04",
    density: "Medium",
    safeZones: 4,
    restrictedZones: 1,
    coords: [26.75, 94.2167],
    details:
      "Jorhat is famous for its tea gardens and cultural sites. Recent incidents: 2 (minor injuries, lost tourists).",
  },
  {
    rank: 10,
    place: "Barak Valley",
    safetyScore: 84,
    compliance: "Moderate",
    incidents: 5,
    lastIncident: "2025-01-07",
    density: "Low",
    safeZones: 2,
    restrictedZones: 2,
    coords: [24.8333, 92.8333],
    details:
      "Barak Valley is a scenic region with moderate compliance and low density. Recent incidents: 5 (road blockages, minor thefts).",
  },
  {
    rank: 11,
    place: "Diphu Eco Zone",
    safetyScore: 86,
    compliance: "Good",
    incidents: 3,
    lastIncident: "2025-01-03",
    density: "Medium",
    safeZones: 3,
    restrictedZones: 1,
    coords: [25.84, 93.43],
    details:
      "Diphu is known for its eco-tourism and hill views. Recent incidents: 3 (lost tourists, minor injuries).",
  },
  {
    rank: 12,
    place: "Silchar Urban Area",
    safetyScore: 88,
    compliance: "Good",
    incidents: 4,
    lastIncident: "2025-01-06",
    density: "Medium",
    safeZones: 4,
    restrictedZones: 1,
    coords: [24.8333, 92.7789],
    details:
      "Silchar is a major urban center with good compliance and moderate density. Recent incidents: 4 (crowd management, minor thefts).",
  },
  {
    rank: 13,
    place: "North Cachar Hills",
    safetyScore: 86,
    compliance: "Good",
    incidents: 2,
    lastIncident: "2025-01-06",
    density: "Low",
    safeZones: 2,
    restrictedZones: 1,
    coords: [25.5, 93.0],
    details:
      "North Cachar Hills is a scenic hilly region with good compliance and low density. Recent incidents: 2 (road blockages, minor injuries).",
  },
  {
    rank: 14,
    place: "Goalpara Wetlands",
    safetyScore: 83,
    compliance: "Moderate",
    incidents: 3,
    lastIncident: "2025-01-05",
    density: "Low",
    safeZones: 2,
    restrictedZones: 1,
    coords: [26.1833, 90.6167],
    details:
      "Goalpara Wetlands are important for birdwatching and eco-tourism. Recent incidents: 3 (lost tourists, minor injuries).",
  },
  {
    rank: 15,
    place: "Tinsukia Eco Park",
    safetyScore: 85,
    compliance: "Good",
    incidents: 2,
    lastIncident: "2025-01-04",
    density: "Medium",
    safeZones: 3,
    restrictedZones: 1,
    coords: [27.4926, 95.3537],
    details:
      "Tinsukia Eco Park is a popular destination for nature lovers. Recent incidents: 2 (minor injuries, lost tourists).",
  },
  {
    rank: 16,
    place: "Bongaigaon Urban Zone",
    safetyScore: 84,
    compliance: "Moderate",
    incidents: 4,
    lastIncident: "2025-01-03",
    density: "Medium",
    safeZones: 3,
    restrictedZones: 1,
    coords: [26.4826, 90.561],
    details:
      "Bongaigaon is a major urban center with moderate compliance and density. Recent incidents: 4 (crowd management, minor thefts).",
  },
  {
    rank: 17,
    place: "Dhemaji Riverside",
    safetyScore: 82,
    compliance: "Moderate",
    incidents: 3,
    lastIncident: "2025-01-02",
    density: "Low",
    safeZones: 2,
    restrictedZones: 1,
    coords: [27.4861, 94.6167],
    details:
      "Dhemaji Riverside is a peaceful area with moderate compliance and low density. Recent incidents: 3 (ferry delays, minor injuries).",
  },
  {
    rank: 18,
    place: "Nagaon Heritage Zone",
    safetyScore: 87,
    compliance: "Good",
    incidents: 2,
    lastIncident: "2025-01-01",
    density: "Medium",
    safeZones: 3,
    restrictedZones: 1,
    coords: [26.35, 92.6833],
    details:
      "Nagaon is known for its heritage sites and moderate density. Recent incidents: 2 (minor injuries, lost tourists).",
  },
];

// Visualization dummy data
const safetyDistribution = [
  {
    label: "Excellent",
    value: dummyLeaderboard.filter((z) => z.compliance === "Excellent").length,
    color: "bg-green-500",
  },
  {
    label: "Good",
    value: dummyLeaderboard.filter((z) => z.compliance === "Good").length,
    color: "bg-yellow-500",
  },
  {
    label: "Moderate",
    value: dummyLeaderboard.filter((z) => z.compliance === "Moderate").length,
    color: "bg-orange-500",
  },
];

export default function LeaderboardPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("Leaderboard");
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  // Search, filter, sort state
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] =
    useState<keyof (typeof dummyLeaderboard)[0]>("rank");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [filterCompliance, setFilterCompliance] = useState<string>("All");
  const [mapFocus, setMapFocus] = useState<[number, number] | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate average safety score
  const avgSafetyScore = Math.round(
    dummyLeaderboard.reduce((acc, curr) => acc + curr.safetyScore, 0) /
      dummyLeaderboard.length
  );

  // Calculate total incidents
  const totalIncidents = dummyLeaderboard.reduce(
    (acc, curr) => acc + curr.incidents,
    0
  );

  // Calculate density distribution
  const densityStats = {
    High: dummyLeaderboard.filter((p) => p.density === "High").length,
    Medium: dummyLeaderboard.filter((p) => p.density === "Medium").length,
    Low: dummyLeaderboard.filter((p) => p.density === "Low").length,
  };

  // Filter and sort zones for table
  let filteredZones = dummyLeaderboard.filter((zone) => {
    const matchesSearch =
      zone.place.toLowerCase().includes(search.toLowerCase()) ||
      (zone.details?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchesCompliance =
      filterCompliance === "All" || zone.compliance === filterCompliance;
    return matchesSearch && matchesCompliance;
  });

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

  const mapCenter = mapFocus ? mapFocus : [26.5, 92.5];

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
        {/* <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <TrophyIcon className="w-7 h-7 text-orange-500" />
          Tourist Place Safety Leaderboard
        </h1>
        <p className="text-gray-700 mb-6">
          Safety scores and compliance rates for major tourist destinations in
          Assam, calculated from incidents, density, and area management.
        </p> */}

        {/* Sophisticated Dashboard Grid */}
        <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-4">
          {/* r1c1: Total Incidents/Reports */}
          <div className="row-span-1 col-span-1 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <div className="flex items-center gap-2 mb-2">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
              <span className="text-sm font-medium text-gray-700">
                Total Incidents (30d)
              </span>
            </div>
            <span className="text-3xl font-bold text-gray-900">
              {totalIncidents}
            </span>
          </div>
          {/* r1c2: Avg Safety Score */}
          <div className="row-span-1 col-span-1 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheckIcon className="w-6 h-6 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                Avg. Safety Score
              </span>
            </div>
            <span className="text-3xl font-bold text-gray-900">
              {avgSafetyScore}
            </span>
          </div>
          {/* r1-2 c3-4: Map Visualization */}
          <div className="row-span-2 col-span-2 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <div className="flex items-center gap-2 mb-2">
              <MapIcon className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Safety Zones Map
              </span>
            </div>
            <div className="w-full h-72 rounded-lg overflow-hidden">
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
                  {dummyLeaderboard.map((zone) => (
                    <DynamicCircle
                      key={zone.place}
                      center={zone.coords as [number, number]}
                      radius={18000 + zone.rank * 2000}
                      color={
                        zone.compliance === "Excellent"
                          ? "green"
                          : zone.compliance === "Good"
                          ? "yellow"
                          : "orange"
                      }
                      fillOpacity={0.3}
                      eventHandlers={{
                        click: () => setSelectedZone(zone),
                      }}
                    >
                      <DynamicPopup>
                        <div className="font-semibold">{zone.place}</div>
                        <div>Safety Score: {zone.safetyScore}</div>
                        <div>Compliance: {zone.compliance}</div>
                        <div>Incidents: {zone.incidents}</div>
                      </DynamicPopup>
                    </DynamicCircle>
                  ))}
                </DynamicMapContainer>
              )}
            </div>
            <div className="mt-4 text-xs text-gray-500 text-center">
              Click on any zone for details.
            </div>
          </div>
          {/* r2c1: Density Distribution */}
          <div className="row-span-1 col-span-1 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <div className="flex items-center gap-2 mb-2">
              <SignalIcon className="w-6 h-6 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">
                Density Distribution
              </span>
            </div>
            <div className="flex gap-4 mt-2">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-700">High</span>
                <span className="text-lg font-bold text-orange-600">
                  {densityStats.High}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-700">Medium</span>
                <span className="text-lg font-bold text-yellow-600">
                  {densityStats.Medium}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-700">Low</span>
                <span className="text-lg font-bold text-gray-600">
                  {densityStats.Low}
                </span>
              </div>
            </div>
          </div>
          {/* r2c2: Safety Compliance Distribution */}
          <div className="row-span-1 col-span-1 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">
              Safety Compliance Distribution
            </h2>
            <div className="flex gap-2 items-end h-16">
              {safetyDistribution.map((dist) => (
                <div
                  key={dist.label}
                  className="flex flex-col items-center justify-end h-full"
                >
                  <div
                    className={`${dist.color} w-8 rounded-t-lg`}
                    style={{ height: `${dist.value * 20 + 20}px` }}
                  ></div>
                  <span className="text-xs mt-1 text-gray-700">
                    {dist.label}
                  </span>
                  <span className="text-xs text-gray-500">{dist.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white border rounded-lg shadow p-6">
          {/* Table controls inside table header */}
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Rank</th>
                <th className="p-2 text-left">Place</th>
                <th className="p-2 text-left">Safety Score</th>
                <th className="p-2 text-left">Compliance</th>
                <th className="p-2 text-left">Incidents</th>
                <th className="p-2 text-left">Last Incident</th>
                <th className="p-2 text-left">Density</th>
                <th className="p-2 text-left">Safe Zones</th>
                <th className="p-2 text-left">Restricted Zones</th>
                <th className="p-2 text-left">Location</th>
              </tr>
              <tr className="bg-gray-50">
                <th></th>
                <th>
                  <input
                    type="text"
                    placeholder="Search zone..."
                    className="border px-2 py-1 rounded text-xs w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </th>
                <th></th>
                <th>
                  <select
                    className="border px-1 py-1 rounded text-xs w-full"
                    value={filterCompliance}
                    onChange={(e) => setFilterCompliance(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Moderate">Moderate</option>
                  </select>
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>
                  <div className="flex gap-1">
                    <select
                      className="border px-1 py-1 rounded text-xs"
                      value={sortKey}
                      onChange={(e) => setSortKey(e.target.value as any)}
                    >
                      <option value="rank">Rank</option>
                      <option value="safetyScore">Safety Score</option>
                      <option value="incidents">Incidents</option>
                      <option value="density">Density</option>
                      <option value="compliance">Compliance</option>
                    </select>
                    <button
                      className="border px-2 py-1 rounded text-xs"
                      onClick={() =>
                        setSortDir(sortDir === "asc" ? "dsc" : "asc")
                      }
                    >
                      {sortDir === "asc" ? "Asc" : "Dsc"}
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredZones.map((l) => (
                <tr
                  key={l.rank}
                  className="border-b cursor-pointer hover:bg-orange-50"
                  onClick={() => setSelectedZone(l)}
                >
                  <td className="p-2 font-bold">{l.rank}</td>
                  <td className="p-2">{l.place}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        l.safetyScore >= 95
                          ? "bg-green-100 text-green-800"
                          : l.safetyScore >= 90
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {l.safetyScore}
                    </span>
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        l.compliance === "Excellent"
                          ? "bg-green-100 text-green-800"
                          : l.compliance === "Good"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {l.compliance}
                    </span>
                  </td>
                  <td className="p-2">{l.incidents}</td>
                  <td className="p-2">{l.lastIncident}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        l.density === "High"
                          ? "bg-orange-100 text-orange-800"
                          : l.density === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {l.density}
                    </span>
                  </td>
                  <td className="p-2">{l.safeZones}</td>
                  <td className="p-2">{l.restrictedZones}</td>
                  <td className="p-2">
                    <button
                      className="text-blue-600 hover:text-orange-600"
                      title="Show on Map"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMapFocus(l.coords as [number, number]);
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
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                onClick={() => setSelectedZone(null)}
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <MapIcon className="w-6 h-6 text-blue-600" />
                {selectedZone.place}
              </h2>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Zone Details:</span>{" "}
                {selectedZone.details}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
                <div>
                  <div className="text-xs text-gray-500">Safety Score</div>
                  <div className="font-bold text-lg">
                    {selectedZone.safetyScore}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Compliance</div>
                  <div className="font-bold text-lg">
                    {selectedZone.compliance}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Incidents (30d)</div>
                  <div className="font-bold text-lg">
                    {selectedZone.incidents}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Last Incident</div>
                  <div className="font-bold text-lg">
                    {selectedZone.lastIncident}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Density</div>
                  <div className="font-bold text-lg">
                    {selectedZone.density}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Safe Zones</div>
                  <div className="font-bold text-lg">
                    {selectedZone.safeZones}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Restricted Zones</div>
                  <div className="font-bold text-lg">
                    {selectedZone.restrictedZones}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-md font-semibold text-gray-900 mb-2">
                  Incident/Report Details
                </h3>
                <ul className="space-y-2">
                  {selectedZone.reports && selectedZone.reports.length > 0 ? (
                    selectedZone.reports.map((report) => (
                      <li
                        key={report.id}
                        className="border rounded p-2 bg-gray-50"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-800">
                            {report.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            {report.date}
                          </span>
                        </div>
                        <div className="text-xs text-gray-700 mb-1">
                          {report.description}
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            report.status === "Resolved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {report.status}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-gray-500">
                      No reports available for this zone.
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
      `}</style>
    </div>
  );
}
