/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Swal from "sweetalert2";
import { createEvent } from "../../../services/eventService";

const EventForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    notes: "",
    category: "Work",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createEvent(formData);
      console.log("Event created:", response);
      console.log("Event created:", response);
      Swal.fire({
        icon: "success",
        title: "Event Created",
        text: `Event "${response.data.title}" has been added successfully!`,
      });
      // Reset form
      setFormData({
        title: "",
        date: "",
        time: "",
        notes: "",
        category: "Work",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Failed to Create Event",
        text: error.message || "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-primaryColor mb-6 text-center">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Event title"
            className="border border-teal-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block font-semibold mb-1">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="border border-teal-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
        </div>

        {/* Time */}
        <div>
          <label htmlFor="time" className="block font-semibold mb-1">Time</label>
          <input
            type="time"
            name="time"
            id="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="border border-teal-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block font-semibold mb-1">Category</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border border-teal-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block font-semibold mb-1">Notes</label>
          <textarea
            name="notes"
            id="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes (optional)"
            className="border border-teal-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`text-center py-2 rounded-lg cursor-pointer bg-teal-500 hover:bg-teal-700 text-white font-semibold transition duration-300 text-lg w-full ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
