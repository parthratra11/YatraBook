"use client";

import {
  ExclamationTriangleIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import { useState } from "react";

const dummySOS = [
  {
    id: 1,
    time: "2025-01-09 14:30",
    location: "Guwahati, Assam",
    subject: "John Doe",
    status: "Active",
    priority: "High",
    description: "SOS triggered by tourist.",
  },
  {
    id: 2,
    time: "2025-01-09 13:15",
    location: "Shillong, Meghalaya",
    subject: "Sarah Smith",
    status: "Resolved",
    priority: "Medium",
    description: "SOS resolved by authority.",
  },
  {
    id: 3,
    time: "2025-01-09 12:45",
    location: "Kohima, Nagaland",
    subject: "Raj Patel",
    status: "In Progress",
    priority: "High",
    description: "SOS in progress.",
  },
];

export default function SOSNotificationsPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("SOS Notifications");

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
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <ExclamationTriangleIcon className="w-7 h-7 text-orange-500" />
          SOS Notifications
        </h1>
        <p className="text-gray-700 mb-6">
          Chronological listing of all SOS events, incidents, and response
          status.
        </p>
        <div className="bg-white border rounded-lg shadow p-6">
          <ul>
            {dummySOS.map((alert) => (
              <li
                key={alert.id}
                className={`mb-4 p-4 rounded border-l-4 ${
                  alert.status === "Active"
                    ? "border-orange-500 bg-orange-50"
                    : alert.status === "Resolved"
                    ? "border-gray-400 bg-gray-100 opacity-60"
                    : "border-yellow-500 bg-yellow-50"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-900">
                    {alert.subject}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-gray-200 text-gray-700">
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
                  <span className="font-semibold">
                    Priority: {alert.priority}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{alert.description}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
