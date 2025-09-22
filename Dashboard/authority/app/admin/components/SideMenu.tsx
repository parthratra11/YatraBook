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
  BuildingStorefrontIcon,
  UserIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

export default function SideMenu({
  activeMenuItem,
  setActiveMenuItem,
}: {
  activeMenuItem: string;
  setActiveMenuItem: (item: string) => void;
}) {
  const sideMenuItems = [
    {
      name: "Dashboard",
      icon: <ChartBarIcon className="w-5 h-5" />,
      href: "/admin",
    },
    {
      name: "SOS Notifications",
      icon: <ExclamationTriangleIcon className="w-5 h-5" />,
      href: "/admin/sos-notifications",
    },
    {
      name: "Tourist Analytics",
      icon: <UserGroupIcon className="w-5 h-5" />,
      href: "/admin/tourist-analytics",
    },
    {
      name: "Tourist Verification",
      icon: <DocumentCheckIcon className="w-5 h-5" />,
      href: "/admin/tourist-verification",
    },

    {
      name: "Guide Data",
      icon: <MapIcon className="w-5 h-5" />,
      href: "/admin/guide-data",
    },
    {
      name: "User Reports",
      icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
      href: "/admin/user-reports",
    },
    {
      name: "E-FIRs",
      icon: <DocumentMagnifyingGlassIcon className="w-5 h-5" />,
      href: "/admin/e-firs",
    },
    {
      name: "Leaderboard",
      icon: <TrophyIcon className="w-5 h-5" />,
      href: "/admin/leaderboard",
    },
    {
      name: "Weather Map",
      icon: <CloudIcon className="w-5 h-5" />,
      href: "/admin/weather-map",
    },
    {
      name: "Tourist Record",
      icon: <SignalIcon className="w-5 h-5" />,
      href: "/admin/tourist-record",
    },
    {
      name: "Safe Areas",
      icon: <ShieldCheckIcon className="w-5 h-5" />,
      href: "/admin/safe-areas",
    },

    {
      name: "Amenities Map",
      icon: <BuildingStorefrontIcon className="w-5 h-5" />,
      href: "/admin/amenities",
    },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full fixed top-[80px] left-0 z-40 flex flex-col justify-between">
      <div>
        <div className="p-4">
          <nav className="space-y-2">
            {sideMenuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                  activeMenuItem === item.name
                    ? "bg-orange-500 text-white shadow-md hover:cursor-pointer"
                    : "text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
                }`}
                onClick={() => setActiveMenuItem(item.name)}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="px-4 py-3 border-t bg-gray-50 flex flex-col items-start text-xs">
          <div className="flex items-center gap-1 mb-0 text-gray-700 italic">
            <span>Logged in as:</span>
          </div>
          <div className="flex flex-row gap-1 mb-2">
            <UserIcon className="w-4 h-4" />
            <span className="font-bold text-md">admin@example.com</span>
          </div>
          <div className="flex flex-row gap-2">
            <button
              className="flex items-center gap-1 px-1 py-1 rounded bg-gray-200 text-xs text-gray-700 hover:bg-gray-300"
              style={{ fontSize: "11px" }}
              onClick={() => alert("Privileges: Full admin access (dummy)")}
            >
              <KeyIcon className="w-4 h-4" />
              View Privileges
            </button>
            <button
              className="flex items-center gap-1 px-1 py-1 rounded bg-gray-200 text-xs text-gray-700 hover:bg-gray-300"
              style={{ fontSize: "11px" }}
              onClick={() =>
                alert("Contact support at support@yatrabook.com (dummy)")
              }
            >
              <BellIcon className="w-4 h-4" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
      {/* Footer: admin info and privileges, fits in left-out space only */}
    </div>
  );
}
