"use client";

import { UserGroupIcon } from "@heroicons/react/24/outline";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import { useState } from "react";

const dummyStats = [
  { label: "Total Tourists", value: 1247 },
  { label: "International Tourists", value: 342 },
  { label: "Domestic Tourists", value: 905 },
  { label: "High Priority", value: 23 },
];

const dummyClusters = [
  { location: "Guwahati", tourists: 320 },
  { location: "Shillong", tourists: 210 },
  { location: "Kohima", tourists: 140 },
  { location: "Agartala", tourists: 180 },
];

export default function TouristAnalyticsPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("Tourist Analytics");

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
          <UserGroupIcon className="w-7 h-7 text-orange-500" />
          Tourist Analytics
        </h1>
        <p className="text-gray-700 mb-6">
          Real-time analytics and statistics of tourist clusters and travel
          patterns.
        </p>
        <div className="bg-white border rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dummyStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-orange-50 border-l-4 border-orange-500 rounded p-4 text-center"
              >
                <div className="text-lg font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Tourist Clusters
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-left">Tourist Count</th>
              </tr>
            </thead>
            <tbody>
              {dummyClusters.map((c) => (
                <tr key={c.location} className="border-b">
                  <td className="p-2">{c.location}</td>
                  <td className="p-2">{c.tourists}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
