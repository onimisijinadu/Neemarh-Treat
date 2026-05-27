import {
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
} from 'react-icons/fa6';
import { Link } from 'react-router';

import { MenuLinks } from '../data/data';

export const Footer = () => {
  return (
    <div className="bg-black/90 flex flex-col gap-4  px-3 py-4 sm:px-10 lg:px-10 sm:py-6  text-sm border-t border-t-brandborder max-w-screen overflow-x-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start justify-between gap-5.5 lg:gap-3 w-full">
        <div className="flex flex-col items-start gap-4 w-full lg:w-4/5">
          <div className="flex justify-center items-center gap-3">
            <Sparkles className="text-black/90 p-2 w-10 h-10 text-lg font-bold bg-orange-400 rounded-xl shadow shadow-orange-400" />
            <p className="text-xl font-semibold text-orange-400 text-shadow-2xs shadow-orange-400">
              Neemah
            </p>
          </div>
          <p className="text-lg text-white/60 drop-shadow-2xl drop-shadow-amber-100">
            Experience the finest dining with authentic flavors and premium
            quality. Where every meal is a celebration of culiary excellence.
          </p>
        </div>
        {/* Quick Links */}
        <div className="whitespace-nowrap w-full lg:w-3/5">
          <h3 className="text-lg font-semibold text-amber-500/80 mb-2">
            Quick Links
          </h3>
          <div className="flex flex-col text-sm md:text-[16px] items-start gap-3  font-medium">
            {MenuLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white/60 hover:text-orange-400  group transition-colors duration-300 flex items-center gap-2"
              >
                <div className="rounded-full w-1 h-1 bg-orange-400/70 group-hover:bg-orange-400"></div>
                <p> {link.name}</p>
              </Link>
            ))}
          </div>
        </div>
        {/* contact us */}
        <div className="flex flex-col items-start gap-4 w-full lg:w-3/5">
          <h3 className="text-lg font-semibold text-amber-500/80 mb-2">
            Contact Us
          </h3>
          <div className="flex flex-col gap-3 ">
            <p className="text-white/60 flex items-center gap-2 font-medium text-sm md:text-[16px]">
              <MapPin className="w-8 h-8 p-1.5 bg-orange-400/10 text-orange-400 rounded" />{" "}
              123 Main Street, City, Country
            </p>
            <p className="text-white/60 flex items-center gap-2 font-medium text-sm">
              <Phone className="w-8 h-8 p-1.5 bg-orange-400/10 text-orange-400 rounded" />
              (+234) 917-645-6789
            </p>
            <p className="text-white/60 flex items-center gap-2 font-medium text-sm">
              <Mail className="w-8 h-8 p-1.5 bg-orange-400/10 text-orange-400 rounded" />
              info@neemahs-treats.com
            </p>
          </div>
        </div>
        {/* follow us and opening hours */}
        <div className="flex flex-col w-full gap-3 pb-7 md:text-[16px]">
          {/* Follow Us */}
          <div className="flex flex-col items-start gap-4 w-full lg:w-auto">
            <h3 className="text-lg font-semibold text-amber-500/80 mb-2">
              Follow Us
            </h3>
            <div className="flex gap-3 items-start ">
              {[FaFacebook, FaInstagram, FaXTwitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.6 }}
                  whileTap={{ scale: 0.9, y: 1 }}
                  href={
                    index === 0
                      ? "https://facebook.com/neemahs-treats"
                      : index === 1
                        ? "https://instagram.com/neemahs-treats"
                        : "https://twitter.com/neemahs-treats"
                  }
                  target="_blank"
                  className="text-white/60 p-3 hover:text-orange-400 hover:shadow hover:shadow-orange-400 transition-colors duration-300 flex items-center gap-2 bg-black/5 border border-orange-400/20 rounded-lg"
                >
                  <Icon className="w-5 h-5  text-orange-400" />
                </motion.a>
              ))}
            </div>
          </div>
          {/* opening hours */}
          <div className="text-white/80 w-full">
            <h3 className="text-lg font-semibold text-white/80 mb-2">
              Opening Hours
            </h3>
            <div className="flex flex-col gap-3 text-white/70 ">
              <div className="flex justify-between text-sm text-white/70 font-medium w-full items-start py-2 px-4 border border-orange-400/20 rounded-lg ">
                <p>Mon - Fri</p>
                <p className="text-orange-400/90">11am - 10pm</p>
              </div>
              <div className="flex justify-between text-sm  text-white/70 font-medium w-full items-start py-2 px-4 border border-orange-400/20 rounded-lg ">
                <p>Sat - Sun</p>
                <p className="text-orange-400/90">10am - 11pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* copy right */}
      <div className="border-t border-orange-400/20 pt-10 text-white/70 flex flex-col md:flex-row md:justify-between  items-center justify-center w-full gap-2">
        <p className="text-sm font-medium">
          &copy; 2026 Neemah's Treat. All rights reserved
        </p>
        <div className="flex justify-between items-center gap-3 font-medium">
          <a href="#" target="_blank" className="cursor-pointer">
            Privacy Policy
          </a>
          <a href="#" target="_blank" className="cursor-pointer">
            Terms of Service
          </a>
          <a href="#" target="_blank" className="cursor-pointer">
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  );
};
