"use client";

import { CloudIcon } from "@heroicons/react/24/outline";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import { useState } from "react";

const dummyWeather = [
  { location: "Guwahati", temp: "24°C", humidity: "78%", wind: "12 km/h SW" },
  { location: "Shillong", temp: "18°C", humidity: "82%", wind: "10 km/h NE" },
  { location: "Kohima", temp: "21°C", humidity: "75%", wind: "8 km/h NW" },
  { location: "Agartala", temp: "26°C", humidity: "80%", wind: "14 km/h SE" },
];

export default function WeatherMapPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("Weather Map");
  const [filter, setFilter] = useState("All");

  // Unique locations for filter
  const locations = ["All", ...dummyWeather.map((w) => w.location)];

  // Filtered weather data
  const filteredWeather =
    filter === "All"
      ? dummyWeather
      : dummyWeather.filter((w) => w.location === filter);

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
          <CloudIcon className="w-7 h-7 text-blue-500" />
          Weather & Climate Map
        </h1>
        <p className="text-gray-700 mb-6">
          Live weather, climate, and environmental data for planning and
          response.
        </p>
        {/* Filter Dropdown */}
        <div className="mb-4 flex items-center gap-2">
          <label
            htmlFor="weather-location"
            className="text-sm font-medium text-gray-700"
          >
            Filter by location:
          </label>
          <select
            id="weather-location"
            className="border rounded px-2 py-1 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        {/* Weather Map Section */}
        <div className="bg-white border rounded-lg shadow p-4 mb-6">
          <div className="w-full h-96 rounded-lg overflow-hidden">
            <iframe
              src="/map/enhanced_weather_map_assam.html"
              title="Weather Map"
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
        {/* Weather Table */}
        <div className="bg-white border rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Weather Station Data</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-left">Temperature</th>
                <th className="p-2 text-left">Humidity</th>
                <th className="p-2 text-left">Wind</th>
              </tr>
            </thead>
            <tbody>
              {filteredWeather.map((w) => (
                <tr key={w.location} className="border-b">
                  <td className="p-2">{w.location}</td>
                  <td className="p-2">{w.temp}</td>
                  <td className="p-2">{w.humidity}</td>
                  <td className="p-2">{w.wind}</td>
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
