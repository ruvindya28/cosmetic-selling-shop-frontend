import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaBoxOpen, FaUserCircle } from "react-icons/fa";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const token = localStorage.getItem("token");
  const menuRef = useRef();

  useEffect(() => {
    if (token) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null));
    }
  }, [token]);

  // Hide dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowMenu(false);
    window.location.href = "/login";
  };

  return (
    <div className="relative z-50">
      {/* User Icon */}
      <button
        onClick={() => setShowMenu(prev => !prev)}
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full 
                   bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 
                   shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105
                   focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
                   border-2 border-white/20"
        aria-haspopup="true"
        aria-expanded={showMenu}
      >
        <FaUser className="text-white text-sm sm:text-base md:text-lg cursor-pointer" />
      </button>

      {/* Dropdown */}
      {showMenu && (
        <div
          ref={menuRef}
          onMouseLeave={() => setShowMenu(false)}
          className="absolute right-0 mt-2 sm:mt-3 
                     w-44 sm:w-48 
                     rounded-lg bg-white/95 backdrop-blur-sm
                     shadow-xl border border-gray-200/50
                     transition-all duration-300 transform origin-top-right
                     scale-100 opacity-100 translate-y-0"
        >
          {!user ? (
            <div className="p-2 sm:p-3">
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setShowMenu(false)}
                  className="w-full text-center bg-gradient-to-r from-pink-500 to-rose-500 
                             text-white py-2 sm:py-2.5 rounded-md hover:from-pink-600 hover:to-rose-600 
                             font-medium transition-all duration-200 transform hover:scale-[1.02]
                             shadow-md hover:shadow-lg text-xs sm:text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setShowMenu(false)}
                  className="w-full text-center border-2 border-pink-500 text-pink-600 
                             py-2 sm:py-2.5 rounded-md hover:bg-pink-50 hover:border-pink-600
                             font-medium transition-all duration-200 transform hover:scale-[1.02]
                             text-xs sm:text-sm"
                >
                  Register
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-2">
              {/* Header */}
              <div className="px-3 py-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 
                                 flex items-center justify-center">
                    <FaUserCircle className="text-white text-sm sm:text-base" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                      {user.name || user.email || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Links */}
              <div className="py-1">
                <Link
                  to="/profile"
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm text-gray-700 
                             hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 
                             hover:text-pink-700 transition-all duration-200 group"
                  role="menuitem"
                >
                  <FaUser className="text-pink-500 group-hover:text-pink-600 text-xs" />
                  <span className="font-medium">Profile</span>
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm text-gray-700 
                             hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 
                             hover:text-pink-700 transition-all duration-200 group"
                  role="menuitem"
                >
                  <FaBoxOpen className="text-pink-500 group-hover:text-pink-600 text-xs" />
                  <span className="font-medium">Orders</span>
                </Link>

                <div className="border-t border-gray-100 my-1"></div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs sm:text-sm text-red-600 
                             hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50
                             hover:text-red-700 transition-all duration-200 group"
                  role="menuitem"
                >
                  <FaSignOutAlt className="text-red-500 group-hover:text-red-600 text-xs" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
