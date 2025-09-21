"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import { useState } from "react";

const dummyAlerts = [
  {
    id: "A-001",
    type: "SOS",
    location: "Guwahati",
    status: "Active",
    evidence: "Photo, Location",
    time: "2025-01-09 14:30",
  },
  {
    id: "A-002",
    type: "Weather",
    location: "Shillong",
    status: "Resolved",
    evidence: "Report, Location",
    time: "2025-01-09 13:15",
  },
  {
    id: "A-003",
    type: "Trespassing",
    location: "Kohima",
    status: "Filed",
    evidence: "Video, Location",
    time: "2025-01-09 12:45",
  },
];

export default function AlertsManagementPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("Alerts Management");

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
          Alerts Management
        </h1>
        <p className="text-gray-700 mb-6">
          Automated alert dispatch and evidence logging for incidents and
          emergencies.
        </p>
        <div className="bg-white border rounded-lg shadow p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Alert ID</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Evidence</th>
                <th className="p-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {dummyAlerts.map((a) => (
                <tr key={a.id} className="border-b">
                  <td className="p-2">{a.id}</td>
                  <td className="p-2">{a.type}</td>
                  <td className="p-2">{a.location}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        a.status === "Active"
                          ? "bg-orange-100 text-orange-800"
                          : a.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="p-2">{a.evidence}</td>
                  <td className="p-2">{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
