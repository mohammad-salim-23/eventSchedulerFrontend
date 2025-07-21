/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import EventForm from "../event/eventForm";

import bannerImage from "../../../assets/images/backgroundevent.jpg";
import { getCurrentUser } from "../../../services/AuthService";

const Banner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Replace with your actual auth hook or context
  const user = getCurrentUser();

  const handleCreateEvent = () => {
    if (!user) {
      navigate("/signin");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative w-full">
      {/* Banner Image */}
      <div
        className="relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh] bg-cover bg-center brightness-75"
        style={{ backgroundImage: `url(${bannerImage})` }}
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-xl">
          Plan Your Events Easily
        </h2>
        <p className="max-w-xl mb-6 text-gray-100">
          Create events, manage schedules, and keep track effortlessly.
        </p>

        <button
          onClick={handleCreateEvent}
          className="relative px-6 py-3 text-lg border-2 border-teal-500 text-teal-500 hover:bg-white hover:text-teal-700 transition font-bold rounded-md cursor-pointer"
        >
          Create Event
        </button>
      </div>

      {/* Event Form Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xl font-bold cursor-pointer"
              aria-label="Close"
            >
              ×
            </button>
            <EventForm />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Banner;
