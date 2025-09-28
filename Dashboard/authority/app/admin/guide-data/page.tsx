"use client";

import { MapIcon, XCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dummy guide data (more guides, locations, verification)
const dummyGuides = [
  {
    id: "G-001",
    name: "Amit Sharma",
    rating: 4.8,
    tours: 32,
    status: "Active",
    lastLocation: [26.1445, 91.7362],
    lastPlace: "Guwahati City Center",
    idType: "Aadhaar",
    idVerified: true,
    idNumber: "XXXX-XXXX-1234",
    phone: "+91-99999-11111",
    remarks: "Excellent feedback.",
  },
  {
    id: "G-002",
    name: "Priya Das",
    rating: 4.6,
    tours: 28,
    status: "Active",
    lastLocation: [26.5775, 93.1711],
    lastPlace: "Kaziranga National Park",
    idType: "Aadhaar",
    idVerified: false,
    idNumber: "XXXX-XXXX-5678",
    phone: "+91-88888-22222",
    remarks: "Pending ID verification.",
  },
  {
    id: "G-003",
    name: "Rohit Sen",
    rating: 4.2,
    tours: 19,
    status: "Inactive",
    lastLocation: [24.8333, 92.7789],
    lastPlace: "Silchar Urban Area",
    idType: "Aadhaar",
    idVerified: true,
    idNumber: "XXXX-XXXX-4321",
    phone: "+91-77777-33333",
    remarks: "Inactive, last tour 2024-12-20.",
  },
  {
    id: "G-004",
    name: "Emily Chen",
    rating: 4.9,
    tours: 41,
    status: "Active",
    lastLocation: [26.9821, 94.6426],
    lastPlace: "Sivasagar Heritage Zone",
    idType: "Passport",
    idVerified: true,
    idNumber: "P1234567",
    phone: "+86-55555-33333",
    remarks: "Verified, excellent reviews.",
  },
  {
    id: "G-005",
    name: "Rajiv Kumar",
    rating: 4.5,
    tours: 22,
    status: "Active",
    lastLocation: [25.1706, 93.0176],
    lastPlace: "Haflong Hill Station",
    idType: "Aadhaar",
    idVerified: false,
    idNumber: "XXXX-XXXX-8765",
    phone: "+91-66666-44444",
    remarks: "Pending ID verification.",
  },
  {
    id: "G-006",
    name: "Fatima Zahra",
    rating: 4.7,
    tours: 25,
    status: "Active",
    lastLocation: [27.4728, 94.912],
    lastPlace: "Dibrugarh Riverside",
    idType: "Passport",
    idVerified: true,
    idNumber: "P7654321",
    phone: "+212-555-666-777",
    remarks: "Verified, good feedback.",
  },
  {
    id: "G-007",
    name: "Carlos Mendes",
    rating: 4.3,
    tours: 15,
    status: "Active",
    lastLocation: [26.6338, 92.8],
    lastPlace: "Tezpur Cultural Zone",
    idType: "Passport",
    idVerified: false,
    idNumber: "P9988776",
    phone: "+55-98765-43210",
    remarks: "Pending ID verification.",
    documents: [
      { name: "Passport", url: "#" },
      { name: "Tour Guide License", url: "#" },
    ],
  },
  {
    id: "G-008",
    name: "Anna Ivanova",
    rating: 4.7,
    tours: 21,
    status: "Active",
    lastLocation: [26.75, 94.2167],
    lastPlace: "Jorhat Tea Gardens",
    idType: "Passport",
    idVerified: true,
    idNumber: "P1122334",
    phone: "+7-12345-67890",
    remarks: "Verified, excellent reviews.",
    documents: [
      { name: "Passport", url: "#" },
      { name: "Tour Guide License", url: "#" },
      { name: "Vaccination Certificate", url: "#" },
    ],
  },
  {
    id: "G-009",
    name: "Mohammed Al-Farsi",
    rating: 4.1,
    tours: 12,
    status: "Inactive",
    lastLocation: [24.8333, 92.8333],
    lastPlace: "Barak Valley",
    idType: "Passport",
    idVerified: false,
    idNumber: "P5566778",
    phone: "+968-55555-11111",
    remarks: "Inactive, last tour 2024-11-10.",
    documents: [{ name: "Passport", url: "#" }],
  },
  {
    id: "G-010",
    name: "Priya Nair",
    rating: 4.6,
    tours: 18,
    status: "Active",
    lastLocation: [25.84, 93.43],
    lastPlace: "Diphu Eco Zone",
    idType: "Aadhaar",
    idVerified: true,
    idNumber: "XXXX-XXXX-3344",
    phone: "+91-66666-33333",
    remarks: "Verified, good feedback.",
    documents: [
      { name: "Aadhaar Card", url: "#" },
      { name: "Vaccination Certificate", url: "#" },
    ],
  },
  {
    id: "G-011",
    name: "David Lee",
    rating: 4.4,
    tours: 14,
    status: "Active",
    lastLocation: [27.4926, 95.3537],
    lastPlace: "Tinsukia Eco Park",
    idType: "Passport",
    idVerified: false,
    idNumber: "P2233445",
    phone: "+1-222-333-4444",
    remarks: "Pending ID verification.",
    documents: [
      { name: "Passport", url: "#" },
      { name: "Tour Guide License", url: "#" },
    ],
  },
  {
    id: "G-012",
    name: "Fatima Zahra",
    rating: 4.5,
    tours: 20,
    status: "Active",
    lastLocation: [26.4826, 90.561],
    lastPlace: "Bongaigaon Urban Zone",
    idType: "Passport",
    idVerified: true,
    idNumber: "P3344556",
    phone: "+212-555-666-777",
    remarks: "Verified, good feedback.",
    documents: [
      { name: "Passport", url: "#" },
      { name: "Tour Guide License", url: "#" },
      { name: "Vaccination Certificate", url: "#" },
    ],
  },
];

const statusSummary = [
  {
    label: "Active",
    color: "bg-green-500",
    value: dummyGuides.filter((g) => g.status === "Active").length,
  },
  {
    label: "Inactive",
    color: "bg-gray-400",
    value: dummyGuides.filter((g) => g.status === "Inactive").length,
  },
];

// Dynamically import GuideMap (client-only)
const GuideMap = dynamic(() => import("./GuideMap"), { ssr: false });

export default function GuideDataPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("Guide Data");
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Graph data for status
  const totalGuides = dummyGuides.length;
  const activeGuides = dummyGuides.filter((g) => g.status === "Active").length;
  const inactiveGuides = dummyGuides.filter(
    (g) => g.status === "Inactive"
  ).length;
  const verifiedGuides = dummyGuides.filter((g) => g.idVerified).length;
  const unverifiedGuides = totalGuides - verifiedGuides;

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
          <MapIcon className="w-7 h-7 text-orange-500" />
          Guide Data
        </h1>
        <p className="text-gray-700 mb-6">
          Registered guides, their current locations, and ID verification
          status.
        </p> */}
        {/* Status Graph */}
        <div className="flex gap-8 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-lg font-bold">
              {activeGuides}
            </div>
            <span className="text-xs mt-1 text-gray-700">Active</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center text-lg font-bold">
              {inactiveGuides}
            </div>
            <span className="text-xs mt-1 text-gray-700">Inactive</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold">
              {verifiedGuides}
            </div>
            <span className="text-xs mt-1 text-gray-700">ID Verified</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-yellow-400 text-white flex items-center justify-center text-lg font-bold">
              {unverifiedGuides}
            </div>
            <span className="text-xs mt-1 text-gray-700">ID Unverified</span>
          </div>
        </div>
        {/* Map of Guide Locations */}
        <div className="bg-white border rounded-lg shadow p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <MapIcon className="w-5 h-5 text-blue-600" />
            Guide Current/Last Locations
          </h2>
          <div className="w-full h-72 rounded-lg overflow-hidden">
            {isClient && <GuideMap guides={dummyGuides} />}
          </div>
        </div>
        {/* Guide Table */}
        <div className="bg-white border rounded-lg shadow p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Guide ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Rating</th>
                <th className="p-2 text-left">Tours</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Last Place</th>
                <th className="p-2 text-left">ID Verified</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyGuides.map((g) => (
                <tr
                  key={g.id}
                  className="border-b hover:bg-orange-50 cursor-pointer"
                >
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
                  <td className="p-2">{g.lastPlace}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        g.idVerified
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {g.idVerified ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="p-2">
                    <button
                      className="text-blue-600 hover:text-orange-600 text-xs"
                      onClick={() => setSelectedGuide(g)}
                    >
                      View / Verify ID
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Guide Details Modal */}
        {selectedGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              backdropFilter: "blur(8px)",
              background: "rgba(255,255,255,0.3)",
            }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                onClick={() => setSelectedGuide(null)}
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <UserIcon className="w-6 h-6 text-orange-600" />
                {selectedGuide.name}
              </h2>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Guide ID:</span>{" "}
                {selectedGuide.id}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2 mb-2">
                <div>
                  <div className="text-xs text-gray-500">Rating</div>
                  <div className="font-bold">{selectedGuide.rating}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Tours</div>
                  <div className="font-bold">{selectedGuide.tours}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Status</div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedGuide.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedGuide.status}
                  </span>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Last Place</div>
                  <div className="font-bold">{selectedGuide.lastPlace}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="font-bold">{selectedGuide.phone}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">ID Type</div>
                  <div className="font-bold">{selectedGuide.idType}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">ID Number</div>
                  <div className="font-bold">{selectedGuide.idNumber}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">ID Verified</div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedGuide.idVerified
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {selectedGuide.idVerified ? "Yes" : "No"}
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-xs text-gray-500">Remarks</div>
                <div className="text-sm text-gray-600">
                  {selectedGuide.remarks}
                </div>
              </div>
              {/* Dummy document links */}
              <div className="mb-2">
                <div className="text-xs text-gray-500">Submitted Documents</div>
                <ul className="list-disc ml-5 text-sm text-blue-700">
                  {(
                    selectedGuide.documents || [
                      { name: selectedGuide.idType, url: "#" },
                    ]
                  ).map((doc: { name: string; url: string }, idx: number) => (
                    <li key={idx}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-orange-600"
                      >
                        {doc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {!selectedGuide.idVerified && (
                <button
                  className="mt-4 px-4 py-2 rounded bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
                  onClick={() => {
                    selectedGuide.idVerified = true;
                    setSelectedGuide({ ...selectedGuide });
                  }}
                >
                  Verify Guide ID
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        .leaflet-container {
          font-family: "Inter", sans-serif;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
      `}</style>
    </div>
  );
}
