"use client";

import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

// Add more dummy reports for table and map
const dummyReports = [
  {
    id: "R-001",
    type: "Sanitation",
    location: "Shillong Market",
    status: "Resolved",
    submittedBy: "John Doe",
    date: "2025-01-08",
    safetyRating: 4.5,
  },
  {
    id: "R-002",
    type: "Infrastructure",
    location: "Guwahati Airport",
    status: "Pending",
    submittedBy: "Sarah Smith",
    date: "2025-01-07",
    safetyRating: 3.2,
  },
  {
    id: "R-003",
    type: "Safety",
    location: "Kohima Main Road",
    status: "Active",
    submittedBy: "Raj Patel",
    date: "2025-01-06",
    safetyRating: 2.8,
  },
  {
    id: "R-004",
    type: "Sanitation",
    location: "Kaziranga National Park",
    status: "Pending",
    submittedBy: "Priya Das",
    date: "2025-01-08",
    safetyRating: 3.8,
  },
  {
    id: "R-005",
    type: "Safety",
    location: "Manas National Park",
    status: "Active",
    submittedBy: "Emily Chen",
    date: "2025-01-07",
    safetyRating: 2.5,
  },
  {
    id: "R-006",
    type: "Infrastructure",
    location: "Sivasagar Heritage Zone",
    status: "Resolved",
    submittedBy: "Carlos Mendes",
    date: "2025-01-06",
    safetyRating: 4.2,
  },
  {
    id: "R-007",
    type: "Sanitation",
    location: "Silchar Urban Area",
    status: "Resolved",
    submittedBy: "Anna Ivanova",
    date: "2025-01-05",
    safetyRating: 4.7,
  },
  {
    id: "R-008",
    type: "Safety",
    location: "North Cachar Hills",
    status: "Active",
    submittedBy: "Mohammed Al-Farsi",
    date: "2025-01-04",
    safetyRating: 2.1,
  },
  {
    id: "R-009",
    type: "Infrastructure",
    location: "Goalpara Wetlands",
    status: "Pending",
    submittedBy: "Priya Nair",
    date: "2025-01-03",
    safetyRating: 3.5,
  },
  {
    id: "R-010",
    type: "Sanitation",
    location: "Jorhat Tea Gardens",
    status: "Resolved",
    submittedBy: "David Lee",
    date: "2025-01-02",
    safetyRating: 4.8,
  },
  {
    id: "R-011",
    type: "Safety",
    location: "Barak Valley",
    status: "Active",
    submittedBy: "Fatima Zahra",
    date: "2025-01-01",
    safetyRating: 2.9,
  },
  {
    id: "R-012",
    type: "Infrastructure",
    location: "Diphu Eco Zone",
    status: "Pending",
    submittedBy: "Rajiv Kumar",
    date: "2025-01-08",
    safetyRating: 3.6,
  },
  {
    id: "R-013",
    type: "Sanitation",
    location: "Dibrugarh Riverside",
    status: "Resolved",
    submittedBy: "Amit Sharma",
    date: "2025-01-07",
    safetyRating: 4.3,
  },
  {
    id: "R-014",
    type: "Safety",
    location: "Tezpur Cultural Zone",
    status: "Active",
    submittedBy: "Priya Das",
    date: "2025-01-06",
    safetyRating: 2.7,
  },
  {
    id: "R-015",
    type: "Infrastructure",
    location: "Haflong Hill Station",
    status: "Pending",
    submittedBy: "Rohit Sen",
    date: "2025-01-05",
    safetyRating: 3.9,
  },
  {
    id: "R-016",
    type: "Sanitation",
    location: "Bongaigaon Urban Zone",
    status: "Resolved",
    submittedBy: "Emily Chen",
    date: "2025-01-04",
    safetyRating: 4.6,
  },
  {
    id: "R-017",
    type: "Safety",
    location: "Dhemaji Riverside",
    status: "Active",
    submittedBy: "Carlos Mendes",
    date: "2025-01-03",
    safetyRating: 2.4,
  },
  {
    id: "R-018",
    type: "Infrastructure",
    location: "Nagaon Heritage Zone",
    status: "Pending",
    submittedBy: "Anna Ivanova",
    date: "2025-01-02",
    safetyRating: 3.7,
  },
  {
    id: "R-019",
    type: "Sanitation",
    location: "Majuli Island",
    status: "Resolved",
    submittedBy: "Mohammed Al-Farsi",
    date: "2025-01-01",
    safetyRating: 4.1,
  },
  {
    id: "R-020",
    type: "Safety",
    location: "Tinsukia Eco Park",
    status: "Active",
    submittedBy: "Priya Nair",
    date: "2025-01-08",
    safetyRating: 2.6,
  },
  {
    id: "R-021",
    type: "Infrastructure",
    location: "Baksa Forest",
    status: "Pending",
    submittedBy: "David Lee",
    date: "2025-01-07",
    safetyRating: 3.3,
  },
  {
    id: "R-022",
    type: "Sanitation",
    location: "Morigaon Town",
    status: "Resolved",
    submittedBy: "Fatima Zahra",
    date: "2025-01-06",
    safetyRating: 4.9,
  },
  {
    id: "R-023",
    type: "Safety",
    location: "Karimganj Border",
    status: "Active",
    submittedBy: "Rajiv Kumar",
    date: "2025-01-05",
    safetyRating: 2.2,
  },
  {
    id: "R-024",
    type: "Infrastructure",
    location: "Sonitpur Forest Area",
    status: "Pending",
    submittedBy: "Amit Sharma",
    date: "2025-01-04",
    safetyRating: 3.4,
  },
  {
    id: "R-025",
    type: "Sanitation",
    location: "Moranhat",
    status: "Resolved",
    submittedBy: "Priya Das",
    date: "2025-01-03",
    safetyRating: 4.4,
  },
  {
    id: "R-026",
    type: "Safety",
    location: "Duliajan",
    status: "Active",
    submittedBy: "Rohit Sen",
    date: "2025-01-02",
    safetyRating: 2.3,
  },
  {
    id: "R-027",
    type: "Infrastructure",
    location: "Jorabat",
    status: "Pending",
    submittedBy: "Emily Chen",
    date: "2025-01-01",
    safetyRating: 3.1,
  },
  {
    id: "R-028",
    type: "Sanitation",
    location: "Dhekiajuli",
    status: "Resolved",
    submittedBy: "Carlos Mendes",
    date: "2025-01-08",
    safetyRating: 4.0,
  },
  {
    id: "R-029",
    type: "Safety",
    location: "Gohpur",
    status: "Active",
    submittedBy: "Anna Ivanova",
    date: "2025-01-07",
    safetyRating: 2.0,
  },
  {
    id: "R-030",
    type: "Infrastructure",
    location: "Biswanath Chariali",
    status: "Pending",
    submittedBy: "Mohammed Al-Farsi",
    date: "2025-01-06",
    safetyRating: 3.0,
  },
];

export default function UserReportsPage({
  notificationState,
  setNotificationState,
}: {
  notificationState: Record<string, number>;
  setNotificationState: (state: Record<string, number>) => void;
}) {
  const [activeMenuItem, setActiveMenuItem] = useState("User Reports");
  const [highlightNew, setHighlightNew] = useState(false);
  const [filterType, setFilterType] = useState("All");

  // Unique types for filter
  const types = [
    "All",
    ...Array.from(new Set(dummyReports.map((r) => r.type))),
  ];

  // Filtered reports
  const filteredReports =
    filterType === "All"
      ? dummyReports
      : dummyReports.filter((r) => r.type === filterType);

  useEffect(() => {
    if (notificationState?.["User Reports"] > 0) {
      setHighlightNew(true);
      setTimeout(() => setHighlightNew(false), 1200);
      setTimeout(() => {
        setNotificationState({
          ...notificationState,
          ["User Reports"]: 0,
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
          <ClipboardDocumentListIcon className="w-7 h-7 text-orange-500" />
          User Reports
        </h1>
        <p className="text-gray-700 mb-6">
          User-submitted reports on infrastructure, sanitation, and other
          issues.
        </p> */}
        {/* Filter Dropdown */}
        <div className="mb-4 flex items-center gap-2">
          <label
            htmlFor="report-type"
            className="text-sm font-medium text-gray-700"
          >
            Filter by type:
          </label>
          <select
            id="report-type"
            className="border rounded px-2 py-1 text-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
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
              src="/map/user_reports_heatmap.html"
              title="User Reports Heatmap"
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
        {/* Reports Table */}
        <div className="bg-white border rounded-lg shadow p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Report ID</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Safety Rating</th>
                <th className="p-2 text-left">Submitted By</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((r) => (
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
                  <td className="p-2">{r.safetyRating}</td>
                  <td className="p-2">{r.submittedBy}</td>
                  <td className="p-2">{r.date}</td>
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
