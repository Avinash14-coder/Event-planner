import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-6">
        
        <div className="grid md:grid-cols-4 gap-8 mb-8 border-b border-gray-800 pb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">EventMaster</h2>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Your one-stop destination for planning the perfect wedding, corporate event, or birthday party. We connect you with the best vendors in Nashik.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-purple-400 transition">Home</a></li>
              <li><a href="/vendors" className="hover:text-purple-400 transition">Find Vendors</a></li>
              <li><a href="/login" className="hover:text-purple-400 transition">Vendor Login</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">About Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Nashik, Maharashtra, India</li>
              <li>+91 98765 43210</li>
              <li>support@eventmaster.com</li>
            </ul>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition"><Facebook size={18}/></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition"><Instagram size={18}/></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition"><Twitter size={18}/></a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2026 EventMaster. All rights reserved.</p>
          
          {/* --- DEVELOPER CREDIT --- */}
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            Developed with <Heart size={14} className="text-red-500 fill-current" /> by 
            <span className="text-white font-bold">Avinash Pawar</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;