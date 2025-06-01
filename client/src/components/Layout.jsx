import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Users, Map } from "lucide-react";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Contacts", icon: <Users size={18} /> },
    { path: "/map", label: "Map View", icon: <Map size={18} /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-white shadow-sm fixed-top">
        <div className="container d-flex justify-content-between align-items-center py-3">
          <Link to="/" className="text-decoration-none text-dark h5 mb-0">
            ContactHub
          </Link>
          <nav className="d-none d-md-flex gap-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link d-flex align-items-center ${
                  location.pathname === item.path
                    ? "fw-bold text-primary"
                    : "text-muted"
                }`}
              >
                <span className="me-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            className="btn btn-outline-secondary d-md-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="d-md-none bg-light border-top">
            <nav className="nav flex-column px-3 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`nav-link d-flex align-items-center ${
                    location.pathname === item.path
                      ? "fw-bold text-primary"
                      : "text-muted"
                  }`}
                >
                  <span className="me-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow-1 pt-5 mt-4">
        <div className="p-3">{children}</div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
