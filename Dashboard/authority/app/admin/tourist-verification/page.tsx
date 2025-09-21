"use client";

import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import { useState } from "react";

const dummyTourists = [
  {
    id: "T-001",
    name: "John Doe",
    nationality: "Indian",
    idType: "Aadhaar",
    status: "Verified",
    itinerary: "Guwahati > Shillong > Cherrapunji",
    emergencyContact: "+91-99999-11111",
  },
  {
    id: "T-002",
    name: "Sarah Smith",
    nationality: "British",
    idType: "Passport",
    status: "Pending",
    itinerary: "Shillong > Mawlynnong",
    emergencyContact: "+44-12345-67890",
  },
  {
    id: "T-003",
    name: "Raj Patel",
    nationality: "Indian",
    idType: "Aadhaar",
    status: "Verified",
    itinerary: "Kohima > Dimapur",
    emergencyContact: "+91-88888-22222",
  },
];

export default function TouristVerificationPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("Tourist Verification");

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
          <DocumentCheckIcon className="w-7 h-7 text-orange-500" />
          Tourist Verification
        </h1>
        <p className="text-gray-700 mb-6">
          Digital ID verification and compliance checks for tourists.
        </p>
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
              </tr>
            </thead>
            <tbody>
              {dummyTourists.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="p-2">{t.id}</td>
                  <td className="p-2">{t.name}</td>
                  <td className="p-2">{t.nationality}</td>
                  <td className="p-2">{t.idType}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        t.status === "Verified"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-2">{t.itinerary}</td>
                  <td className="p-2">{t.emergencyContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
