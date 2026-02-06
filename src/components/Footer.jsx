import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 text-center md:text-left">
          
          <div className="col-span-1 sm:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center md:justify-start gap-2">
              EventMaster
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-sm mx-auto md:mx-0">
              Your one-stop destination for planning the perfect wedding, corporate event, or birthday party. We connect you with the best vendors in Nashik.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/" className="hover:text-[#b14e79] transition block py-1">Home</a></li>
              <li><a href="/vendors" className="hover:text-[#b14e79] transition block py-1">Find Vendors</a></li>
              <li><a href="/login" className="hover:text-[#b14e79] transition block py-1">Vendor Login</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center justify-center md:justify-start gap-2"><MapPin size={16} /> Nashik, Maharashtra</li>
              <li className="flex items-center justify-center md:justify-start gap-2"><Phone size={16} /> +91 98765 43210</li>
              <li className="flex items-center justify-center md:justify-start gap-2"><Mail size={16} /> support@eventmaster.com</li>
            </ul>
            
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#b14e79] transition hover:-translate-y-1"><Facebook size={18}/></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#b14e79] transition hover:-translate-y-1"><Instagram size={18}/></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#b14e79] transition hover:-translate-y-1"><Twitter size={18}/></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© 2026 EventMaster. All rights reserved.</p>
          
          <p className="flex items-center gap-1">
            Developed with <Heart size={14} className="text-red-500 fill-current animate-pulse" /> by 
            <span className="text-white font-bold ml-1">Avinash Pawar</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;