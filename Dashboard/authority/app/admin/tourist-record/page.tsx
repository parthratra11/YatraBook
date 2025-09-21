"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import { UserGroupIcon } from "@heroicons/react/24/outline";

// Dummy past tourist data
const pastTourists = [
  {
    name: "John Doe",
    nationality: "USA",
    visited: "2024-12-10",
    zone: "Guwahati City Center",
    status: "Exited",
  },
  {
    name: "Priya Singh",
    nationality: "India",
    visited: "2024-12-12",
    zone: "Kaziranga National Park",
    status: "Exited",
  },
  {
    name: "Alex Kim",
    nationality: "South Korea",
    visited: "2024-12-15",
    zone: "Majuli Island",
    status: "Exited",
  },
  {
    name: "Fatima Noor",
    nationality: "Bangladesh",
    visited: "2024-12-18",
    zone: "Agartala",
    status: "Exited",
  },
  {
    name: "Michael Brown",
    nationality: "UK",
    visited: "2024-12-20",
    zone: "Manas National Park",
    status: "Exited",
  },
  {
    name: "Li Wei",
    nationality: "China",
    visited: "2024-12-22",
    zone: "Sivasagar Heritage Zone",
    status: "Exited",
  },
  {
    name: "Amit Sharma",
    nationality: "India",
    visited: "2024-12-25",
    zone: "Haflong Hill Station",
    status: "Exited",
  },
  {
    name: "Maria Lopez",
    nationality: "Spain",
    visited: "2024-12-28",
    zone: "Dibrugarh Riverside",
    status: "Exited",
  },
  {
    name: "Rajiv Das",
    nationality: "India",
    visited: "2024-12-30",
    zone: "Tezpur Cultural Zone",
    status: "Exited",
  },
  {
    name: "Emily Brown",
    nationality: "Australia",
    visited: "2025-01-02",
    zone: "Jorhat Tea Gardens",
    status: "Exited",
  },
];

const TouristPastRecords = () => {
  // Change to match SideMenu item name exactly
  const [activeMenuItem, setActiveMenuItem] = useState("Tourist Record");
  const total = pastTourists.length;
  const uniqueNationalities = Array.from(
    new Set(pastTourists.map((t) => t.nationality))
  );
  const zonesVisited = Array.from(new Set(pastTourists.map((t) => t.zone)));

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
          Tourist Past Records
        </h1>
        <p className="text-gray-700 mb-6">
          Historical data and analytics of tourists who visited Assam.
        </p>
        {/* Analytics */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <span className="text-xs text-gray-500 mb-1">Total Tourists</span>
            <span className="text-2xl font-bold text-gray-900">{total}</span>
          </div>
          <div className="bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <span className="text-xs text-gray-500 mb-1">Nationalities</span>
            <span className="text-2xl font-bold text-blue-700">
              {uniqueNationalities.length}
            </span>
          </div>
          <div className="bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <span className="text-xs text-gray-500 mb-1">Zones Visited</span>
            <span className="text-2xl font-bold text-green-700">
              {zonesVisited.length}
            </span>
          </div>
        </div>
        {/* Table */}
        <div className="bg-white border rounded-lg shadow p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Nationality</th>
                <th className="p-2 text-left">Visited On</th>
                <th className="p-2 text-left">Zone</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {pastTourists.map((t, idx) => (
                <tr key={t.name + idx} className="border-b">
                  <td className="p-2">{t.name}</td>
                  <td className="p-2">{t.nationality}</td>
                  <td className="p-2">{t.visited}</td>
                  <td className="p-2">{t.zone}</td>
                  <td className="p-2">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TouristPastRecords;
