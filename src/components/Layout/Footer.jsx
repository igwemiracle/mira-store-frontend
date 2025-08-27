import React from 'react';
import { ChevronUp } from 'lucide-react'; // Or use an SVG if you prefer
import { Link } from 'react-router-dom';

export default function Footer() {
  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Back to Top Button - Bottom Left */}
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={scrollToTop} aria-label="Back to top"
          className="bg-gray-800 text-white rounded-full h-10 w-10 shadow-md hover:bg-gray-700 transition-opacity duration-300 opacity-50 hover:opacity-100"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="m-auto" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M256 217.9L383 345c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.3-24.6 0-34L273 167c-9.1-9.1-23.7-9.3-33.1-.7L95 310.9c-4.7 4.7-7 10.9-7 17s2.3 12.3 7 17c9.4 9.4 24.6 9.4 33.9 0l127.1-127z"></path></svg></button>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#232F3E] text-white py-12 mt-10">
        <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p className="text-sm leading-relaxed">
              We are committed to delivering the best service and support.
              Your satisfaction is our top priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/services" className="hover:underline">Services</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact</h2>
            <p className="text-sm mb-2">Email: support@example.com</p>
            <p className="text-sm mb-2">Phone: +123 456 7890</p>
            <p className="text-sm">Location: 123 Avenue, City, Country</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-sm text-gray-300 mt-10 border-t border-white pt-6">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </div>
      </footer>
    </>
  );
}
