import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-800 border-t border-dark-600 py-4 px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-content-muted">
          © {currentYear} ERP Portal. All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a
            href="#"
            className="text-content-muted hover:text-content transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-content-muted hover:text-content transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-content-muted hover:text-content transition-colors duration-200"
          >
            Support
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm text-content-muted">
          Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> for excellence in education
        </div>
      </div>
    </footer>
  );
};

export default Footer;
