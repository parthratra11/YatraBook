"use client";

import {
  DocumentCheckIcon,
  UserIcon,
  PhoneIcon,
  IdentificationIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import { useState } from "react";

// Dummy data for tourists (more realistic and detailed)
const dummyTourists = [
  {
    id: "T-001",
    name: "John Doe",
    nationality: "Indian",
    idType: "Aadhaar",
    status: "Verified",
    itinerary: "Guwahati > Shillong > Cherrapunji",
    emergencyContact: "+91-99999-11111",
    age: 32,
    gender: "Male",
    documents: ["Aadhaar Card", "Vaccination Certificate"],
    lastCheck: "2025-01-08",
    remarks: "Compliant, no issues.",
  },
  {
    id: "T-002",
    name: "Sarah Smith",
    nationality: "British",
    idType: "Passport",
    status: "Pending",
    itinerary: "Shillong > Mawlynnong",
    emergencyContact: "+44-12345-67890",
    age: 28,
    gender: "Female",
    documents: ["Passport", "Visa"],
    lastCheck: "2025-01-07",
    remarks: "Pending visa verification.",
  },
  {
    id: "T-003",
    name: "Raj Patel",
    nationality: "Indian",
    idType: "Aadhaar",
    status: "Verified",
    itinerary: "Kohima > Dimapur",
    emergencyContact: "+91-88888-22222",
    age: 35,
    gender: "Male",
    documents: ["Aadhaar Card"],
    lastCheck: "2025-01-06",
    remarks: "Compliant, no issues.",
  },
  {
    id: "T-004",
    name: "Emily Chen",
    nationality: "Chinese",
    idType: "Passport",
    status: "Under Investigation",
    itinerary: "Guwahati > Kaziranga",
    emergencyContact: "+86-55555-33333",
    age: 29,
    gender: "Female",
    documents: ["Passport", "Visa"],
    lastCheck: "2025-01-05",
    remarks: "Document mismatch under review.",
  },
  {
    id: "T-005",
    name: "Amit Singh",
    nationality: "Indian",
    idType: "Aadhaar",
    status: "Verified",
    itinerary: "Tezpur > Jorhat",
    emergencyContact: "+91-77777-44444",
    age: 40,
    gender: "Male",
    documents: ["Aadhaar Card", "Vaccination Certificate"],
    lastCheck: "2025-01-04",
    remarks: "Compliant, no issues.",
  },
  {
    id: "T-006",
    name: "Carlos Mendes",
    nationality: "Brazilian",
    idType: "Passport",
    status: "Pending",
    itinerary: "Guwahati > Kaziranga > Jorhat",
    emergencyContact: "+55-98765-43210",
    age: 36,
    gender: "Male",
    documents: ["Passport", "Visa"],
    lastCheck: "2025-01-03",
    remarks: "Pending visa verification.",
  },
  {
    id: "T-007",
    name: "Anna Ivanova",
    nationality: "Russian",
    idType: "Passport",
    status: "Verified",
    itinerary: "Tezpur > Sivasagar",
    emergencyContact: "+7-12345-67890",
    age: 27,
    gender: "Female",
    documents: ["Passport", "Vaccination Certificate"],
    lastCheck: "2025-01-02",
    remarks: "Compliant, no issues.",
  },
  {
    id: "T-008",
    name: "Mohammed Al-Farsi",
    nationality: "Omani",
    idType: "Passport",
    status: "Under Investigation",
    itinerary: "Silchar > Barak Valley",
    emergencyContact: "+968-55555-11111",
    age: 41,
    gender: "Male",
    documents: ["Passport"],
    lastCheck: "2025-01-01",
    remarks: "Document mismatch under review.",
  },
  {
    id: "T-009",
    name: "Priya Nair",
    nationality: "Indian",
    idType: "Aadhaar",
    status: "Verified",
    itinerary: "Diphu > Haflong",
    emergencyContact: "+91-66666-33333",
    age: 30,
    gender: "Female",
    documents: ["Aadhaar Card", "Vaccination Certificate"],
    lastCheck: "2025-01-01",
    remarks: "Compliant, no issues.",
  },
  {
    id: "T-010",
    name: "David Lee",
    nationality: "American",
    idType: "Passport",
    status: "Pending",
    itinerary: "Dibrugarh > Tinsukia",
    emergencyContact: "+1-222-333-4444",
    age: 38,
    gender: "Male",
    documents: ["Passport", "Visa"],
    lastCheck: "2025-01-01",
    remarks: "Pending visa verification.",
  },
  {
    id: "T-011",
    name: "Fatima Zahra",
    nationality: "Moroccan",
    idType: "Passport",
    status: "Verified",
    itinerary: "Goalpara > Bongaigaon",
    emergencyContact: "+212-555-666-777",
    age: 34,
    gender: "Female",
    documents: ["Passport", "Vaccination Certificate"],
    lastCheck: "2025-01-01",
    remarks: "Compliant, no issues.",
  },
  {
    id: "T-012",
    name: "Liam O'Connor",
    nationality: "Irish",
    idType: "Passport",
    status: "Under Investigation",
    itinerary: "Nagaon > Sivasagar",
    emergencyContact: "+353-123-456-789",
    age: 29,
    gender: "Male",
    documents: ["Passport"],
    lastCheck: "2025-01-01",
    remarks: "Document mismatch under review.",
  },
  {
    id: "T-013",
    name: "Meera Sharma",
    nationality: "Indian",
    idType: "Aadhaar",
    status: "Verified",
    itinerary: "Jorhat > Majuli",
    emergencyContact: "+91-55555-88888",
    age: 26,
    gender: "Female",
    documents: ["Aadhaar Card"],
    lastCheck: "2025-01-01",
    remarks: "Compliant, no issues.",
  },
  {
    id: "T-014",
    name: "Tomoko Suzuki",
    nationality: "Japanese",
    idType: "Passport",
    status: "Pending",
    itinerary: "Tezpur > Kaziranga",
    emergencyContact: "+81-1234-5678",
    age: 31,
    gender: "Female",
    documents: ["Passport", "Visa"],
    lastCheck: "2025-01-01",
    remarks: "Pending visa verification.",
  },
  {
    id: "T-015",
    name: "Ahmed El-Sayed",
    nationality: "Egyptian",
    idType: "Passport",
    status: "Verified",
    itinerary: "Diphu > Haflong",
    emergencyContact: "+20-555-444-333",
    age: 37,
    gender: "Male",
    documents: ["Passport", "Vaccination Certificate"],
    lastCheck: "2025-01-01",
    remarks: "Compliant, no issues.",
  },
  {
    id: "T-016",
    name: "Linda Müller",
    nationality: "German",
    idType: "Passport",
    status: "Pending",
    itinerary: "Guwahati > Sivasagar",
    emergencyContact: "+49-123-456789",
    age: 33,
    gender: "Female",
    documents: ["Passport", "Visa"],
    lastCheck: "2025-01-01",
    remarks: "Pending visa verification.",
  },
  {
    id: "T-017",
    name: "Santiago Lopez",
    nationality: "Spanish",
    idType: "Passport",
    status: "Verified",
    itinerary: "Kaziranga > Jorhat",
    emergencyContact: "+34-987-654-321",
    age: 39,
    gender: "Male",
    documents: ["Passport", "Vaccination Certificate"],
    lastCheck: "2025-01-01",
    remarks: "Compliant, no issues.",
  },
  {
    id: "T-018",
    name: "Olga Petrova",
    nationality: "Russian",
    idType: "Passport",
    status: "Under Investigation",
    itinerary: "Silchar > Barak Valley",
    emergencyContact: "+7-555-123-456",
    age: 42,
    gender: "Female",
    documents: ["Passport"],
    lastCheck: "2025-01-01",
    remarks: "Document mismatch under review.",
  },
  {
    id: "T-019",
    name: "Arjun Mehta",
    nationality: "Indian",
    idType: "Aadhaar",
    status: "Verified",
    itinerary: "Diphu > Haflong",
    emergencyContact: "+91-77777-99999",
    age: 29,
    gender: "Male",
    documents: ["Aadhaar Card", "Vaccination Certificate"],
    lastCheck: "2025-01-01",
    remarks: "Compliant, no issues.",
  },
  {
    id: "T-020",
    name: "Sophia Rossi",
    nationality: "Italian",
    idType: "Passport",
    status: "Pending",
    itinerary: "Dibrugarh > Tinsukia",
    emergencyContact: "+39-123-456-789",
    age: 36,
    gender: "Female",
    documents: ["Passport", "Visa"],
    lastCheck: "2025-01-01",
    remarks: "Pending visa verification.",
  },
];

const statusSummary = [
  {
    label: "Verified",
    color: "bg-green-500",
    value: dummyTourists.filter((t) => t.status === "Verified").length,
  },
  {
    label: "Pending",
    color: "bg-yellow-500",
    value: dummyTourists.filter((t) => t.status === "Pending").length,
  },
  {
    label: "Under Investigation",
    color: "bg-orange-500",
    value: dummyTourists.filter((t) => t.status === "Under Investigation")
      .length,
  },
];

export default function TouristVerificationPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("Tourist Verification");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedTourist, setSelectedTourist] = useState<any>(null);

  // Filter tourists by search and status
  const filteredTourists = dummyTourists.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.nationality.toLowerCase().includes(search.toLowerCase()) ||
      t.itinerary.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || t.status === filterStatus;
    return matchesSearch && matchesStatus;
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
        {/* <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <DocumentCheckIcon className="w-7 h-7 text-orange-500" />
          Tourist Verification
        </h1>
        <p className="text-gray-700 mb-6">
          Digital ID verification and compliance checks for tourists. Click on a
          tourist for full details.
        </p> */}
        {/* Status Summary */}
        <div className="flex gap-6 mb-6">
          {statusSummary.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.color} text-white font-bold`}
              >
                {stat.value}
              </div>
              <span className="text-xs mt-1 text-gray-700">{stat.label}</span>
            </div>
          ))}
        </div>
        {/* Search and Filter */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name, ID, nationality, itinerary..."
            className="border px-2 py-1 rounded text-sm w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border px-2 py-1 rounded text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Under Investigation">Under Investigation</option>
          </select>
        </div>
        {/* Tourist Table */}
        <div className="bg-white border rounded-lg shadow p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Tourist ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Nationality</th>
                <th className="p-2 text-left">ID Type</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Itinerary</th>
                <th className="p-2 text-left">Emergency Contact</th>
                <th className="p-2 text-left">Last Check</th>
              </tr>
            </thead>
            <tbody>
              {filteredTourists.map((t) => (
                <tr
                  key={t.id}
                  className="border-b cursor-pointer hover:bg-orange-50"
                  onClick={() => setSelectedTourist(t)}
                >
                  <td className="p-2">{t.id}</td>
                  <td className="p-2">{t.name}</td>
                  <td className="p-2">{t.nationality}</td>
                  <td className="p-2">{t.idType}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        t.status === "Verified"
                          ? "bg-green-100 text-green-800"
                          : t.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-2">{t.itinerary}</td>
                  <td className="p-2">{t.emergencyContact}</td>
                  <td className="p-2">{t.lastCheck}</td>
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
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                onClick={() => setSelectedTourist(null)}
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <UserIcon className="w-6 h-6 text-orange-600" />
                {selectedTourist.name}
              </h2>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Tourist ID:</span>{" "}
                {selectedTourist.id}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2 mb-2">
                <div>
                  <div className="text-xs text-gray-500">Nationality</div>
                  <div className="font-bold">{selectedTourist.nationality}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Gender</div>
                  <div className="font-bold">{selectedTourist.gender}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Age</div>
                  <div className="font-bold">{selectedTourist.age}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">ID Type</div>
                  <div className="font-bold">{selectedTourist.idType}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Status</div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedTourist.status === "Verified"
                        ? "bg-green-100 text-green-800"
                        : selectedTourist.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {selectedTourist.status}
                  </span>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Last Check</div>
                  <div className="font-bold">{selectedTourist.lastCheck}</div>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-xs text-gray-500">Itinerary</div>
                <div className="font-bold">{selectedTourist.itinerary}</div>
              </div>
              <div className="mb-2">
                <div className="text-xs text-gray-500">Emergency Contact</div>
                <div className="font-bold flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-blue-600" />
                  {selectedTourist.emergencyContact}
                </div>
              </div>
              <div className="mb-2">
                <div className="text-xs text-gray-500">Documents</div>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {selectedTourist.documents.map((doc: string, idx: number) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <div className="text-xs text-gray-500">Remarks</div>
                <div className="text-sm text-gray-600">
                  {selectedTourist.remarks}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
