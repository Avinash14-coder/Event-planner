import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Star, ShieldCheck, Heart } from "lucide-react";
const Home = () => {
  const CATEGORIES = [
    {
      title: "Wedding Day",
      img: "https://www.shaadidukaan.com/vogue/wp-content/uploads/2025/06/Post-Wedding-Rituals-11.webp",
      path: "/wedding-day",
    },
    {
      title: "Birthday Party",
      img: "https://media.istockphoto.com/id/1154066614/photo/happy-birthday-to-you-concept.jpg?s=612x612&w=0&k=20&c=laWMYxECOwx3R9pB07O2Ip11IRa_y-LdsUzO99BmqSk=",
      path: "/birthday",
    },
    {
      title: "Reception Party",
      img: "https://img.freepik.com/premium-photo/evening-wedding-family-dinner-forest-with-light-bulbs-candles_419896-17590.jpg",
      path: "/reception",
    },
    {
      title: "Anniversary",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4EyYWR9CsuN1R7fKaCkbGsg1UmlXGRblHOA&s",
      path: "/anniversary",
    },
    {
      title: "Bachelor Party",
      img: "https://media.istockphoto.com/id/1174587136/photo/group-of-smiling-male-friends-having-fun-in-night-club.jpg?s=612x612&w=0&k=20&c=4fCPHPdTtTra9L_qhFuQ7BhfdZ1J_n4mvohgb_ZPiU4=",
      path: "/bachelorparty",
    },
    {
      title: "DJ ",
      img: "https://t3.ftcdn.net/jpg/08/52/83/82/360_F_852838243_bHrOKN6lJWajcpfRqvrskAPuZO5VheDZ.jpg",
      path: "/category/dj",
    },
  ];

  return (
    <div>
      {" "}
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="relative h-full w-full  overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent z-10"></div>
          <img
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
            alt="Luxury gala event ballroom"
            src="https://images.pexels.com/photos/30311728/pexels-photo-30311728.jpeg"
          />

          <div className="absolute bg-gold text-black inset-0 z-10 flex flex-col justify-end  p-4 pb-8 space-y-2">
            <span className="inline-block px-8 py-5 bg-[#E7D3A1] backdrop-blur-sm text-[#9F7A2F] border text-10 border-[#9F7A2F] rounded-full text-sm font-bold uppercase tracking-widest w-fit animate-pulse">
              Premium Experience
            </span>

            <h2 className="text-4xl font-extrabold text-white leading-[1.1] tracking-tight">
              Plan Your{" "}
              <span className="text-primary italic font-serif">Dream</span>{" "}
              Event
            </h2>

            <p className="text-slate-200 text-sm max-w-[380px] leading-relaxed font-medium">
              Access the world's most exclusive venues and elite planning
              services.
            </p>

            <div className="flex gap-3 pt-2">
              <button className="bg-black hover:bg-blue-600 transition-colors text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/40 flex-1 active:scale-95">
                Start Planning
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Categories */}
      <div>
        <section className="mb-12">
          <div className="flex items-center justify-between px-5 mb-6">
            <h3 className="text-2xl font-extrabold tracking-tight dark:text-white">
              Curated Categories
            </h3>
            <button className="text-sm font-bold text-primary flex items-center gap-1 hover:underline active:opacity-70 transition-all">
              VIEW ALL
              <span className="material-symbols-outlined text-lg"></span>
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto px-5 no-scrollbar">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={i}
                to={cat.path}
                className="flex-shrink-0 w-85 space-y-2 group block"
              >
                <div className="relative h-94 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    className="h-full w-full object-cover group-hover:scale-115 transition-transform duration-500"
                    alt={cat.title}
                    src={cat.img}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
                </div>
                <p className="font-bold text-xl dark:text-soft-cream group-hover:text-primary transition-colors pl-3">
                  {cat.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
      {/* FEATURES SECTION */}{" "}
      <div className="py-20 bg-white">
        {" "}
        <div className="container mx-auto px-6">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {" "}
            {[
              {
                icon: ShieldCheck,
                title: "Verified Vendors",
                desc: "Every vendor is personally verified for quality.",
              },
              {
                icon: Star,
                title: "Transparent Pricing",
                desc: "No hidden costs. Compare rates within your budget.",
              },
              {
                icon: Heart,
                title: "Stress-Free Planning",
                desc: "We make planning your big day simple and smooth.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition"
              >
                {" "}
                <div className="w-16 h-16 bg-[#efdce4] rounded-2xl flex items-center justify-center text-[#8e3e61] mx-auto mb-6 transform rotate-3 group-hover:rotate-6 transition">
                  {" "}
                  <feature.icon size={32} />{" "}
                </div>{" "}
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {" "}
                  {feature.title}{" "}
                </h3>{" "}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {" "}
                  {feature.desc}{" "}
                </p>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default Home;
