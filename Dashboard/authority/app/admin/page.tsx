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

// Add dummy data for all alert types
const sosNotificationsData = [
  // SOS Alerts
  {
    id: 1,
    type: "SOS",
    time: "2025-01-09 14:30",
    location: "Guwahati, Assam",
    subject: "John Doe",
    status: "Active",
    priority: "High",
    description: "SOS triggered by tourist.",
  },
  {
    id: 2,
    type: "SOS",
    time: "2025-01-09 13:15",
    location: "Shillong, Meghalaya",
    subject: "Sarah Smith",
    status: "Resolved",
    priority: "Medium",
    description: "SOS resolved by authority.",
  },
  // Geo Alerts (Weather)
  {
    id: 3,
    type: "Weather",
    time: "2025-01-09 12:45",
    location: "Kohima, Nagaland",
    subject: "Weather Alert",
    status: "Active",
    priority: "High",
    description: "Heavy rainfall warning issued.",
  },
  {
    id: 4,
    type: "Weather",
    time: "2025-01-09 11:30",
    location: "Agartala, Tripura",
    subject: "Weather Alert",
    status: "Resolved",
    priority: "Low",
    description: "Rainfall alert cleared.",
  },
  // Trespassing
  {
    id: 5,
    type: "Trespassing",
    time: "2025-01-09 10:20",
    location: "Border Area, Assam",
    subject: "Unknown Individual",
    status: "Active",
    priority: "High",
    description: "Trespassing detected in restricted zone.",
  },
  {
    id: 6,
    type: "Trespassing",
    time: "2025-01-09 09:50",
    location: "Protected Forest, Meghalaya",
    subject: "Tourist Group",
    status: "Resolved",
    priority: "Medium",
    description: "Trespassing incident resolved.",
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
    description: "Lost property reported.",
  },
  {
    id: 8,
    type: "E-FIR",
    time: "2025-01-09 08:45",
    location: "Police Station, Shillong",
    subject: "E-FIR #12346",
    status: "Under Investigation",
    priority: "High",
    description: "Assault reported.",
  },
  // Add more dummy alerts for scrollability
  ...Array.from({ length: 12 }, (_, i) => ({
    id: 9 + i,
    type: ["SOS", "Weather", "Trespassing", "E-FIR"][i % 4],
    time: `2025-01-09 0${i + 1}:00`,
    location: ["Guwahati", "Shillong", "Kohima", "Agartala"][i % 4],
    subject: `Dummy Subject ${i + 1}`,
    status: ["Active", "Resolved", "Filed", "Under Investigation"][i % 4],
    priority: ["High", "Medium", "Low", "Medium"][i % 4],
    description: `Dummy alert description ${i + 1}.`,
  })),
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

// --- Map Components ---
const TouristMap = () => {
  const [markerIcon, setMarkerIcon] = useState<any>(null);

  useEffect(() => {
    const icon = createMarkerIcon();
    setMarkerIcon(icon);
  }, []);

  return (
    <div className="bg-white border rounded-lg shadow-sm h-full flex flex-col">
      <div className="px-4 py-2 border-b font-semibold text-gray-800 text-sm">
        Tourist Map
      </div>
      <div className="flex-1">
        {typeof window !== "undefined" && (
          <DynamicMapContainer
            center={[26.1445, 91.7362] as [number, number]}
            zoom={6}
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
            {markerIcon && (
              <>
                <DynamicMarker position={[26.1445, 91.7362]} icon={markerIcon}>
                  <DynamicPopup>Guwahati</DynamicPopup>
                </DynamicMarker>
                <DynamicMarker position={[25.5788, 91.8933]} icon={markerIcon}>
                  <DynamicPopup>Shillong</DynamicPopup>
                </DynamicMarker>
                <DynamicMarker position={[25.6751, 94.1086]} icon={markerIcon}>
                  <DynamicPopup>Kohima</DynamicPopup>
                </DynamicMarker>
                <DynamicMarker position={[23.1645, 92.9376]} icon={markerIcon}>
                  <DynamicPopup>Agartala</DynamicPopup>
                </DynamicMarker>
              </>
            )}
          </DynamicMapContainer>
        )}
      </div>
    </div>
  );
};

const SafeAreaMap = () => (
  <div className="bg-white border rounded-lg shadow-sm h-full flex flex-col">
    <div className="px-4 py-2 border-b font-semibold text-gray-800 text-sm">
      Safe Area Map
    </div>
    <div className="flex-1">
      {typeof window !== "undefined" && (
        <DynamicMapContainer
          center={[25.5, 92.5] as [number, number]}
          zoom={6}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%", borderRadius: "0 0 8px 8px" }}
        >
          <DynamicTileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DynamicCircle
            center={[26.1445, 91.7362]}
            radius={40000}
            color="green"
          />
          <DynamicCircle
            center={[25.5788, 91.8933]}
            radius={30000}
            color="red"
          />
          <DynamicCircle
            center={[25.6751, 94.1086]}
            radius={25000}
            color="yellow"
          />
        </DynamicMapContainer>
      )}
    </div>
  </div>
);

const TouristDensityMap = () => (
  <div className="bg-white border rounded-lg shadow-sm h-full flex flex-col">
    <div className="px-4 py-2 border-b font-semibold text-gray-800 text-sm">
      Tourist Density Map
    </div>
    <div className="flex-1">
      {typeof window !== "undefined" && (
        <DynamicMapContainer
          center={[25.5, 92.5] as [number, number]}
          zoom={6}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%", borderRadius: "0 0 8px 8px" }}
        >
          <DynamicTileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DynamicCircle
            center={[26.1445, 91.7362]}
            radius={50000}
            color="orange"
            fillOpacity={0.4}
          />
          <DynamicCircle
            center={[25.5788, 91.8933]}
            radius={30000}
            color="orange"
            fillOpacity={0.3}
          />
          <DynamicCircle
            center={[25.6751, 94.1086]}
            radius={20000}
            color="orange"
            fillOpacity={0.2}
          />
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
            <div className="flex-1 flex flex-col justify-center">
              <WeatherMap />
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
            <div className="flex-1 flex flex-col justify-center">
              <TouristMap />
            </div>
          </div>
          {/* Safe Area Map: col 1-2, spans rows 3-4 */}
          <div className="col-start-1 col-span-2 row-start-3 row-span-2 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
              <SafeAreaMap />
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
