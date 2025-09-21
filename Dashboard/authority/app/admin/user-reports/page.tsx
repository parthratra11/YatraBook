"use client";

import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import { useState } from "react";

const dummyReports = [
  {
    id: "R-001",
    type: "Sanitation",
    location: "Shillong Market",
    status: "Resolved",
    submittedBy: "John Doe",
    date: "2025-01-08",
  },
  {
    id: "R-002",
    type: "Infrastructure",
    location: "Guwahati Airport",
    status: "Pending",
    submittedBy: "Sarah Smith",
    date: "2025-01-07",
  },
  {
    id: "R-003",
    type: "Safety",
    location: "Kohima Main Road",
    status: "Active",
    submittedBy: "Raj Patel",
    date: "2025-01-06",
  },
];

export default function UserReportsPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("User Reports");

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
          <ClipboardDocumentListIcon className="w-7 h-7 text-orange-500" />
          User Reports
        </h1>
        <p className="text-gray-700 mb-6">
          User-submitted reports on infrastructure, sanitation, and other
          issues.
        </p>
        <div className="bg-white border rounded-lg shadow p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Report ID</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Submitted By</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {dummyReports.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="p-2">{r.id}</td>
                  <td className="p-2">{r.type}</td>
                  <td className="p-2">{r.location}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        r.status === "Resolved"
                          ? "bg-gray-100 text-gray-800"
                          : r.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-2">{r.submittedBy}</td>
                  <td className="p-2">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
