"use client";

import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import { useState } from "react";

const dummyAreas = [
  { name: "Guwahati City Center", type: "Safe", status: "Open" },
  { name: "Shillong Forest Reserve", type: "Restricted", status: "Closed" },
  { name: "Kohima Border Zone", type: "Dangerous", status: "Alert" },
  { name: "Agartala Tourist Park", type: "Safe", status: "Open" },
];

export default function SafeAreasPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("Safe Areas");

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
          <ShieldCheckIcon className="w-7 h-7 text-orange-500" />
          Safe Area Management
        </h1>
        <p className="text-gray-700 mb-6">
          Mark, manage, and monitor safe, dangerous, reserved, or restricted
          areas.
        </p>
        <div className="bg-white border rounded-lg shadow p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Area Name</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyAreas.map((a) => (
                <tr key={a.name} className="border-b">
                  <td className="p-2">{a.name}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        a.type === "Safe"
                          ? "bg-green-100 text-green-800"
                          : a.type === "Restricted"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {a.type}
                    </span>
                  </td>
                  <td className="p-2">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
