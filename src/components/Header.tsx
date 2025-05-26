'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/authContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
  };

  return (
    <>
      {/* Header/Navigation */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-30">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Fruch Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold text-emerald-700">Fruch</h1>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            href="/"
            className="text-emerald-800 font-medium hover:text-emerald-600 transition-colors"
          >
            Beranda
          </Link>
          <Link
            href="/classify"
            className="text-emerald-800 font-medium hover:text-emerald-600 transition-colors"
          >
            Deteksi Buah
          </Link>
          
          {isAuthenticated && (
            <Link
              href="/history"
              className="text-emerald-800 font-medium hover:text-emerald-600 transition-colors"
            >
              Riwayat Scan
            </Link>
          )}
          
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="text-emerald-800 font-medium hover:text-emerald-600 transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="text-emerald-800 font-medium hover:text-emerald-600 transition-colors"
              >
                Daftar
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 bg-white/50 hover:bg-white/80 px-3 py-2 rounded-full transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user?.name?.[0] || user?.email?.[0] || "U"}
                  </span>
                </div>
                <span className="text-emerald-800 font-medium">
                  {user?.name || user?.email}
                </span>
                <svg 
                  className={`w-4 h-4 text-emerald-700 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                  <Link 
                    href="/profile" 
                    className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Lihat Profil
                    </div>
                  </Link>
                  <hr className="my-1 border-gray-200" />
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-700"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Keluar
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
        <div className="md:hidden z-50">
          <button
            onClick={toggleMenu}
            className="p-2 text-emerald-800 relative z-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-10 z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Fruch Logo"
                width={30}
                height={30}
                className="rounded-full"
              />
              <h3 className="text-xl font-bold text-emerald-700">Fruch</h3>
            </div>
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-emerald-800 font-medium hover:text-emerald-600 transition-colors py-3 px-4 hover:bg-emerald-50 rounded-lg"
              onClick={toggleMenu}
            >
              Beranda
            </Link>
            <Link
              href="/classify"
              className="text-emerald-800 font-medium hover:text-emerald-600 transition-colors py-3 px-4 hover:bg-emerald-50 rounded-lg"
              onClick={toggleMenu}
            >
              Deteksi Buah
            </Link>
            
            {isAuthenticated && (
              <Link
                href="/history"
                className="text-emerald-800 font-medium hover:text-emerald-600 transition-colors py-3 px-4 hover:bg-emerald-50 rounded-lg"
                onClick={toggleMenu}
              >
                Riwayat Scan
              </Link>
            )}
            
            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  className="text-emerald-800 font-medium hover:text-emerald-600 transition-colors py-3 px-4 hover:bg-emerald-50 rounded-lg"
                  onClick={toggleMenu}
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="text-emerald-800 font-medium hover:text-emerald-600 transition-colors py-3 px-4 hover:bg-emerald-50 rounded-lg"
                  onClick={toggleMenu}
                >
                  Daftar
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 py-3 px-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {user?.name?.[0] || user?.email?.[0] || "U"}
                    </span>
                  </div>
                  <span className="text-emerald-800 font-medium">
                    {user?.name || user?.email}
                  </span>
                </div>
                <Link
                  href="/profile"
                  className="text-emerald-800 font-medium hover:text-emerald-600 transition-colors py-3 px-4 hover:bg-emerald-50 rounded-lg flex items-center"
                  onClick={toggleMenu}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Lihat Profil
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="text-red-600 font-medium hover:text-red-700 transition-colors py-3 px-4 hover:bg-red-50 rounded-lg text-left flex items-center w-full"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Keluar
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}