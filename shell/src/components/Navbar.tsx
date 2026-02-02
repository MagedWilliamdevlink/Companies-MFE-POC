"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Icons as components
function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

interface NavLinkProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

function NavLink({ children, active = false, onClick }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className="relative px-4 py-5 text-sm font-medium transition-all duration-200 text-gray-700 hover:text-blue-600"
    >
      {children}
      {/* Active underline */}
      {active && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-1 bg-blue-600 rounded-t-full" />
      )}
    </button>
  );
}

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const getActiveNav = () => {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/services") || pathname.startsWith("/service-"))
      return "services";
    if (pathname.startsWith("/maps")) return "maps";
    return "";
  };

  return (
    <nav className="bg-white border-b border-gray-100 min-h-[5vh] z-50 shadow-sm">
      <div className="max-w-[1920px] mx-auto px-4">
        <div className="flex items-center justify-between h-16" dir="rtl">
          {/* Right Section - Logos & Navigation */}
          <div className="flex items-center gap-6">
            {/* Digital Egypt Logo */}
            <div className="">
              <Image
                src="/images/Logo.png"
                alt="مصر الرقمية"
                width={61}
                height={61}
              />
            </div>

            {/* MCIT Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                src="/images/MCIT Logo.png"
                alt="وزارة الاتصالات وتكنولوجيا المعلومات"
                width={100}
                height={100}
              />
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1 mr-4">
              <NavLink
                active={getActiveNav() === "home"}
                onClick={() => router.push("/")}
              >
                الرئيسية
              </NavLink>
              <NavLink
                active={getActiveNav() === "services"}
                onClick={() => router.push("/services")}
              >
                الخدمات
              </NavLink>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-md mx-8 hidden lg:block"></div>

          {/* Left Section - Actions */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                dir="rtl"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
            </div>
            {/* Language Selector */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-all duration-200">
              <GlobeIcon />
              <span>English</span>
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-all duration-200">
              <BellIcon />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <Link href={"/my-requests"}>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all duration-200">
                <UserIcon />
                <span className="text-sm font-medium">أهلا، محمد</span>
                <ChevronDownIcon />
              </button>
            </Link>

            {/* More Menu */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-all duration-200">
              <MenuIcon />
              <span className="text-sm hidden sm:inline">المزيد</span>
            </button>

            {/* Settings */}
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-all duration-200">
              <SettingsIcon />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
