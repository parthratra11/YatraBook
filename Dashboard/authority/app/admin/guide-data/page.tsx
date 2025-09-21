"use client";

import { MapIcon } from "@heroicons/react/24/outline";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import { useState } from "react";

const dummyGuides = [
  {
    id: "G-001",
    name: "Amit Sharma",
    rating: 4.8,
    tours: 32,
    status: "Active",
  },
  { id: "G-002", name: "Priya Das", rating: 4.6, tours: 28, status: "Active" },
  {
    id: "G-003",
    name: "Rohit Sen",
    rating: 4.2,
    tours: 19,
    status: "Inactive",
  },
];

export default function GuideDataPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("Guide Data");

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
          <MapIcon className="w-7 h-7 text-orange-500" />
          Guide Data
        </h1>
        <p className="text-gray-700 mb-6">
          Registered guides and their performance overview.
        </p>
        <div className="bg-white border rounded-lg shadow p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Guide ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Rating</th>
                <th className="p-2 text-left">Tours</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyGuides.map((g) => (
                <tr key={g.id} className="border-b">
                  <td className="p-2">{g.id}</td>
                  <td className="p-2">{g.name}</td>
                  <td className="p-2">{g.rating}</td>
                  <td className="p-2">{g.tours}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        g.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {g.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
