"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  UserGroupIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  HomeIcon,
  ChartBarIcon,
  MapIcon,
  ClipboardDocumentListIcon,
  DocumentMagnifyingGlassIcon,
  TrophyIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
  SignalIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  CloudIcon,
  SunIcon,
  ArrowTrendingUpIcon,
  MapPinIcon,
  PlusIcon,
  ClockIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";

// Dynamically import Leaflet components to avoid SSR issues
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
const DynamicCircle = dynamic(
  () => import("react-leaflet").then((mod) => mod.Circle),
  { ssr: false }
);

// Mock data
const mockData = {
  touristCount: 1247,
  highPriorityCount: 23,
  internationalTourists: 342,
  domesticTourists: 905,
  sosAlerts: [
    {
      id: 1,
      time: "2025-01-09 14:30",
      location: "Guwahati, Assam",
      tourist: "John Doe",
      status: "Active",
      priority: "High",
    },
    {
      id: 2,
      time: "2025-01-09 13:15",
      location: "Shillong, Meghalaya",
      tourist: "Sarah Smith",
      status: "Resolved",
      priority: "Medium",
    },
    {
      id: 3,
      time: "2025-01-09 12:45",
      location: "Kohima, Nagaland",
      tourist: "Raj Patel",
      status: "In Progress",
      priority: "High",
    },
  ],
  notifications: [
    {
      id: 1,
      type: "SOS",
      message: "New SOS alert from Guwahati",
      time: "2 mins ago",
    },
    {
      id: 2,
      type: "Weather",
      message: "Heavy rainfall warning in Shillong",
      time: "15 mins ago",
    },
    {
      id: 3,
      type: "System",
      message: "Tourist check-in at Kohima checkpoint",
      time: "32 mins ago",
    },
  ],
};

// const navbarMenuItems = [
//   { name: "Dashboard", icon: <ChartBarIcon className="w-5 h-5" /> },
//   { name: "Tourist Analytics", icon: <UserGroupIcon className="w-5 h-5" /> },
//   { name: "Guide Data", icon: <MapIcon className="w-5 h-5" /> },
//   {
//     name: "User Reports",
//     icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
//   },
//   { name: "E-FIRs", icon: <DocumentMagnifyingGlassIcon className="w-5 h-5" /> },
//   { name: "Leaderboard", icon: <TrophyIcon className="w-5 h-5" /> },
// ];

// const sideMenuItems = [
//   {
//     name: "Dashboard",
//     icon: <ChartBarIcon className="w-5 h-5" />,
//     href: "/admin",
//   },
//   {
//     name: "SOS Notifications",
//     icon: <ExclamationTriangleIcon className="w-5 h-5" />,
//     href: "/admin/sos-notifications",
//   },
//   {
//     name: "Tourist Verification",
//     icon: <DocumentCheckIcon className="w-5 h-5" />,
//     href: "/admin/tourist-verification",
//   },
//   {
//     name: "Tourist Analytics",
//     icon: <UserGroupIcon className="w-5 h-5" />,
//     href: "/admin/tourist-analytics",
//   },
//   {
//     name: "Guide Data",
//     icon: <MapIcon className="w-5 h-5" />,
//     href: "/admin/guide-data",
//   },
//   {
//     name: "User Reports",
//     icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
//     href: "/admin/user-reports",
//   },
//   {
//     name: "E-FIRs",
//     icon: <DocumentMagnifyingGlassIcon className="w-5 h-5" />,
//     href: "/admin/e-firs",
//   },
//   {
//     name: "Leaderboard",
//     icon: <TrophyIcon className="w-5 h-5" />,
//     href: "/admin/leaderboard",
//   },
//   {
//     name: "Weather Map",
//     icon: <CloudIcon className="w-5 h-5" />,
//     href: "/admin/weather-map",
//   },
//   {
//     name: "Tourist Density",
//     icon: <SignalIcon className="w-5 h-5" />,
//     href: "/admin/tourist-density",
//   },
//   {
//     name: "Safe Areas",
//     icon: <ShieldCheckIcon className="w-5 h-5" />,
//     href: "/admin/safe-areas",
//   },
//   {
//     name: "Alerts Management",
//     icon: <ExclamationTriangleIcon className="w-5 h-5" />,
//     href: "/admin/alerts-management",
//   },
// ];

// Realistic SOS notifications for Assam, with all types and statuses
const sosNotificationsData = [
  // SOS Alerts
  {
    id: 1,
    type: "SOS",
    time: "2025-01-09 14:30",
    location: "Guwahati City Center, Assam",
    subject: "Tourist Medical Emergency",
    status: "Active",
    priority: "High",
    description:
      "Medical emergency reported at railway station. Ambulance dispatched.",
  },
  {
    id: 2,
    type: "SOS",
    time: "2025-01-09 13:15",
    location: "Kaziranga National Park, Assam",
    subject: "Wildlife Encounter",
    status: "Resolved",
    priority: "Medium",
    description:
      "Tourist group encountered wild elephants. Park rangers intervened.",
  },
  // Weather Alerts
  {
    id: 3,
    type: "Weather",
    time: "2025-01-09 12:45",
    location: "Majuli Island, Assam",
    subject: "Heavy Rainfall",
    status: "Active",
    priority: "High",
    description: "Heavy rainfall warning issued for ferry routes.",
  },
  {
    id: 4,
    type: "Weather",
    time: "2025-01-09 11:30",
    location: "Manas National Park, Assam",
    subject: "Thunderstorm Warning",
    status: "Resolved",
    priority: "Medium",
    description: "Thunderstorm alert cleared after weather improvement.",
  },
  // Trespassing
  {
    id: 5,
    type: "Trespassing",
    time: "2025-01-09 10:20",
    location: "Border Area (Assam-Meghalaya)",
    subject: "Trespassing Detected",
    status: "Active",
    priority: "High",
    description: "Trespassing detected in restricted border zone.",
  },
  {
    id: 6,
    type: "Trespassing",
    time: "2025-01-09 09:50",
    location: "Protected Forest, Assam",
    subject: "Tourist Group Trespassing",
    status: "Resolved",
    priority: "Medium",
    description: "Trespassing incident resolved by forest authorities.",
  },
  // E-FIRs
  {
    id: 7,
    type: "E-FIR",
    time: "2025-01-09 09:30",
    location: "Police Station, Guwahati",
    subject: "E-FIR #12345",
    status: "Filed",
    priority: "Medium",
    description: "Lost property reported by tourist.",
  },
  {
    id: 8,
    type: "E-FIR",
    time: "2025-01-09 08:45",
    location: "Police Station, Sivasagar",
    subject: "E-FIR #12346",
    status: "Under Investigation",
    priority: "High",
    description: "Assault reported at heritage site.",
  },
  // More realistic alerts for scrollability
  {
    id: 9,
    type: "SOS",
    time: "2025-01-09 08:30",
    location: "Jorhat Tea Gardens, Assam",
    subject: "Lost Tourist",
    status: "Resolved",
    priority: "Low",
    description: "Tourist lost in tea garden, found after 1 hour.",
  },
  {
    id: 10,
    type: "Weather",
    time: "2025-01-09 08:00",
    location: "Barak Valley, Assam",
    subject: "High Temperature",
    status: "Active",
    priority: "High",
    description: "High temperature warning issued for valley region.",
  },
  {
    id: 11,
    type: "Trespassing",
    time: "2025-01-09 07:45",
    location: "Diphu Eco Zone, Assam",
    subject: "Wildlife Zone Trespassing",
    status: "Resolved",
    priority: "Low",
    description: "Tourist entered restricted wildlife zone, escorted out.",
  },
  {
    id: 12,
    type: "E-FIR",
    time: "2025-01-09 07:30",
    location: "Police Station, Silchar",
    subject: "E-FIR #12347",
    status: "Filed",
    priority: "Low",
    description: "Lost wallet reported in market area.",
  },
  {
    id: 13,
    type: "SOS",
    time: "2025-01-09 07:15",
    location: "North Cachar Hills, Assam",
    subject: "Minor Injury",
    status: "Active",
    priority: "Medium",
    description: "Tourist slipped on trekking trail. Medical help provided.",
  },
  {
    id: 14,
    type: "Weather",
    time: "2025-01-09 07:00",
    location: "Goalpara Wetlands, Assam",
    subject: "Thunderstorm",
    status: "Resolved",
    priority: "Low",
    description: "Thunderstorm warning cleared after weather improvement.",
  },
  {
    id: 15,
    type: "Trespassing",
    time: "2025-01-09 06:45",
    location: "Tinsukia Eco Park, Assam",
    subject: "Permit Issue",
    status: "Filed",
    priority: "Low",
    description: "Tourist permit verification delay at entrance.",
  },
  {
    id: 16,
    type: "E-FIR",
    time: "2025-01-09 06:30",
    location: "Police Station, Bongaigaon",
    subject: "E-FIR #12348",
    status: "Resolved",
    priority: "Low",
    description: "Crowd dispersal after local event. No incidents.",
  },
  {
    id: 17,
    type: "SOS",
    time: "2025-01-09 06:15",
    location: "Dhemaji Riverside, Assam",
    subject: "Ferry Delay",
    status: "Active",
    priority: "Low",
    description: "Ferry delayed due to technical issue. Tourists waiting.",
  },
  {
    id: 18,
    type: "E-FIR",
    time: "2025-01-09 06:00",
    location: "Police Station, Nagaon",
    subject: "E-FIR #12349",
    status: "Under Investigation",
    priority: "Low",
    description: "Minor injury at heritage site stairs. First aid provided.",
  },
];

// Filtering options
const alertTypes = [
  { label: "All", value: "All" },
  { label: "SOS", value: "SOS" },
  { label: "Weather", value: "Weather" },
  { label: "Trespassing", value: "Trespassing" },
  { label: "E-FIR", value: "E-FIR" },
];
const alertStatus = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Resolved", value: "Resolved" },
  { label: "Filed", value: "Filed" },
  { label: "Under Investigation", value: "Under Investigation" },
];

// --- SOS Notifications (scrollable, filterable, formal) ---
function SOSNotifications() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredAlerts = sosNotificationsData.filter((alert) => {
    const typeMatch = typeFilter === "All" || alert.type === typeFilter;
    const statusMatch = statusFilter === "All" || alert.status === statusFilter;
    return typeMatch && statusMatch;
  });

  return (
    <div className="bg-white border rounded-lg shadow-sm h-full flex flex-col">
      <div className="px-4 py-2 border-b font-semibold text-gray-800 text-sm flex items-center justify-between">
        <span>SOS & Authority Notifications</span>
        <div className="flex gap-2">
          <select
            className="border rounded px-2 py-1 text-xs"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {alertTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {filteredAlerts.length === 0 ? (
          <div className="text-center text-gray-500 text-xs mt-8">
            No alerts found.
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 mb-2 rounded border-l-4 transition-colors ${
                alert.type === "SOS"
                  ? "border-red-600 bg-red-50"
                  : alert.type === "Weather"
                  ? "border-blue-600 bg-blue-50"
                  : alert.type === "Trespassing"
                  ? "border-yellow-600 bg-yellow-50"
                  : "border-gray-600 bg-gray-50"
              } ${
                alert.status === "Resolved" ? "opacity-60 grayscale" : ""
              } cursor-pointer hover:bg-gray-100`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-gray-900">
                  {alert.subject}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    alert.status === "Active"
                      ? "bg-red-100 text-red-800"
                      : alert.status === "Resolved"
                      ? "bg-green-100 text-green-800"
                      : alert.status === "Filed"
                      ? "bg-blue-100 text-blue-800"
                      : alert.status === "Under Investigation"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {alert.status}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-700 mb-1 gap-2">
                <MapPinIcon className="inline w-4 h-4" />
                {alert.location}
                <span className="ml-2">
                  <ClockIcon className="inline w-4 h-4" /> {alert.time}
                </span>
              </div>
              <div className="text-xs text-gray-600 mb-1">
                <span className="font-semibold">{alert.type}</span>
                {alert.priority ? (
                  <span className="ml-2 text-[10px] px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                    Priority: {alert.priority}
                  </span>
                ) : null}
              </div>
              <div className="text-xs text-gray-500">{alert.description}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Create marker icon function that only runs on client
const createMarkerIcon = () => {
  if (typeof window === "undefined") return null;

  const L = require("leaflet");
  return new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

// Dummy data for SafeAreaMap (many safe areas)
const safeAreas = Array.from({ length: 40 }).map((_, i) => ({
  lat: 24.5 + Math.random() * 3,
  lng: 91.5 + Math.random() * 3,
  name: `Safe Area ${i + 1}`,
  color: ["green", "blue", "orange", "purple"][i % 4],
  radius: 15000 + Math.random() * 20000,
}));

// Tourist heatmap points: more clusters and random spread for density
const touristHeatmapPoints = [
  // Cluster 1 (Guwahati)
  ...Array.from({ length: 60 }).map(() => ({
    lat: 26.15 + Math.random() * 0.12,
    lng: 91.75 + Math.random() * 0.12,
    intensity: 1.5 + Math.random() * 0.7,
  })),
  // Cluster 2 (Kaziranga)
  ...Array.from({ length: 40 }).map(() => ({
    lat: 26.58 + Math.random() * 0.08,
    lng: 93.33 + Math.random() * 0.08,
    intensity: 1.2 + Math.random() * 0.5,
  })),
  // Cluster 3 (Silchar)
  ...Array.from({ length: 30 }).map(() => ({
    lat: 24.83 + Math.random() * 0.1,
    lng: 92.78 + Math.random() * 0.1,
    intensity: 1.0 + Math.random() * 0.4,
  })),
  // Cluster 4 (Jorhat)
  ...Array.from({ length: 25 }).map(() => ({
    lat: 26.75 + Math.random() * 0.07,
    lng: 94.22 + Math.random() * 0.07,
    intensity: 1.1 + Math.random() * 0.3,
  })),
  // Cluster 5 (Dibrugarh)
  ...Array.from({ length: 20 }).map(() => ({
    lat: 27.48 + Math.random() * 0.06,
    lng: 94.9 + Math.random() * 0.06,
    intensity: 1.0 + Math.random() * 0.3,
  })),
  // Random spread across Assam
  ...Array.from({ length: 60 }).map(() => ({
    lat: 24.5 + Math.random() * 3,
    lng: 91.5 + Math.random() * 3,
    intensity: 0.7 + Math.random() * 0.5,
  })),
];

// Dummy data for SOS alerts (for markers): more alerts, spread across Assam
const sosAlerts = [
  ...Array.from({ length: 15 }).map((_, i) => ({
    lat: 24.5 + Math.random() * 3,
    lng: 91.5 + Math.random() * 3,
    name: `SOS Alert #${i + 1}`,
  })),
  // Some fixed locations for realism
  { lat: 26.18, lng: 91.75, name: "SOS Alert #16" },
  { lat: 25.58, lng: 91.89, name: "SOS Alert #17" },
  { lat: 25.68, lng: 94.13, name: "SOS Alert #18" },
  { lat: 25.9, lng: 93.5, name: "SOS Alert #19" },
  { lat: 25.2, lng: 92.8, name: "SOS Alert #20" },
];

// --- Heatmap Layer for Tourist SOS Alerts ---
import { useMap } from "react-leaflet";

// Custom HeatmapLayer using leaflet.heat
const HeatmapLayer = ({
  points,
  options,
}: {
  points: { lat: number; lng: number; intensity: number }[];
  options?: any;
}) => {
  const map = useMap();
  useEffect(() => {
    if (!map || typeof window === "undefined") return;
    import("leaflet.heat").then(() => {
      // @ts-ignore
      const heatLayer = window.L.heatLayer(
        points.map((p) => [p.lat, p.lng, p.intensity]),
        {
          radius: options?.radius ?? 55, // large radius for blobs
          blur: options?.blur ?? 45, // strong blur for smoothness
          max: options?.max ?? 2.5, // higher max for vivid red
          gradient: options?.gradient ?? {
            0.1: "#0000ff", // blue
            0.3: "#00ffff", // cyan
            0.5: "#00ff00", // green
            0.7: "#ffff00", // yellow
            0.9: "#ff8000", // orange
            1.0: "#ff0000", // red
          },
          ...options,
        }
      ).addTo(map);
      return () => {
        map.removeLayer(heatLayer);
      };
    });
  }, [map, points, options]);
  return null;
};

// --- Tourist Map (Heatmap + SOS Markers) ---
const TouristMap = () => {
  const [markerIcon, setMarkerIcon] = useState<any>(null);

  useEffect(() => {
    const icon = createMarkerIcon();
    setMarkerIcon(icon);
  }, []);

  return (
    <div className="bg-white border rounded-lg shadow-sm h-full flex flex-col">
      <div className="px-4 py-2 border-b font-semibold text-gray-800 text-sm">
        Tourist Density & SOS Alerts
      </div>
      <div className="flex-1">
        {typeof window !== "undefined" && (
          <DynamicMapContainer
            center={[25.8, 92.5] as [number, number]}
            zoom={7}
            scrollWheelZoom={false}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "0 0 8px 8px",
            }}
          >
            <DynamicTileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Tourist Heatmap Layer */}
            <HeatmapLayer
              points={touristHeatmapPoints}
              options={{
                radius: 55,
                blur: 45,
                max: 2.5,
                gradient: {
                  0.1: "#0000ff",
                  0.3: "#00ffff",
                  0.5: "#00ff00",
                  0.7: "#ffff00",
                  0.9: "#ff8000",
                  1.0: "#ff0000",
                },
              }}
            />
            {/* SOS Markers */}
            {markerIcon &&
              sosAlerts.map((alert, idx) => (
                <DynamicMarker
                  key={idx}
                  position={[alert.lat, alert.lng]}
                  icon={markerIcon}
                >
                  <DynamicPopup>
                    <span className="font-bold text-red-600">{alert.name}</span>
                  </DynamicPopup>
                </DynamicMarker>
              ))}
          </DynamicMapContainer>
        )}
      </div>
    </div>
  );
};

// --- Safe Area Map (only dot/circle markers, no pin markers) ---
const SafeAreaMap = () => (
  <div className="bg-white border rounded-lg shadow-sm h-full flex flex-col">
    <div className="px-4 py-2 border-b font-semibold text-gray-800 text-sm">
      Safe Area Map
    </div>
    <div className="flex-1">
      {typeof window !== "undefined" && (
        <DynamicMapContainer
          center={[25.8, 92.5] as [number, number]}
          zoom={6}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%", borderRadius: "0 0 8px 8px" }}
        >
          <DynamicTileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Only circles for safe areas, no markers */}
          {safeAreas.map((area, idx) => (
            <DynamicCircle
              key={idx}
              center={[area.lat, area.lng]}
              radius={area.radius}
              color={area.color}
              fillOpacity={0.5}
            >
              <DynamicPopup>
                <span className="font-bold">{area.name}</span>
              </DynamicPopup>
            </DynamicCircle>
          ))}
        </DynamicMapContainer>
      )}
    </div>
  </div>
);

// --- Weather Map (formal card, not childish) ---
const WeatherMap = () => (
  <div className="bg-white border rounded-lg shadow-sm h-full flex flex-col">
    <div className="px-4 py-2 border-b font-semibold text-gray-800 text-sm">
      Weather Map
    </div>
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="text-5xl text-blue-500 mb-2">
        <CloudIcon className="w-12 h-12" />
      </div>
      <div className="text-lg font-semibold text-gray-700 mb-1">
        Northeast India Weather
      </div>
      <div className="text-sm text-gray-600">
        Temperature: 22°C | Humidity: 78% | Wind: 12 km/h SW
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Guwahati: 24°C | Shillong: 18°C | Kohima: 21°C | Agartala: 26°C
      </div>
    </div>
  </div>
);

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  color = "bg-white",
}: StatCardProps) => (
  <div
    className={`border rounded-lg shadow-sm h-full flex flex-col justify-center items-start px-4 py-3 ${color}`}
  >
    <div className="flex items-center gap-2 mb-1">
      <span className="text-gray-600">{icon}</span>
      <span className="text-xs font-medium text-gray-600">{title}</span>
    </div>
    <span className="text-2xl font-bold text-gray-900">{value}</span>
  </div>
);

/* --- Main Dashboard Component --- */
export default function AdminDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    import("leaflet/dist/leaflet.css");
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen bg-gray-50 overflow-hidden">
      <Navbar
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />
      <SideMenu
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />
      {/* Main grid container: fix height and spacing */}
      <div className="flex-1 ml-64 p-4 h-[calc(100vh-80px)]">
        <div className="grid grid-cols-6 grid-rows-4 gap-4 h-full">
          {/* 1st col: Current & International Tourist */}
          <div className="col-span-1 row-span-1 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
              <StatCard
                title="Current Tourist Count"
                value={mockData.touristCount.toLocaleString()}
                icon={<UserGroupIcon className="w-6 h-6 text-blue-600" />}
                color="bg-gray-50"
              />
            </div>
          </div>
          <div className="col-span-1 row-start-2 row-span-1 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
              <StatCard
                title="International Tourists"
                value={mockData.internationalTourists}
                icon={<GlobeAltIcon className="w-6 h-6 text-green-600" />}
                color="bg-gray-50"
              />
            </div>
          </div>
          {/* 2nd col: High Priority & Domestic Tourist */}
          <div className="col-start-2 col-span-1 row-span-1 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
              <StatCard
                title="High Priority Count"
                value={mockData.highPriorityCount}
                icon={
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                }
                color="bg-gray-50"
              />
            </div>
          </div>
          <div className="col-start-2 col-span-1 row-start-2 row-span-1 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
              <StatCard
                title="Domestic Tourists"
                value={mockData.domesticTourists}
                icon={<HomeIcon className="w-6 h-6 text-yellow-600" />}
                color="bg-gray-50"
              />
            </div>
          </div>
          {/* Weather Map: col 3-4, spans rows 1-2 */}
          <div className="col-start-3 col-span-2 row-span-2 flex flex-col">
            <div className="bg-white border rounded-lg shadow-sm h-full flex flex-col">
              <div className="px-4 py-2 border-b font-semibold text-gray-800 text-sm">
                Weather Map
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <iframe
                  src="/map/enhanced_weather_map_assam.html"
                  title="Weather Map Assam"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "0 0 8px 8px",
                    minHeight: 0,
                  }}
                />
              </div>
            </div>
          </div>
          {/* SOS Notifications: col 5-6, spans rows 1-4 */}
          <div className="col-span-2 row-start-1 row-span-4 col-start-5 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
              <SOSNotifications />
            </div>
          </div>
          {/* Tourist Map: col 3-4, spans rows 3-4 */}
          <div className="col-start-3 col-span-2 row-start-3 row-span-2 flex flex-col">
            <div className="bg-white border rounded-lg shadow-sm h-full flex flex-col">
              <div className="px-4 py-2 border-b font-semibold text-gray-800 text-sm">
                Tourist Density & SOS Alerts
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <iframe
                  src="/map/tourist_density_sos_assam.html"
                  title="Tourist Density & SOS Alerts"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "0 0 8px 8px",
                    minHeight: 0,
                  }}
                />
              </div>
            </div>
          </div>
          {/* Safe Area Map: col 1-2, spans rows 3-4 */}
          <div className="col-start-1 col-span-2 row-start-3 row-span-2 flex flex-col">
            <div className="bg-white border rounded-lg shadow-sm h-full flex flex-col">
              <div className="px-4 py-2 border-b font-semibold text-gray-800 text-sm">
                Safe/Unsafe/Restricted Area Map
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <iframe
                  src="/map/safe_unsafe_area_map_assam.html"
                  title="Safe/Unsafe/Restricted Area Map Assam"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "0 0 8px 8px",
                    minHeight: 0,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .leaflet-container {
          font-family: "Inter", sans-serif;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          margin-bottom: 8px;
        }
        .admin-dashboard {
          font-family: "Inter", sans-serif;
        }
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        /* Fix map cut-off by adding padding to grid container */
        .grid > div > .flex-1 > div,
        .grid > div > .flex-1 {
          height: 100%;
        }
        /* Fix center anomaly: ensure WeatherMap and TouristMap have padding and don't overflow */
        .bg-white.border.rounded-lg.shadow-sm.h-full.flex.flex-col {
          min-height: 0;
        }
      `}</style>
    </div>
  );
}
