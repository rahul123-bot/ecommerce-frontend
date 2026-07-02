import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";
import logo from "../assets/NextCart_logo.png";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
        
        {/* Brand Section */}
        <div className="lg:col-span-1">
          <img
            src={logo}
            alt="NextCart logo"
            className="h-12 w-auto object-contain mb-4"
          />
          <p className="text-sm leading-7 text-gray-500">
            Premium electronics and fashion delivered with AI-powered efficiency.
          </p>
        </div>

        {/* Links Grid */}
        {[
          { title: "Company", links: ["About Us", "Careers", "Contact Us"] },
          { title: "Help", links: ["FAQ", "Shipping", "Returns"] },
          { title: "Policies", links: ["Privacy", "Terms of Use", "Security"] },
        ].map((section) => (
          <div key={section.title}>
            <h3 className="text-gray-900 font-bold text-sm uppercase tracking-widest mb-6">
              {section.title}
            </h3>
            <ul className="space-y-4 text-sm text-gray-600">
              {section.links.map((link) => (
                <li
                  key={link}
                  className="hover:text-blue-600 cursor-pointer transition-colors duration-200"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter Section */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <h3 className="text-gray-900 font-bold text-sm uppercase tracking-widest mb-4">
            Stay Updated
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Get exclusive deals and AI-curated offers.
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-white px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm"
            />
            <button className="bg-blue-600 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Trust & Social Strip */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Social Icons */}
          <div className="flex gap-4">
            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>

          {/* Payment & Security Trust Icons */}
          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2 text-xs font-bold uppercase">
              <FaShieldAlt /> Secure
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase">
              <FaLock /> Encrypted
            </div>
            <div className="flex gap-3 text-2xl">
              <FaCcVisa className="text-blue-900" />
              <FaCcMastercard className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-50 py-4 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} NextCart Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

