import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LogoutUser } from "../services/authService";
import { Logout } from "../redux/slices/authSlice";

export default function AccountDropdown({ onMouseEnter, onMouseLeave }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("user");

  const handleLogout = async () => {
    try {
      await LogoutUser();
      dispatch(Logout());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div
      id="login-tooltip"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-[80px] right-[9%] bg-white shadow-xl p-6 w-96 z-50 rounded-b-md"
    >
      {/* Tooltip arrow */}
      <div className="absolute -top-2 right-[8.5rem] w-4 h-4 bg-white rotate-45"></div>

      {isAuthenticated ? (
        <div className="flex flex-col space-y-2 mb-4">
          <Link to="/login" className="text-blue-600 hover:underline text-sm text-center">
            Switch Accounts
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline text-sm text-center"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <>
          <Link to={"/login"}>
            <button className="w-full bg-[#FA801D] py-2 font-semibold rounded cursor-pointer">
              Sign In
            </button>
          </Link>
          <p className="text-sm mt-2 text-gray-700 text-center">
            New customer?{" "}
            <Link to="/register" className="text-blue-600 underline">
              Start here.
            </Link>
          </p>
        </>
      )}

      <hr className="my-4 border-t border-gray-300" style={{ borderTopWidth: "0.3px" }} />

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <h4 className="font-bold mb-2">Your Lists</h4>
          <ul className="space-y-1">
            <li><Link className="hover:underline" to="/">Create a List</Link></li>
            <li><Link className="hover:underline" to="/">Find a List or Registry</Link></li>
            <li><Link className="hover:underline" to="/">Your Saved Books</Link></li>
          </ul>
        </div>
        <div className="border-l border-gray-300 pl-6">
          <h4 className="font-bold mb-2">Your Account</h4>
          <ul className="space-y-1">
            <li><Link className="hover:underline" to="/">Account</Link></li>
            <li><Link className="hover:underline" to="/">Orders</Link></li>
            <li><Link className="hover:underline" to="/">Recommendations</Link></li>
            <li><Link className="hover:underline" to="/">Browsing History</Link></li>
            <li><Link className="hover:underline" to="/">Watchlist</Link></li>
            <li><Link className="hover:underline" to="/">Video Purchases & Rentals</Link></li>
            <li><Link className="hover:underline" to="/">Kindle Unlimited</Link></li>
            <li><Link className="hover:underline" to="/">Content & Devices</Link></li>
            <li><Link className="hover:underline" to="/">Subscribe & Save Items</Link></li>
            <li><Link className="hover:underline" to="/">Memberships & Subscriptions</Link></li>
            <li><Link className="hover:underline" to="/">Music Library</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}