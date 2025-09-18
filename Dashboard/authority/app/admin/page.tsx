"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
} from "@heroicons/react/24/outline";

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

const navbarMenuItems = [
  { name: "Dashboard", icon: <ChartBarIcon className="w-5 h-5" /> },
  { name: "Tourist Analytics", icon: <UserGroupIcon className="w-5 h-5" /> },
  { name: "Guide Data", icon: <MapIcon className="w-5 h-5" /> },
  {
    name: "User Reports",
    icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
  },
  { name: "E-FIRs", icon: <DocumentMagnifyingGlassIcon className="w-5 h-5" /> },
  { name: "Leaderboard", icon: <TrophyIcon className="w-5 h-5" /> },
];

const sideMenuItems = [
  { name: "Dashboard", icon: <ChartBarIcon className="w-5 h-5" /> },
  { name: "SOS Notifications", icon: <ChartBarIcon className="w-5 h-5" /> },
  { name: "Tourist Analytics", icon: <UserGroupIcon className="w-5 h-5" /> },
  { name: "Guide Data", icon: <MapIcon className="w-5 h-5" /> },
  {
    name: "User Reports",
    icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
  },
  {
    name: "E-FIRs",
    icon: <DocumentMagnifyingGlassIcon className="w-5 h-5" />,
  },
  { name: "Leaderboard", icon: <TrophyIcon className="w-5 h-5" /> },
  { name: "Weather Map", icon: <TrophyIcon className="w-5 h-5" /> },
  { name: "Tourist Density", icon: <TrophyIcon className="w-5 h-5" /> },
  { name: "Safe Areas", icon: <TrophyIcon className="w-5 h-5" /> },
  { name: "Alerts Management", icon: <TrophyIcon className="w-5 h-5" /> },
];

export default function AdminDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [touristHeatmapData] = useState([
    { lat: 26.1445, lng: 91.7362, intensity: 85, location: "Guwahati" },
    { lat: 25.5788, lng: 91.8933, intensity: 62, location: "Shillong" },
    { lat: 25.6751, lng: 94.1086, intensity: 43, location: "Kohima" },
    { lat: 23.1645, lng: 92.9376, intensity: 71, location: "Agartala" },
  ]);

  const StatCard = ({ title, value, icon, color = "bg-white" }) => (
    <div
      className={`${color} rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );

  const WeatherMap = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 h-96">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <CloudIcon className="w-6 h-6 text-blue-500" />
        Live Weather Map
      </h3>
      <div className="relative w-full h-80 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
        {/* Mock Weather Map */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <CloudIcon className="w-16 h-16 text-blue-400 mb-4 mx-auto" />
            <p className="text-gray-700 font-medium">Northeast India Weather</p>
            <p className="text-sm text-gray-500 mt-2">
              Temperature: 22°C | Humidity: 78%
            </p>
            <p className="text-sm text-gray-500">Wind: 12 km/h SW</p>
          </div>
        </div>
        {/* Mock weather indicators */}
        <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
          <MapPinIcon className="w-4 h-4" /> Guwahati: 24°C
          <CloudIcon className="w-4 h-4 ml-1" />
        </div>
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
          <MapPinIcon className="w-4 h-4" /> Shillong: 18°C
          <CloudIcon className="w-4 h-4 ml-1" />
        </div>
        <div className="absolute bottom-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
          <MapPinIcon className="w-4 h-4" /> Kohima: 21°C
          <SunIcon className="w-4 h-4 ml-1" />
        </div>
        <div className="absolute bottom-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
          <MapPinIcon className="w-4 h-4" /> Agartala: 26°C
          <CloudIcon className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );

  const TouristHeatmap = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 h-96">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <SignalIcon className="w-6 h-6 text-orange-500" />
        Tourist Density Heatmap
      </h3>
      <div className="relative w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
        {/* Mock Heatmap */}
        <svg className="w-full h-full">
          {/* Background map outline */}
          <rect width="100%" height="100%" fill="#f3f4f6" />

          {/* Mock heat points */}
          {touristHeatmapData.map((point, index) => (
            <g key={index}>
              <circle
                cx={`${(point.lng - 88) * 8}%`}
                cy={`${(28 - point.lat) * 12}%`}
                r={point.intensity / 3}
                fill="#e45b33"
                opacity={point.intensity / 100}
                className="animate-pulse"
              />
              <text
                x={`${(point.lng - 88) * 8}%`}
                y={`${(28 - point.lat) * 12 + 8}%`}
                className="text-xs font-medium fill-gray-700"
                textAnchor="middle"
              >
                {point.location}
              </text>
            </g>
          ))}

          {/* SOS Alert indicators */}
          <circle
            cx="25%"
            cy="40%"
            r="8"
            fill="#dc2626"
            className="animate-ping"
          />
          <circle
            cx="65%"
            cy="60%"
            r="8"
            fill="#dc2626"
            className="animate-ping"
          />
        </svg>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-xs flex items-center gap-2">
          <ExclamationTriangleIcon className="w-4 h-4 text-red-400" /> SOS
          Alerts
          <ArrowTrendingUpIcon className="w-4 h-4 text-orange-400 ml-2" /> High
          Density
          <ArrowTrendingUpIcon className="w-4 h-4 text-yellow-400 ml-2" />{" "}
          Medium Density
        </div>
      </div>
    </div>
  );

  const SafeAreasMap = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 h-96">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <ShieldCheckIcon className="w-6 h-6 text-green-600" />
        Safe Areas Management
      </h3>
      <div className="relative w-full h-80 bg-gradient-to-br from-green-50 to-red-50 rounded-lg overflow-hidden border">
        {/* Mock Safe Areas Map */}
        <svg className="w-full h-full">
          {/* Safe zones (green) */}
          <rect
            x="10%"
            y="20%"
            width="30%"
            height="25%"
            fill="#10b981"
            fillOpacity="0.3"
            rx="8"
          />
          <rect
            x="60%"
            y="40%"
            width="25%"
            height="20%"
            fill="#10b981"
            fillOpacity="0.3"
            rx="8"
          />

          {/* Restricted zones (red) */}
          <rect
            x="45%"
            y="15%"
            width="20%"
            height="20%"
            fill="#dc2626"
            fillOpacity="0.3"
            rx="8"
          />
          <rect
            x="15%"
            y="60%"
            width="35%"
            height="15%"
            fill="#dc2626"
            fillOpacity="0.3"
            rx="8"
          />

          {/* Neutral zones (yellow) */}
          <rect
            x="70%"
            y="70%"
            width="25%"
            height="20%"
            fill="#f59e0b"
            fillOpacity="0.3"
            rx="8"
          />

          {/* Labels */}
          <text
            x="25%"
            y="35%"
            className="text-xs font-medium fill-green-700"
            textAnchor="middle"
          >
            SAFE
          </text>
          <text
            x="55%"
            y="28%"
            className="text-xs font-medium fill-red-700"
            textAnchor="middle"
          >
            RESTRICTED
          </text>
          <text
            x="72%"
            y="45%"
            className="text-xs font-medium fill-green-700"
            textAnchor="middle"
          >
            SAFE
          </text>
          <text
            x="32%"
            y="70%"
            className="text-xs font-medium fill-red-700"
            textAnchor="middle"
          >
            RESTRICTED
          </text>
          <text
            x="82%"
            y="82%"
            className="text-xs font-medium fill-yellow-700"
            textAnchor="middle"
          >
            CAUTION
          </text>
        </svg>
        <div className="absolute top-2 right-2 bg-white border rounded-lg p-2 text-xs">
          <div className="flex items-center mb-1">
            <ShieldCheckIcon className="w-3 h-3 text-green-500 mr-2" />
            Safe Zones
          </div>
          <div className="flex items-center mb-1">
            <XCircleIcon className="w-3 h-3 text-red-500 mr-2" />
            Restricted
          </div>
          <div className="flex items-center">
            <ExclamationTriangleIcon className="w-3 h-3 text-yellow-500 mr-2" />
            Caution Areas
          </div>
        </div>
        <div className="absolute bottom-2 left-2">
          <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors flex items-center gap-1">
            <PlusIcon className="w-4 h-4" /> Add Zone
          </button>
        </div>
      </div>
    </div>
  );

  const SOSNotifications = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
        SOS Notifications
      </h3>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {mockData.sosAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border-l-4 ${
              alert.priority === "High"
                ? "border-red-500 bg-red-50"
                : "border-yellow-500 bg-yellow-50"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">
                    {alert.tourist}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      alert.status === "Active"
                        ? "bg-red-100 text-red-800 flex items-center gap-1"
                        : alert.status === "Resolved"
                        ? "bg-green-100 text-green-800 flex items-center gap-1"
                        : "bg-yellow-100 text-yellow-800 flex items-center gap-1"
                    }`}
                  >
                    {alert.status === "Active" && (
                      <ExclamationTriangleIcon className="w-3 h-3" />
                    )}
                    {alert.status === "Resolved" && (
                      <CheckCircleIcon className="w-3 h-3" />
                    )}
                    {alert.status === "In Progress" && (
                      <InformationCircleIcon className="w-3 h-3" />
                    )}
                    {alert.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" /> {alert.location}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" /> {alert.time}
                </p>
              </div>
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Navbar = () => (
    <>
      <nav className="w-full py-3 px-4 sm:px-6 flex items-center justify-between bg-white/95 backdrop-blur-sm shadow-lg border-t border-orange-500 sticky top-0 z-50">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-orange-500 rounded-full flex items-center justify-center overflow-hidden">
            <Image
              src="/Logo.jpg"
              alt="Logo"
              width={50}
              height={50}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 bg-white/95 rounded-full flex items-center justify-center overflow-visible">
            <Image
              src="/national_emblem.svg"
              alt="Emblem"
              width={50}
              height={50}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-sm sm:text-xl lg:text-2xl font-bold text-gray-900 font-sans tracking-tight">
              YatraBook
            </h1>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
          {navbarMenuItems.map((item) => (
            <Link
              key={item.name}
              href="#"
              className={`text-gray-900 hover:text-orange-600 transition-colors mx-3 xl:mx-4 relative after:absolute after:bottom-0 after:left-0 after:bg-orange-600 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 font-medium font-sans text-sm ${
                activeMenuItem === item.name
                  ? "text-orange-600 after:w-full"
                  : ""
              } flex items-center gap-2`}
              onClick={() => setActiveMenuItem(item.name)}
            >
              {/* <span>{item.icon}</span> */}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative">
            <button
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <BellIcon className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {mockData.notifications.length}
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border z-50">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {mockData.notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 border-b hover:bg-gray-50"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">
                          {notif.type === "SOS" ? (
                            <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                          ) : notif.type === "Weather" ? (
                            <CloudIcon className="w-5 h-5 text-blue-500" />
                          ) : (
                            <InformationCircleIcon className="w-5 h-5 text-gray-500" />
                          )}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notif.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-lg border-2 border-red-500 font-semibold transition-all transform hover:scale-105 font-sans text-xs sm:text-md flex items-center gap-2">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>
      <div className="w-full h-[3px] bg-gradient-to-r from-orange-500 via-gray-300 to-gray-900"></div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        {/* Side Menu */}
        <div className="w-64 bg-white shadow-lg h-screen fixed top-[80px] left-0 z-40">
          <div className="p-4">
            {/* <h2 className="text-lg font-bold text-gray-900 mb-4">Navigation</h2> */}
            <nav className="space-y-2">
              {sideMenuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveMenuItem(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeMenuItem === item.name
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .admin-dashboard {
          font-family: "Inter", sans-serif;
        }

        /* Custom scrollbar for notifications */
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

        /* Animation for heat points */
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}
