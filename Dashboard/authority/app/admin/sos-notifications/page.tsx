"use client";

import {
  ExclamationTriangleIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
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

// Enhanced dummy data with realistic fields and status
const dummySOS = [
  {
    id: 1,
    time: "2025-01-09 14:30",
    location: "Guwahati, Assam",
    coords: [26.1445, 91.7362],
    subject: "Tourist SOS - John Doe",
    status: "Active",
    priority: "High",
    description: "Emergency SOS triggered by tourist near railway station.",
    details: "John Doe pressed SOS button. Police dispatched to location.",
    reports: [
      {
        id: 1,
        date: "2025-01-09",
        type: "SOS Trigger",
        description: "Tourist pressed SOS button at 14:30.",
        status: "Active",
      },
      {
        id: 2,
        date: "2025-01-09",
        type: "Response",
        description: "Police dispatched to railway station.",
        status: "Active",
      },
    ],
  },
  {
    id: 2,
    time: "2025-01-09 13:15",
    location: "Shillong, Meghalaya",
    coords: [25.5788, 91.8933],
    subject: "Lost Property - Sarah Smith",
    status: "Resolved",
    priority: "Medium",
    description: "Tourist reported lost bag, item recovered and returned.",
    details: "Sarah Smith's lost bag found by staff and returned.",
    reports: [
      {
        id: 1,
        date: "2025-01-09",
        type: "Lost Property",
        description: "Bag reported lost at hotel lobby.",
        status: "Filed",
      },
      {
        id: 2,
        date: "2025-01-09",
        type: "Resolution",
        description: "Bag found by staff and returned to tourist.",
        status: "Resolved",
      },
    ],
  },
  {
    id: 3,
    time: "2025-01-09 12:45",
    location: "Kohima, Nagaland",
    coords: [25.6751, 94.1086],
    subject: "Medical Emergency - Raj Patel",
    status: "In Progress",
    priority: "High",
    description: "Tourist reported minor injury during trekking.",
    details: "Medical team en route to assist Raj Patel.",
    reports: [
      {
        id: 1,
        date: "2025-01-09",
        type: "Minor Injury",
        description: "Tourist slipped on trail, minor leg injury.",
        status: "Filed",
      },
      {
        id: 2,
        date: "2025-01-09",
        type: "Medical Response",
        description: "Medical team dispatched to trekking site.",
        status: "In Progress",
      },
    ],
  },
  {
    id: 4,
    time: "2025-01-09 09:30",
    location: "Agartala, Tripura",
    coords: [23.1645, 92.9376],
    subject: "Trespassing Alert - Border Area",
    status: "Active",
    priority: "High",
    description: "Unauthorized entry detected in restricted border zone.",
    details: "Security alerted, patrol dispatched to investigate.",
    reports: [
      {
        id: 1,
        date: "2025-01-09",
        type: "Trespassing",
        description: "Motion detected in restricted zone at 09:30.",
        status: "Active",
      },
    ],
  },
  {
    id: 5,
    time: "2025-01-09 08:50",
    location: "Guwahati, Assam",
    coords: [26.1445, 91.7362],
    subject: "Weather Alert - Heavy Rainfall",
    status: "Resolved",
    priority: "Medium",
    description: "Heavy rainfall warning issued for Guwahati.",
    details: "Rainfall alert cleared after weather improved.",
    reports: [
      {
        id: 1,
        date: "2025-01-09",
        type: "Weather Alert",
        description: "Heavy rainfall warning issued at 08:50.",
        status: "Resolved",
      },
    ],
  },
  {
    id: 6,
    time: "2025-01-09 08:30",
    location: "Shillong, Meghalaya",
    coords: [25.5788, 91.8933],
    subject: "E-FIR - Theft Report",
    status: "Filed",
    priority: "Low",
    description: "Tourist filed E-FIR for theft at hotel.",
    details: "Police investigating theft reported by tourist.",
    reports: [
      {
        id: 1,
        date: "2025-01-09",
        type: "E-FIR",
        description: "E-FIR filed for theft at hotel room.",
        status: "Filed",
      },
    ],
  },
  {
    id: 7,
    time: "2025-01-09 07:45",
    location: "Kohima, Nagaland",
    coords: [25.6751, 94.1086],
    subject: "Permit Issue - Tourist Group",
    status: "Pending",
    priority: "Medium",
    description: "Tourist group permit verification pending at checkpoint.",
    details: "Permit documents under review by authority.",
    reports: [
      {
        id: 1,
        date: "2025-01-09",
        type: "Permit Verification",
        description: "Tourist group permit not scanned at checkpoint.",
        status: "Pending",
      },
    ],
  },
  {
    id: 8,
    time: "2025-01-09 07:00",
    location: "Agartala, Tripura",
    coords: [23.1645, 92.9376],
    subject: "Medical Assistance - Tourist",
    status: "Resolved",
    priority: "Low",
    description: "Tourist requested medical assistance for dehydration.",
    details: "Medical staff attended and resolved case.",
    reports: [
      {
        id: 1,
        date: "2025-01-09",
        type: "Medical Assistance",
        description: "Tourist reported dehydration at hotel.",
        status: "Resolved",
      },
    ],
  },
  {
    id: 9,
    time: "2025-01-09 06:30",
    location: "Guwahati, Assam",
    coords: [26.1445, 91.7362],
    subject: "Crowd Management - Festival",
    status: "Active",
    priority: "Medium",
    description: "Large crowd gathered for festival event.",
    details: "Additional staff deployed for crowd control.",
    reports: [
      {
        id: 1,
        date: "2025-01-09",
        type: "Crowd Management",
        description: "Crowd density high at festival venue.",
        status: "Active",
      },
    ],
  },
  {
    id: 10,
    time: "2025-01-09 06:00",
    location: "Shillong, Meghalaya",
    coords: [25.5788, 91.8933],
    subject: "Lost Tourist - City Center",
    status: "Resolved",
    priority: "Medium",
    description: "Tourist lost in city center, found and assisted.",
    details: "Tourist guided back to hotel by staff.",
    reports: [
      {
        id: 1,
        date: "2025-01-09",
        type: "Lost Tourist",
        description: "Tourist lost in city center, found after 30 mins.",
        status: "Resolved",
      },
    ],
  },
  {
    id: 11,
    time: "2025-01-09 05:45",
    location: "Kohima, Nagaland",
    coords: [25.6751, 94.1086],
    subject: "System Alert - Check-in",
    status: "Invalid",
    priority: "Low",
    description: "Invalid check-in attempt detected at checkpoint.",
    details: "System flagged check-in, no action required.",
    reports: [
      {
        id: 1,
        date: "2025-01-09",
        type: "System Alert",
        description: "Invalid check-in attempt at checkpoint.",
        status: "Invalid",
      },
    ],
  },
  {
    id: 12,
    time: "2025-01-09 05:30",
    location: "Agartala, Tripura",
    coords: [23.1645, 92.9376],
    subject: "Weather Alert - Fog",
    status: "Pending",
    priority: "Low",
    description: "Dense fog reported, visibility low.",
    details: "Weather monitoring ongoing, advisory issued.",
    reports: [
      {
        id: 1,
        date: "2025-01-09",
        type: "Weather Alert",
        description: "Dense fog reported, advisory issued.",
        status: "Pending",
      },
    ],
  },
  {
    id: 13,
    time: "2025-01-09 05:00",
    location: "Guwahati, Assam",
    coords: [26.1445, 91.7362],
    subject: "E-FIR - Lost Passport",
    status: "Filed",
    priority: "High",
    description: "Tourist filed E-FIR for lost passport.",
    details: "Police investigating lost passport case.",
    reports: [
      {
        id: 1,
        date: "2025-01-09",
        type: "E-FIR",
        description: "E-FIR filed for lost passport.",
        status: "Filed",
      },
    ],
  },
  {
    id: 14,
    time: "2025-01-09 04:30",
    location: "Shillong, Meghalaya",
    coords: [25.5788, 91.8933],
    subject: "Permit Issue - Expired Permit",
    status: "Invalid",
    priority: "Medium",
    description: "Tourist permit expired, renewal required.",
    details: "Tourist notified to renew permit.",
    reports: [
      {
        id: 1,
        date: "2025-01-09",
        type: "Permit Issue",
        description: "Tourist permit expired, renewal required.",
        status: "Invalid",
      },
    ],
  },
  {
    id: 15,
    time: "2025-01-09 04:00",
    location: "Kohima, Nagaland",
    coords: [25.6751, 94.1086],
    subject: "Medical Emergency - Heat Stroke",
    status: "Resolved",
    priority: "High",
    description: "Tourist suffered heat stroke, treated by medical team.",
    details: "Medical team provided treatment, tourist stable.",
    reports: [
      {
        id: 1,
        date: "2025-01-09",
        type: "Medical Emergency",
        description: "Tourist suffered heat stroke, treated on site.",
        status: "Resolved",
      },
    ],
  },
  {
    id: 16,
    time: "2025-01-09 03:30",
    location: "Agartala, Tripura",
    coords: [23.1645, 92.9376],
    subject: "Crowd Management - Market",
    status: "Active",
    priority: "Medium",
    description: "High crowd density reported at local market.",
    details: "Staff monitoring crowd, advisory issued.",
    reports: [
      {
        id: 1,
        date: "2025-01-09",
        type: "Crowd Management",
        description: "High crowd density at market, staff monitoring.",
        status: "Active",
      },
    ],
  },
];

const statusColors: Record<string, string> = {
  Active: "bg-red-100 text-red-800",
  Resolved: "bg-green-100 text-green-800",
  Filed: "bg-blue-100 text-blue-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Invalid: "bg-gray-100 text-gray-800",
};

export default function SOSNotificationsPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("SOS Notifications");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof (typeof dummySOS)[0]>("time");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [mapFocus, setMapFocus] = useState<[number, number] | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Metrics
  const totalReports = dummySOS.length;
  const resolvedReports = dummySOS.filter(
    (a) => a.status === "Resolved"
  ).length;
  const invalidReports = dummySOS.filter((a) => a.status === "Invalid").length;
  const pendingReports = dummySOS.filter(
    (a) => a.status === "Pending" || a.status === "In Progress"
  ).length;

  // Filter and sort alerts
  let filteredAlerts = dummySOS.filter((alert) => {
    const matchesSearch =
      alert.subject.toLowerCase().includes(search.toLowerCase()) ||
      alert.location.toLowerCase().includes(search.toLowerCase()) ||
      alert.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || alert.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  filteredAlerts = [...filteredAlerts].sort((a, b) => {
    let valA = a[sortKey];
    let valB = b[sortKey];
    if (typeof valA === "string" && typeof valB === "string") {
      return sortDir === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
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
          <ExclamationTriangleIcon className="w-7 h-7 text-orange-500" />
          SOS Notifications
        </h1>
        <p className="text-gray-700 mb-6">
          Chronological listing of all SOS events, incidents, and response
          status.
        </p> */}

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-4 grid-rows-3 gap-4 mb-4">
          {/* r1c1: Total Reports */}
          <div className="row-start-1 row-end-1 col-start-1 col-end-1 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <span className="text-xs text-gray-500 mb-1">Total Reports</span>
            <span className="text-3xl font-bold text-gray-900">
              {totalReports}
            </span>
          </div>
          {/* r1c2: Resolved */}
          <div className="row-start-1 row-end-1 col-start-2 col-end-2 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <span className="text-xs text-gray-500 mb-1">Resolved</span>
            <span className="text-3xl font-bold text-green-700">
              {resolvedReports}
            </span>
          </div>
          {/* r2c1: Pending */}
          <div className="row-start-2 row-end-2 col-start-1 col-end-1 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <span className="text-xs text-gray-500 mb-1">Pending</span>
            <span className="text-3xl font-bold text-yellow-700">
              {pendingReports}
            </span>
          </div>
          {/* r2c2: Invalid */}
          <div className="row-start-2 row-end-2 col-start-2 col-end-2 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <span className="text-xs text-gray-500 mb-1">Invalid</span>
            <span className="text-3xl font-bold text-gray-700">
              {invalidReports}
            </span>
          </div>
          {/* r3c1-2: Table Controls */}
          <div className="row-start-3 row-end-3 col-span-2 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <div className="w-full flex flex-col gap-4">
              <input
                type="text"
                placeholder="Search subject/location..."
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
                  <option value="time">Sort by Time</option>
                  <option value="subject">Sort by Subject</option>
                  <option value="location">Sort by Location</option>
                  <option value="status">Sort by Status</option>
                </select>
                <button
                  className="border px-2 py-2 rounded-lg text-sm w-20"
                  onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
                >
                  {sortDir === "asc" ? "Asc" : "Desc"}
                </button>
                <select
                  className="border px-2 py-2 rounded-lg text-sm w-full"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Filed">Filed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
                  <option value="Invalid">Invalid</option>
                </select>
              </div>
            </div>
          </div>
          {/* r1-3 c3-4: Map Visualization */}
          <div className="row-span-3 col-span-2 col-start-3 col-end-5 bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <div className="w-full h-92 rounded-lg overflow-hidden border">
              {isClient && (
                <DynamicMapContainer
                  center={mapCenter}
                  zoom={mapFocus ? 9 : 7}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <DynamicTileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {dummySOS.map((alert) => (
                    <DynamicCircle
                      key={alert.id}
                      center={alert.coords as [number, number]}
                      radius={9000}
                      color={
                        alert.status === "Resolved"
                          ? "green"
                          : alert.status === "Invalid"
                          ? "gray"
                          : alert.status === "Pending" ||
                            alert.status === "In Progress"
                          ? "yellow"
                          : "red"
                      }
                      fillOpacity={0.4}
                      eventHandlers={{
                        click: () =>
                          setMapFocus(alert.coords as [number, number]),
                      }}
                    >
                      <DynamicPopup>
                        <div className="font-semibold">{alert.subject}</div>
                        <div>Status: {alert.status}</div>
                        <div>{alert.location}</div>
                        <div>{alert.time}</div>
                      </DynamicPopup>
                    </DynamicCircle>
                  ))}
                </DynamicMapContainer>
              )}
            </div>
            <div className="mt-4 text-xs text-gray-500 text-center">
              Click on any marker for details.
            </div>
          </div>
        </div>

        {/* SOS Table */}
        <div className="bg-white border rounded-lg shadow p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Subject</th>
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-left">Time</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Priority</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Details</th>
                <th className="p-2 text-left">Map</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map((alert) => (
                <tr
                  key={alert.id}
                  className="border-b cursor-pointer hover:bg-orange-50"
                  onClick={() => setSelectedAlert(alert)}
                >
                  <td className="p-2 font-semibold">{alert.subject}</td>
                  <td className="p-2 flex items-center gap-1">
                    <MapPinIcon className="inline w-4 h-4 text-blue-600" />
                    {alert.location}
                  </td>
                  <td className="p-2">{alert.time}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        statusColors[alert.status] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {alert.status}
                    </span>
                  </td>
                  <td className="p-2">{alert.priority}</td>
                  <td className="p-2">{alert.description}</td>
                  <td className="p-2">
                    <button
                      className="text-blue-600 hover:text-orange-600 underline"
                      title="View Details"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAlert(alert);
                      }}
                    >
                      Details
                    </button>
                  </td>
                  <td className="p-2">
                    <button
                      className="text-blue-600 hover:text-orange-600"
                      title="Show on Map"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMapFocus(alert.coords as [number, number]);
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

        {/* Alert Details Modal */}
        {selectedAlert && (
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
                onClick={() => setSelectedAlert(null)}
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <ExclamationTriangleIcon className="w-6 h-6 text-orange-500" />
                {selectedAlert.subject}
              </h2>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Location:</span>{" "}
                {selectedAlert.location}
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Time:</span>{" "}
                {selectedAlert.time}
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    statusColors[selectedAlert.status] ||
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {selectedAlert.status}
                </span>
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Priority:</span>{" "}
                {selectedAlert.priority}
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Description:</span>{" "}
                {selectedAlert.description}
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Details:</span>{" "}
                {selectedAlert.details}
              </div>
              <div>
                <h3 className="text-md font-semibold text-gray-900 mb-2">
                  Incident/Report Details
                </h3>
                <ul className="space-y-2">
                  {selectedAlert.reports && selectedAlert.reports.length > 0 ? (
                    selectedAlert.reports.map((report: any) => (
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
                            statusColors[report.status] ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {report.status}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-gray-500">
                      No reports available for this alert.
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
        /* Enhanced UI for table controls */
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
