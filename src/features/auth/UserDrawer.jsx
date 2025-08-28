import { menuItems } from "../../constants";

export default function UserDrawer({ user, drawerOpen, closeDrawer, navigate, onSignOut }) {
  const items = menuItems(closeDrawer, onSignOut, navigate);

  return (
    <aside
      className={`fixed top-0 right-0 w-72 h-screen z-50 transform transition-transform duration-300 ease-out 
        bg-white flex flex-col 
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-5 px-4 border-b border-gray-200 bg-[#242f40] flex-shrink-0">
        <p className="text-[20px] font-semibold text-white">
          Hello, {user.name ?? "User"}
        </p>
        <button
          onClick={closeDrawer}
          aria-label="Close"
          className="text-white text-3xl font-bold"
        >
          ✕
        </button>
      </div>

      {/* Menu */}
      <ul className="flex-1 overflow-y-auto p-3 space-y-2">
        {items.map(({ label, onClick, textClass = "text-gray-800" }) => (
          <li key={label}>
            <button
              onClick={onClick}
              className={`w-full flex justify-between items-center p-3 rounded-md bg-white hover:bg-gray-50 shadow-sm ${textClass}`}
            >
              <span>{label}</span>
              <span>›</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
