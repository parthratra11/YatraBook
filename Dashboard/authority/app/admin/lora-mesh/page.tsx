"use client";

import { SignalIcon } from "@heroicons/react/24/outline";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import { useState } from "react";

// Dummy LoraMesh network data
const meshNodes = [
  {
    id: "GW-01",
    type: "Mesh Gateway",
    location: "Central Forest",
    lat: 26.15,
    lng: 91.74,
    status: "Online",
    sensors: 4,
    lastSync: "2025-01-08 10:22",
  },
  {
    id: "GW-02",
    type: "Mesh Gateway",
    location: "North Forest",
    lat: 26.58,
    lng: 93.17,
    status: "Online",
    sensors: 3,
    lastSync: "2025-01-08 10:20",
  },
  {
    id: "BG-01",
    type: "Border Gateway",
    location: "East Border",
    lat: 26.98,
    lng: 94.64,
    status: "Online",
    sensors: 2,
    lastSync: "2025-01-08 10:18",
  },
  {
    id: "BG-02",
    type: "Border Gateway",
    location: "West Border",
    lat: 25.17,
    lng: 93.01,
    status: "Offline",
    sensors: 1,
    lastSync: "2025-01-08 09:55",
  },
  {
    id: "SN-01",
    type: "Sensor",
    location: "Forest Edge",
    lat: 26.75,
    lng: 94.21,
    status: "Online",
    sensors: 0,
    lastSync: "2025-01-08 10:21",
  },
  {
    id: "SN-02",
    type: "Sensor",
    location: "River Side",
    lat: 27.47,
    lng: 94.91,
    status: "Online",
    sensors: 0,
    lastSync: "2025-01-08 10:19",
  },
];

export default function LoraMeshPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("LoraMesh Network");
  const [filter, setFilter] = useState("All");

  const types = ["All", ...Array.from(new Set(meshNodes.map((n) => n.type)))];
  const filteredNodes =
    filter === "All" ? meshNodes : meshNodes.filter((n) => n.type === filter);

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
        {/* <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <SignalIcon className="w-7 h-7 text-green-600" />
          LoraMesh Network Map
        </h1>
        <p className="text-gray-700 mb-6">
          Visualize the deployed LoRa mesh network, gateways, sensors, and their
          connectivity status.
        </p> */}
        {/* Filter Dropdown */}
        <div className="mb-4 flex items-center gap-2">
          <label
            htmlFor="mesh-type"
            className="text-sm font-medium text-gray-700"
          >
            Filter by type:
          </label>
          <select
            id="mesh-type"
            className="border rounded px-2 py-1 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {/* Map Section */}
        <div className="bg-white border rounded-lg shadow p-4 mb-6">
          <div className="w-full h-96 rounded-lg overflow-hidden">
            <iframe
              src="/map/lora_mesh_network_map.html"
              title="LoraMesh Network Map"
              width="100%"
              height="100%"
              style={{
                border: 0,
                minHeight: "350px",
                borderRadius: "8px",
                width: "100%",
                height: "100%",
              }}
              loading="lazy"
            />
          </div>
        </div>
        {/* Mesh Network Table */}
        <div className="bg-white border rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Mesh Network Nodes</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Node ID</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Connected Sensors</th>
                <th className="p-2 text-left">Last Sync</th>
                <th className="p-2 text-left">Coordinates</th>
              </tr>
            </thead>
            <tbody>
              {filteredNodes.map((n) => (
                <tr key={n.id} className="border-b">
                  <td className="p-2">{n.id}</td>
                  <td className="p-2">{n.type}</td>
                  <td className="p-2">{n.location}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        n.status === "Online"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {n.status}
                    </span>
                  </td>
                  <td className="p-2">{n.sensors}</td>
                  <td className="p-2">{n.lastSync}</td>
                  <td className="p-2">
                    {n.lat}, {n.lng}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style jsx global>{`
        iframe {
          background: #f3f4f6;
        }
      `}</style>
    </div>
  );
}
