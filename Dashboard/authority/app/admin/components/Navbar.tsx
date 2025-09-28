import Image from "next/image";
import Link from "next/link";
import {
  UserGroupIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  HomeIcon,
  ChartBarIcon,
  MapIcon,
  ClipboardDocumentListIcon,
  DocumentMagnifyingGlassIcon,
  TrophyIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
  SignalIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  CloudIcon,
  SunIcon,
  ArrowTrendingUpIcon,
  MapPinIcon,
  PlusIcon,
  ClockIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar({
  activeMenuItem,
  setActiveMenuItem,
}: {
  activeMenuItem: string;
  setActiveMenuItem: (item: string) => void;
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();

  const mockData = {
    touristCount: 1247,
    highPriorityCount: 23,
    internationalTourists: 342,
    domesticTourists: 905,
    sosAlerts: [
      {
        id: 1,
        time: "2025-01-09 14:30",
        location: "Guwahati, Assam",
        tourist: "John Doe",
        status: "Active",
        priority: "High",
      },
      {
        id: 2,
        time: "2025-01-09 13:15",
        location: "Shillong, Meghalaya",
        tourist: "Sarah Smith",
        status: "Resolved",
        priority: "Medium",
      },
      {
        id: 3,
        time: "2025-01-09 12:45",
        location: "Kohima, Nagaland",
        tourist: "Raj Patel",
        status: "In Progress",
        priority: "High",
      },
    ],
    notifications: [
      {
        id: 1,
        type: "SOS",
        message: "New SOS alert from Guwahati",
        time: "2 mins ago",
      },
      {
        id: 2,
        type: "Weather",
        message: "Heavy rainfall warning in Shillong",
        time: "15 mins ago",
      },
      {
        id: 3,
        type: "System",
        message: "Tourist check-in at Kohima checkpoint",
        time: "32 mins ago",
      },
    ],
  };

  const navbarMenuItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Tourist Analytics", href: "/admin/tourist-analytics" },
    { name: "Guide Data", href: "/admin/guide-data" },
    { name: "User Reports", href: "/admin/user-reports" },
    { name: "E-FIRs", href: "/admin/e-firs" },
    { name: "Leaderboard", href: "/admin/leaderboard" },
  ];

  return (
    <>
      <nav className="w-full py-3 px-4 sm:px-6 flex items-center justify-between bg-white/95 backdrop-blur-sm shadow-lg border-t border-orange-500 sticky top-0 z-50">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link href="/" passHref legacyBehavior>
            <a>
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-orange-500 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/logoNew.jpg"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="w-full h-full object-contain"
                />
              </div>
            </a>
          </Link>
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 bg-white/95 rounded-full flex items-center justify-center overflow-visible">
            <Image
              src="/ASSAM.png"
              alt="Emblem"
              width={50}
              height={50}
              className="w-full h-full object-contain brightness-150"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-md sm:text-xl lg:text-2xl font-bold text-gray-900 font-sans tracking-tight">
              Assam
            </h1>
            <h6 className="text-xs md:text-sm font-medium text-gray-900 font-sans tracking-tight">
              Travel Authority
            </h6>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
          {navbarMenuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-gray-900 hover:text-orange-600 transition-colors mx-3 xl:mx-4 relative after:absolute after:bottom-0 after:left-0 after:bg-orange-600 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 font-medium font-sans text-sm ${
                activeMenuItem === item.name
                  ? "text-orange-600 after:w-full"
                  : ""
              } flex items-center gap-2`}
              onClick={() => setActiveMenuItem(item.name)}
            >
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative">
            <button
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <BellIcon className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {mockData.notifications.length}
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border z-50">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {mockData.notifications.map((notif: any) => (
                    <div
                      key={notif.id}
                      className="p-4 border-b hover:bg-gray-50"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">
                          {notif.type === "SOS" ? (
                            <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                          ) : notif.type === "Weather" ? (
                            <CloudIcon className="w-5 h-5 text-blue-500" />
                          ) : (
                            <InformationCircleIcon className="w-5 h-5 text-gray-500" />
                          )}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notif.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-lg border-2 border-red-500 font-semibold transition-all transform hover:scale-105 font-sans text-xs sm:text-md flex items-center gap-2"
            onClick={() => router.push("/")}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>
      <div className="w-full h-[3px] bg-gradient-to-r from-orange-500 via-gray-300 to-gray-900"></div>
    </>
  );
}
