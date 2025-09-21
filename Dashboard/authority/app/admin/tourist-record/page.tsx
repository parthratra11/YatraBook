"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import {
  UserGroupIcon,
  DocumentMagnifyingGlassIcon,
  CalendarIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

// Expanded dummy past tourist data with more fields and groupMembers for groups
const pastTourists = [
  {
    name: "John Doe",
    nationality: "USA",
    visited: "2024-12-10",
    left: "2024-12-15",
    zone: "Guwahati City Center",
    status: "Exited",
    group: "Alone",
    itinerary: [
      "Arrived at Guwahati",
      "Visited Kamakhya Temple",
      "Attended festival",
    ],
    documents: ["Passport.pdf", "Visa.pdf", "Permit.pdf"],
    groupMembers: [],
  },
  {
    name: "Priya Singh",
    nationality: "India",
    visited: "2024-12-12",
    left: "2024-12-18",
    zone: "Kaziranga National Park",
    status: "Exited",
    group: "Group",
    itinerary: ["Safari", "Birdwatching", "Local market"],
    documents: ["Aadhar.pdf", "Permit.pdf"],
    groupMembers: [
      {
        name: "Chen Wei",
        nationality: "China",
        zone: "Kaziranga National Park",
        status: "Exited",
      },
      {
        name: "Ravi Patel",
        nationality: "India",
        zone: "Kaziranga National Park",
        status: "Exited",
      },
    ],
  },
  {
    name: "Alex Kim",
    nationality: "South Korea",
    visited: "2024-12-15",
    left: "2024-12-20",
    zone: "Majuli Island",
    status: "Exited",
    group: "Alone",
    itinerary: ["Ferry to Majuli", "Cultural tour", "Tea garden visit"],
    documents: ["Passport.pdf", "Permit.pdf"],
    groupMembers: [],
  },
  {
    name: "Fatima Noor",
    nationality: "Bangladesh",
    visited: "2024-12-18",
    left: "2024-12-22",
    zone: "Agartala",
    status: "Exited",
    group: "Group",
    itinerary: ["City tour", "Museum visit"],
    documents: ["Passport.pdf", "Visa.pdf"],
    groupMembers: [
      {
        name: "Sofia Garcia",
        nationality: "Mexico",
        zone: "Agartala",
        status: "Exited",
      },
      {
        name: "Mohammed Ali",
        nationality: "UAE",
        zone: "Agartala",
        status: "Exited",
      },
    ],
  },
  {
    name: "Michael Brown",
    nationality: "UK",
    visited: "2024-12-20",
    left: "2024-12-25",
    zone: "Manas National Park",
    status: "Exited",
    group: "Alone",
    itinerary: ["Wildlife safari", "Photography"],
    documents: ["Passport.pdf", "Permit.pdf"],
    groupMembers: [],
  },
  {
    name: "Li Wei",
    nationality: "China",
    visited: "2024-12-22",
    left: "2024-12-28",
    zone: "Sivasagar Heritage Zone",
    status: "Exited",
    group: "Group",
    itinerary: ["Heritage walk", "Temple visit"],
    documents: ["Passport.pdf", "Visa.pdf", "Permit.pdf"],
    groupMembers: [
      {
        name: "Peter Novak",
        nationality: "Czech Republic",
        zone: "Sivasagar Heritage Zone",
        status: "Exited",
      },
      {
        name: "Julia Rossi",
        nationality: "Italy",
        zone: "Sivasagar Heritage Zone",
        status: "Exited",
      },
    ],
  },
  {
    name: "Amit Sharma",
    nationality: "India",
    visited: "2024-12-25",
    left: "2024-12-30",
    zone: "Haflong Hill Station",
    status: "Exited",
    group: "Alone",
    itinerary: ["Hill station tour", "Local cuisine"],
    documents: ["Aadhar.pdf"],
    groupMembers: [],
  },
  {
    name: "Maria Lopez",
    nationality: "Spain",
    visited: "2024-12-28",
    left: "2025-01-02",
    zone: "Dibrugarh Riverside",
    status: "Exited",
    group: "Group",
    itinerary: ["River cruise", "Tea garden visit"],
    documents: ["Passport.pdf", "Permit.pdf"],
    groupMembers: [
      {
        name: "Sunita Devi",
        nationality: "India",
        zone: "Dibrugarh Riverside",
        status: "Exited",
      },
    ],
  },
  {
    name: "Rajiv Das",
    nationality: "India",
    visited: "2024-12-30",
    left: "2025-01-04",
    zone: "Tezpur Cultural Zone",
    status: "Exited",
    group: "Alone",
    itinerary: ["Cultural event", "Temple visit"],
    documents: ["Aadhar.pdf"],
    groupMembers: [],
  },
  {
    name: "Emily Brown",
    nationality: "Australia",
    visited: "2025-01-02",
    left: "2025-01-08",
    zone: "Jorhat Tea Gardens",
    status: "Exited",
    group: "Group",
    itinerary: ["Tea garden tour", "Local market"],
    documents: ["Passport.pdf", "Permit.pdf"],
    groupMembers: [
      {
        name: "Meera Nair",
        nationality: "India",
        zone: "Jorhat Tea Gardens",
        status: "Exited",
      },
      {
        name: "Olga Ivanova",
        nationality: "Russia",
        zone: "Jorhat Tea Gardens",
        status: "Exited",
      },
    ],
  },
  {
    name: "Chen Wei",
    nationality: "China",
    visited: "2025-01-03",
    left: "2025-01-10",
    zone: "Kaziranga National Park",
    status: "Exited",
    group: "Group",
    itinerary: ["Safari", "Photography"],
    documents: ["Passport.pdf", "Permit.pdf"],
    groupMembers: [
      {
        name: "Priya Singh",
        nationality: "India",
        zone: "Kaziranga National Park",
        status: "Exited",
      },
      {
        name: "Ravi Patel",
        nationality: "India",
        zone: "Kaziranga National Park",
        status: "Exited",
      },
    ],
  },
  {
    name: "James Lee",
    nationality: "USA",
    visited: "2025-01-08",
    left: "2025-01-14",
    zone: "Barak Valley",
    status: "Exited",
    group: "Group",
    itinerary: ["Valley trek", "Photography"],
    documents: ["Passport.pdf", "Permit.pdf"],
    groupMembers: [
      {
        name: "Fatima Noor",
        nationality: "Bangladesh",
        zone: "Barak Valley",
        status: "Exited",
      },
      {
        name: "Sofia Garcia",
        nationality: "Mexico",
        zone: "Barak Valley",
        status: "Exited",
      },
    ],
  },
  // ...other tourists, ensure groupMembers: [] for "Alone"...
];

// Dummy current tourists (add some from analytics page, with group info)
const currentTourists = [
  {
    name: "John Doe",
    nationality: "USA",
    visited: "2025-01-10",
    left: "",
    zone: "Guwahati City Center",
    status: "Active",
    group: "Group",
    groupMembers: [
      {
        name: "Priya Singh",
        nationality: "India",
        zone: "Guwahati City Center",
        status: "Active",
      },
      {
        name: "Alex Kim",
        nationality: "South Korea",
        zone: "Guwahati City Center",
        status: "Active",
      },
    ],
    itinerary: [
      "Arrived at Guwahati",
      "Visited Kamakhya Temple",
      "Attending festival",
    ],
    documents: ["Passport.pdf", "Visa.pdf", "Permit.pdf"],
  },
  {
    name: "Emily Brown",
    nationality: "Australia",
    visited: "2025-01-11",
    left: "",
    zone: "Agartala",
    status: "Active",
    group: "Alone",
    groupMembers: [],
    itinerary: ["City tour", "Museum visit"],
    documents: ["Passport.pdf", "Visa.pdf"],
  },
  {
    name: "Fatima Noor",
    nationality: "Bangladesh",
    visited: "2025-01-12",
    left: "",
    zone: "Barak Valley",
    status: "Active",
    group: "Group",
    groupMembers: [
      {
        name: "James Lee",
        nationality: "USA",
        zone: "Barak Valley",
        status: "Active",
      },
      {
        name: "Sofia Garcia",
        nationality: "Mexico",
        zone: "Barak Valley",
        status: "Active",
      },
    ],
    itinerary: ["Valley trek", "Photography"],
    documents: ["Passport.pdf", "Permit.pdf"],
  },
  // ...add more current tourists as needed...
];

const allNationalities = Array.from(
  new Set([...pastTourists, ...currentTourists].map((t) => t.nationality))
);
const allZones = Array.from(
  new Set([...pastTourists, ...currentTourists].map((t) => t.zone))
);

const TouristPastRecords = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("Tourist Record");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] =
    useState<keyof (typeof pastTourists)[0]>("visited");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filterNationality, setFilterNationality] = useState("All");
  const [filterZone, setFilterZone] = useState("All");
  const [filterGroup, setFilterGroup] = useState("All");
  const [dateFilterType, setDateFilterType] = useState<"single" | "range">(
    "single"
  );
  const [filterDate, setFilterDate] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [selectedTourist, setSelectedTourist] = useState<any>(null);

  // Analytics
  const allTourists = [...currentTourists, ...pastTourists];
  const total = allTourists.length;
  const uniqueNationalities = allNationalities;
  const zonesVisited = allZones;
  const groupCount = {
    Alone: allTourists.filter((t) => t.group === "Alone").length,
    Group: allTourists.filter((t) => t.group === "Group").length,
  };

  // Filtering
  let filteredTourists = allTourists.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.zone.toLowerCase().includes(search.toLowerCase());
    const matchesNationality =
      filterNationality === "All" || t.nationality === filterNationality;
    const matchesZone = filterZone === "All" || t.zone === filterZone;
    const matchesGroup = filterGroup === "All" || t.group === filterGroup;
    let matchesDate = true;
    if (dateFilterType === "single" && filterDate) {
      matchesDate = t.visited === filterDate || t.left === filterDate;
    } else if (dateFilterType === "range" && filterStartDate && filterEndDate) {
      matchesDate =
        (t.visited >= filterStartDate && t.visited <= filterEndDate) ||
        (t.left && t.left >= filterStartDate && t.left <= filterEndDate);
    }
    return (
      matchesSearch &&
      matchesNationality &&
      matchesZone &&
      matchesGroup &&
      matchesDate
    );
  });

  filteredTourists = [...filteredTourists].sort((a, b) => {
    let valA = a[sortKey];
    let valB = b[sortKey];
    if (typeof valA === "string" && typeof valB === "string") {
      return sortDir === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
    return 0;
  });

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
          Historical and current data, analytics of tourists who visited Assam.
        </p>
        {/* Analytics */}
        <div className="grid grid-cols-5 gap-6 mb-8">
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
          <div className="bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <span className="text-xs text-gray-500 mb-1">Travelling Alone</span>
            <span className="text-2xl font-bold text-gray-900">
              {groupCount.Alone}
            </span>
          </div>
          <div className="bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6">
            <span className="text-xs text-gray-500 mb-1">
              Travelling in Group
            </span>
            <span className="text-2xl font-bold text-orange-700">
              {groupCount.Group}
            </span>
          </div>
        </div>
        {/* Table Controls */}
        <div className="bg-white border rounded-lg shadow flex flex-col items-center justify-center p-6 mb-6">
          <div className="w-full flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search name/zone..."
                className="border px-3 py-2 rounded-lg text-sm w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="border px-2 py-2 rounded-lg text-sm w-full"
                value={filterNationality}
                onChange={(e) => setFilterNationality(e.target.value)}
              >
                <option value="All">All Nationalities</option>
                {uniqueNationalities.map((nat) => (
                  <option key={nat} value={nat}>
                    {nat}
                  </option>
                ))}
              </select>
              <select
                className="border px-2 py-2 rounded-lg text-sm w-full"
                value={filterZone}
                onChange={(e) => setFilterZone(e.target.value)}
              >
                <option value="All">All Zones</option>
                {zonesVisited.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
              <select
                className="border px-2 py-2 rounded-lg text-sm w-full"
                value={filterGroup}
                onChange={(e) => setFilterGroup(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Alone">Alone</option>
                <option value="Group">Group</option>
              </select>
            </div>
            <div className="flex gap-4 items-center">
              <select
                className="border px-2 py-2 rounded-lg text-sm w-40"
                value={dateFilterType}
                onChange={(e) => setDateFilterType(e.target.value as any)}
              >
                <option value="single">Single Date</option>
                <option value="range">Date Range</option>
              </select>
              {dateFilterType === "single" ? (
                <input
                  type="date"
                  className="border px-2 py-2 rounded-lg text-sm w-40"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              ) : (
                <>
                  <input
                    type="date"
                    className="border px-2 py-2 rounded-lg text-sm w-40"
                    value={filterStartDate}
                    onChange={(e) => setFilterStartDate(e.target.value)}
                  />
                  <span className="text-xs text-gray-500">to</span>
                  <input
                    type="date"
                    className="border px-2 py-2 rounded-lg text-sm w-40"
                    value={filterEndDate}
                    onChange={(e) => setFilterEndDate(e.target.value)}
                  />
                </>
              )}
              <select
                className="border px-2 py-2 rounded-lg text-sm w-40"
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as any)}
              >
                <option value="visited">Sort by Visited On</option>
                <option value="left">Sort by Left On</option>
                <option value="name">Sort by Name</option>
                <option value="zone">Sort by Zone</option>
                <option value="nationality">Sort by Nationality</option>
                <option value="group">Sort by Group</option>
              </select>
              <button
                className="border px-2 py-2 rounded-lg text-sm w-20"
                onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
              >
                {sortDir === "asc" ? "Asc" : "Desc"}
              </button>
            </div>
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
                <th className="p-2 text-left">Left On</th>
                <th className="p-2 text-left">Zone</th>
                <th className="p-2 text-left">Group</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Itinerary</th>
                <th className="p-2 text-left">Documents</th>
              </tr>
            </thead>
            <tbody>
              {filteredTourists.map((t, idx) => (
                <tr
                  key={t.name + idx}
                  className="border-b cursor-pointer hover:bg-orange-50"
                  onClick={() => setSelectedTourist(t)}
                >
                  <td className="p-2">{t.name}</td>
                  <td className="p-2">{t.nationality}</td>
                  <td className="p-2">{t.visited}</td>
                  <td className="p-2">{t.left || "-"}</td>
                  <td className="p-2">{t.zone}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        t.group === "Alone"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {t.group}
                    </span>
                  </td>
                  <td className="p-2">{t.status}</td>
                  <td className="p-2">
                    <button
                      className="text-blue-600 hover:text-orange-600 underline"
                      title="View Itinerary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTourist(t);
                      }}
                    >
                      View
                    </button>
                  </td>
                  <td className="p-2">
                    <button
                      className="text-blue-600 hover:text-orange-600 underline"
                      title="View Documents"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTourist(t);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Tourist Details Modal */}
        {selectedTourist && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              backdropFilter: "blur(8px)",
              background: "rgba(255,255,255,0.3)",
            }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                onClick={() => setSelectedTourist(null)}
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <UserGroupIcon className="w-6 h-6 text-orange-500" />
                {selectedTourist.name}
              </h2>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Nationality:</span>{" "}
                {selectedTourist.nationality}
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Visited On:</span>{" "}
                {selectedTourist.visited}
                <span className="ml-4 font-semibold">Left On:</span>{" "}
                {selectedTourist.left || "-"}
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Zone:</span>{" "}
                {selectedTourist.zone}
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Group:</span>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedTourist.group === "Alone"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {selectedTourist.group}
                </span>
              </div>
              {selectedTourist.group === "Group" &&
                selectedTourist.groupMembers &&
                selectedTourist.groupMembers.length > 0 && (
                  <div className="mb-2 text-gray-700">
                    <span className="font-semibold">Group Members:</span>
                    <ul className="list-disc ml-6 mt-1 text-xs">
                      {selectedTourist.groupMembers.map((m: any, i: number) => (
                        <li key={m.name + i}>
                          <span className="font-semibold">{m.name}</span>
                          <span className="ml-2 text-gray-500">
                            {m.nationality}
                          </span>
                          <span className="ml-2 text-gray-400">{m.zone}</span>
                          <span className="ml-2 text-green-700">
                            {m.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Status:</span>{" "}
                {selectedTourist.status}
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Itinerary:</span>
                <ul className="list-disc ml-6 mt-1 text-xs">
                  {selectedTourist.itinerary.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Documents:</span>
                <ul className="list-disc ml-6 mt-1 text-xs">
                  {selectedTourist.documents.map((doc: string, i: number) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-blue-600 hover:text-orange-600 underline"
                        title={`Download ${doc}`}
                      >
                        {doc}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TouristPastRecords;
