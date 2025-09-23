"use client";

import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const dummyEFIRs = [
  {
    id: "FIR-001",
    type: "Missing Person",
    location: "Guwahati",
    status: "Filed",
    date: "2025-01-08",
    complainant: "John Doe",
  },
  {
    id: "FIR-002",
    type: "Theft",
    location: "Shillong",
    status: "Under Investigation",
    date: "2025-01-07",
    complainant: "Sarah Smith",
  },
  {
    id: "FIR-003",
    type: "Assault",
    location: "Kohima",
    status: "Resolved",
    date: "2025-01-06",
    complainant: "Raj Patel",
  },
];

export default function EFIRsPage({
  notificationState,
  setNotificationState,
}: {
  notificationState: Record<string, number>;
  setNotificationState: (state: Record<string, number>) => void;
}) {
  const [activeMenuItem, setActiveMenuItem] = useState("E-FIRs");
  const [highlightNew, setHighlightNew] = useState(false);

  useEffect(() => {
    if (notificationState?.["E-FIRs"] > 0) {
      setHighlightNew(true);
      setTimeout(() => setHighlightNew(false), 1200);
      setTimeout(() => {
        setNotificationState({
          ...notificationState,
          ["E-FIRs"]: 0,
        });
      }, 400);
    }
    // eslint-disable-next-line
  }, [activeMenuItem]);

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
          <DocumentMagnifyingGlassIcon className="w-7 h-7 text-orange-500" />
          E-FIRs
        </h1>
        <p className="text-gray-700 mb-6">
          Digitally filed incident or crime reports for rapid response.
        </p>
        <div className="bg-white border rounded-lg shadow p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">FIR ID</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Complainant</th>
              </tr>
            </thead>
            <tbody>
              {dummyEFIRs.map((f) => (
                <tr key={f.id} className="border-b">
                  <td className="p-2">{f.id}</td>
                  <td className="p-2">{f.type}</td>
                  <td className="p-2">{f.location}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        f.status === "Filed"
                          ? "bg-blue-100 text-blue-800"
                          : f.status === "Under Investigation"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {f.status}
                    </span>
                  </td>
                  <td className="p-2">{f.date}</td>
                  <td className="p-2">{f.complainant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
