import { Home, Compass, ThumbsUp, History } from "lucide-react";
import "../styles/sidebar.scss";
import { NavLink } from "react-router";

const Sidebar = () => {
  const navItems = [
    { icon: <Home size={20} />, label: "Home", active: true, path: "/" },
    { icon: <Compass size={20} />, label: "Explore", path: "/explore" },
    { icon: <History size={20} />, label: "History", path: "/history" },
    { icon: <ThumbsUp size={20} />, label: "Liked Song", path: "/liked" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2 className="logo-text">Gandharvika</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="footer-text">Emotion based music</p>
      </div>
    </aside>
  );
};

export default Sidebar;
