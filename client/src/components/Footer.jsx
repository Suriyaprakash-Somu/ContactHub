import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-top py-2 mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <span className="text-muted small">
          © {new Date().getFullYear()} ContactHub. All rights reserved.
        </span>
        <span className="text-muted small d-flex align-items-center">
          Made with <Heart size={16} className="mx-1 text-danger" /> by ContactHub
        </span>
      </div>
    </footer>
  );
};

export default Footer;
