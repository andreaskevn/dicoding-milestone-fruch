"use client";

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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
      document.body.style.overflow = "auto";
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
      <header className="px-4 py-6 flex sticky top-0 backdrop-blur-sm bg-white/30 shadow z-30">
        <div className="mx-auto container flex justify-between items-center gap-4">
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
              className="text-emerald-800 font-bold hover:text-emerald-600 transition-colors"
            >
              Beranda
            </Link>
            <Link
              href="/classify"
              className="text-emerald-800 font-bold hover:text-emerald-600 transition-colors"
            >
              Deteksi Buah
            </Link>

            {isAuthenticated && (
              <Link
                href="/history"
                className="text-emerald-800 font-bold hover:text-emerald-600 transition-colors"
              >
                Riwayat Scan
              </Link>
            )}

            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  className="text-white font-bold transition-colors bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-xl"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="text-emerald-800 font-bold hover:text-white border-2 border-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-xl transition-colors"
                >
                  Daftar
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-full transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-bold text-sm">
                        {user?.name?.[0] || user?.email?.[0] || "U"}
                      </span>
                    </div>
                    <div className="min-w-0 flex flex-col items-start">
                      <p
                        className="text-white text-sm font-semibold truncate max-w-[160px]"
                        title={user?.name}
                      >
                        {user?.name}
                      </p>
                      <p
                        className="text-white text-xs italic truncate max-w-[160px]"
                        title={user?.email}
                      >
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <svg
                    className={`w-4 h-4 text-white transition-transform ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100 animate-fadeInDown animate-fadeInUp">
                    <Link
                      href="/users"
                      className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 ease-in-out transform hover:translate-x-1"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 transition-transform duration-200 ease-in-out group-hover:scale-110"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Lihat Profil
                      </div>
                    </Link>
                    <hr className="my-1 border-gray-200 animate-fadeIn" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 ease-in-out transform hover:translate-x-1"
                    >
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 transition-transform duration-200 ease-in-out group-hover:scale-110"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Keluar
                      </div>
                    </button>
                  </div>
                )}
                <style jsx>{`
                  @keyframes fadeInDown {
                    from {
                      opacity: 0;
                      transform: translateY(-10px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }

                  @keyframes fadeInUp {
                    from {
                      opacity: 0;
                      transform: translateY(0);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(-10px);
                    }
                  }

                  @keyframes fadeIn {
                    from {
                      opacity: 0;
                    }
                    to {
                      opacity: 1;
                    }
                  }

                  .animate-fadeInDown {
                    animation: fadeInDown 0.3s ease-out;
                  }

                  .animate-fadeInUp {
                    animation: fadeInDown 0.3s ease-out;
                  }

                  .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                  }
                `}</style>
              </div>
            )}
          </nav>
        </div>

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
            {!isAuthenticated ? (
              <></>
            ) : (
              <>
                <div className="flex items-center gap-2 py-3 px-4 bg-emerald-600 rounded-xl">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0">
                    <span className="text-emerald-600 font-bold text-sm">
                      {user?.name?.[0] || user?.email?.[0] || "U"}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-white font-bold text-sm truncate max-w-[160px] sm:max-w-xs md:max-w-sm">
                      {user?.name}
                    </span>
                    <span className="text-white font-medium text-xs italic -mt-0.5 truncate max-w-[160px] sm:max-w-xs md:max-w-sm">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </>
            )}
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
                <Link
                  href="/users"
                  className="text-emerald-800 font-medium hover:text-emerald-600 transition-colors py-3 px-4 hover:bg-emerald-50 rounded-lg flex items-center"
                  onClick={toggleMenu}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
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
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
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
