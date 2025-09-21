"use client";

import { SignalIcon } from "@heroicons/react/24/outline";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import { useState } from "react";

const dummyDensity = [
  { location: "Guwahati", density: "High", tourists: 320 },
  { location: "Shillong", density: "Medium", tourists: 210 },
  { location: "Kohima", density: "Low", tourists: 140 },
  { location: "Agartala", density: "Medium", tourists: 180 },
];

export default function TouristDensityPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("Tourist Density");

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
          <SignalIcon className="w-7 h-7 text-orange-500" />
          Tourist Density Map
        </h1>
        <p className="text-gray-700 mb-6">
          Real-time visualization of tourist clusters and high-density areas.
        </p>
        <div className="bg-white border rounded-lg shadow p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-left">Density</th>
                <th className="p-2 text-left">Tourist Count</th>
              </tr>
            </thead>
            <tbody>
              {dummyDensity.map((d) => (
                <tr key={d.location} className="border-b">
                  <td className="p-2">{d.location}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        d.density === "High"
                          ? "bg-orange-100 text-orange-800"
                          : d.density === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {d.density}
                    </span>
                  </td>
                  <td className="p-2">{d.tourists}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
