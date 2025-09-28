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
    filedBy: "Self",
  },
  {
    id: "FIR-002",
    type: "Missing Person",
    location: "Shillong",
    status: "Under Investigation",
    date: "2025-01-07",
    complainant: "Sarah Smith",
    filedBy: "Group Member",
  },
  {
    id: "FIR-003",
    type: "Missing Person",
    location: "Kohima",
    status: "Resolved",
    date: "2025-01-06",
    complainant: "Raj Patel",
    filedBy: "Self",
  },
  {
    id: "FIR-004",
    type: "Missing Person",
    location: "Imphal",
    status: "Filed",
    date: "2025-01-05",
    complainant: "Priya Das",
    filedBy: "Group Member",
  },
  {
    id: "FIR-005",
    type: "Missing Person",
    location: "Aizawl",
    status: "Under Investigation",
    date: "2025-01-04",
    complainant: "Amit Kumar",
    filedBy: "Self",
  },
  {
    id: "FIR-006",
    type: "Missing Person",
    location: "Agartala",
    status: "Resolved",
    date: "2025-01-03",
    complainant: "Sunita Sharma",
    filedBy: "Group Member",
  },
  {
    id: "FIR-007",
    type: "Missing Person",
    location: "Dispur",
    status: "Filed",
    date: "2025-01-02",
    complainant: "Rohit Sen",
    filedBy: "Self",
  },
  {
    id: "FIR-008",
    type: "Missing Person",
    location: "Itanagar",
    status: "Under Investigation",
    date: "2025-01-01",
    complainant: "Meena Devi",
    filedBy: "Group Member",
  },
  {
    id: "FIR-009",
    type: "Missing Person",
    location: "Gangtok",
    status: "Resolved",
    date: "2024-12-31",
    complainant: "Vikram Singh",
    filedBy: "Self",
  },
  {
    id: "FIR-010",
    type: "Missing Person",
    location: "Silchar",
    status: "Filed",
    date: "2024-12-30",
    complainant: "Anjali Gupta",
    filedBy: "Group Member",
  },
  {
    id: "FIR-011",
    type: "Missing Person",
    location: "Tezpur",
    status: "Under Investigation",
    date: "2024-12-29",
    complainant: "Deepak Joshi",
    filedBy: "Self",
  },
  {
    id: "FIR-012",
    type: "Missing Person",
    location: "Jorhat",
    status: "Resolved",
    date: "2024-12-28",
    complainant: "Kiran Bedi",
    filedBy: "Group Member",
  },
  {
    id: "FIR-013",
    type: "Missing Person",
    location: "Dibrugarh",
    status: "Filed",
    date: "2024-12-27",
    complainant: "Suresh Raina",
    filedBy: "Self",
  },
  {
    id: "FIR-014",
    type: "Missing Person",
    location: "Dimapur",
    status: "Under Investigation",
    date: "2024-12-26",
    complainant: "Rita Paul",
    filedBy: "Group Member",
  },
  {
    id: "FIR-015",
    type: "Missing Person",
    location: "Tura",
    status: "Resolved",
    date: "2024-12-25",
    complainant: "Manoj Tiwari",
    filedBy: "Self",
  },
  {
    id: "FIR-016",
    type: "Missing Person",
    location: "Nagaon",
    status: "Filed",
    date: "2024-12-24",
    complainant: "Sneha Roy",
    filedBy: "Group Member",
  },
  {
    id: "FIR-017",
    type: "Missing Person",
    location: "Bongaigaon",
    status: "Under Investigation",
    date: "2024-12-23",
    complainant: "Arjun Kapoor",
    filedBy: "Self",
  },
  {
    id: "FIR-018",
    type: "Missing Person",
    location: "Diphu",
    status: "Resolved",
    date: "2024-12-22",
    complainant: "Neha Mehta",
    filedBy: "Group Member",
  },
  {
    id: "FIR-019",
    type: "Missing Person",
    location: "Karimganj",
    status: "Filed",
    date: "2024-12-21",
    complainant: "Sanjay Dutt",
    filedBy: "Self",
  },
  {
    id: "FIR-020",
    type: "Missing Person",
    location: "Dhemaji",
    status: "Under Investigation",
    date: "2024-12-20",
    complainant: "Pooja Bhatt",
    filedBy: "Group Member",
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

  // Filtering state
  // Remove typeFilter, add filedByFilter
  // const [typeFilter, setTypeFilter] = useState("");
  const [filedByFilter, setFiledByFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Unique filter options
  // Remove typeOptions, add filedByOptions
  // const typeOptions = Array.from(new Set(dummyEFIRs.map((f) => f.type)));
  const filedByOptions = Array.from(new Set(dummyEFIRs.map((f) => f.filedBy)));
  const statusOptions = Array.from(new Set(dummyEFIRs.map((f) => f.status)));
  const locationOptions = Array.from(
    new Set(dummyEFIRs.map((f) => f.location))
  );

  // Filtered data
  const filteredEFIRs = dummyEFIRs.filter(
    (f) =>
      (filedByFilter === "" || f.filedBy === filedByFilter) &&
      (statusFilter === "" || f.status === statusFilter) &&
      (locationFilter === "" || f.location === locationFilter)
  );

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
        {/* <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <DocumentMagnifyingGlassIcon className="w-7 h-7 text-orange-500" />
          E-FIRs
        </h1>
        <p className="text-gray-700 mb-6">
          Digitally filed incident or crime reports for rapid response.
        </p> */}
        {/* Filter UI */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Filed By
            </label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={filedByFilter}
              onChange={(e) => setFiledByFilter(e.target.value)}
            >
              <option value="">All</option>
              {filedByOptions.map((filedBy) => (
                <option key={filedBy} value={filedBy}>
                  {filedBy}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All</option>
              {locationOptions.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          {(filedByFilter || statusFilter || locationFilter) && (
            <button
              className="ml-2 px-3 py-1 bg-gray-200 rounded text-xs font-medium hover:bg-gray-300"
              onClick={() => {
                setFiledByFilter("");
                setStatusFilter("");
                setLocationFilter("");
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
        <div className="bg-white border rounded-lg shadow p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">FIR ID</th>
                <th className="p-2 text-left">Complainant</th>
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Filed By</th>
              </tr>
            </thead>
            <tbody>
              {filteredEFIRs.map((f) => (
                <tr key={f.id} className="border-b">
                  <td className="p-2">{f.id}</td>
                  <td className="p-2">{f.complainant}</td>
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
                  <td className="p-2">{f.filedBy}</td>
                </tr>
              ))}
              {filteredEFIRs.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 py-6">
                    No E-FIRs found for selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
