import React from "react";
import { useParams } from "react-router-dom";
import { Star, Phone, MapPin } from "lucide-react";

const HallDetailsPage = () => {
  const { id } = useParams();

  // Fake data (later replace with backend/API)
  const hall = {
    name: "Royal Palace Banquet",
    rating: 4.8,
    address: "Mumbai, Maharashtra",
    phone: "+91 98765 43210",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
      "https://images.unsplash.com/photo-1505236732171-72a5b19b7b93",
      "https://images.unsplash.com/photo-1478147427282-58a87a120781",
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO IMAGE */}
      <div className="h-80 w-full overflow-hidden">
        <img src={hall.images[0]} className="w-full h-full object-cover" />
      </div>

      {/* DETAILS */}
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">{hall.name}</h1>

        <div className="flex items-center gap-2 text-yellow-500">
          <Star size={18} fill="currentColor" />
          <span className="font-semibold">{hall.rating}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={18} />
          {hall.address}
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Phone size={18} />
          {hall.phone}
        </div>

        {/* GALLERY */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          {hall.images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="rounded-xl h-36 w-full object-cover"
            />
          ))}
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mt-4">
          Contact Now
        </button>
      </div>
    </div>
  );
};

export default HallDetailsPage;
