import { Link, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import UserDrawer from "../../features/auth/UserDrawer";
import { ChevronRight, User } from "lucide-react";
import { LogoutUser } from "../../services/authService";
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/slices/authSlice";

export default function SignInButton({ user, showTooltip, setShowTooltip, onSignOut }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [drawerOpen]);

  const openDrawer = () => {
    setIsVisible(true);
    requestAnimationFrame(() => setDrawerOpen(true));
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setIsVisible(false), 300);
  };

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
    <div className="flex items-center justify-between">
      {/* Large screens */}
      <div className="xs:hidden lg:flex justify-center items-center">
        <Link
          to="/login"
          className="flex flex-col p-2 lg:border-2 lg:border-transparent lg:hover:border-[#FDFDFD]"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <p className="text-[14px] font-normal">
            Hello, {user ? user.name ?? "User" : "sign in"}
          </p>
          <span className="font-semibold">Account & Lists</span>
        </Link>
      </div>

      {/* Mobile */}
      <div className="xs:flex sm:hidden">
        {!user ? (
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm p-2 rounded-md lg:hover:bg-gray-50 transition-colors"
          >
            <span className="text-[18px] font-medium text-white">Sign in</span>
            <ChevronRight className="xs:w-4 xs:h-4 w-4 h-4" />
            <User className="xs:w-7 xs:h-7 w-4 h-4" />
          </Link>
        ) : (
          <>
            <button
              aria-expanded={drawerOpen}
              aria-controls="user-drawer"
              onClick={openDrawer}
              className="flex items-center text-sm mr-2"
            >
              <span className="text-[18px] font-medium">{user.name ?? "User"}</span>
              <ChevronRight className="xs:w-4 xs:h-4 w-4 h-4" />
              <User className="xs:w-7 xs:h-7 w-4 h-4" />
            </button>

            {/* Drawer + Overlay */}
            {isVisible &&
              ReactDOM.createPortal(
                <>
                  <div
                    className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0"
                      }`}
                    onClick={closeDrawer}
                  />
                  <UserDrawer
                    user={user}
                    drawerOpen={drawerOpen}
                    closeDrawer={closeDrawer}
                    navigate={navigate}
                    onSignOut={handleLogout}
                  />
                </>,
                document.body
              )}
          </>
        )}
      </div>
    </div>
  );
}
