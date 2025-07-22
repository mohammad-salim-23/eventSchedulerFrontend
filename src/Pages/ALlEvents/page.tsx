/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../services/eventService";


interface Event {
  _id: string;
  title: string;
  date: string; // ISO date string
  time: string; // "HH:mm"
  notes?: string;
  category: "Work" | "Personal" | "Other";
  archived: boolean;
}

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getAllEvents();
        // Filter archived events 
        const activeEvents = data.data.filter((event: Event) => !event.archived);
        setEvents(activeEvents);
      } catch (err: any) {
        setError(err.message || "Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold my-10">
        {error}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center text-gray-600 my-10">
        No upcoming events found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Upcoming Events
      </h1>

      <ul className="space-y-6">
        {events.map(({ _id, title, date, time, notes, category }) => (
          <li
            key={_id}
            className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h2 className="text-xl font-semibold text-primaryColor">{title}</h2>
              <span className="mt-2 sm:mt-0 text-gray-600 text-sm font-medium">
                {formatDate(date)} at {time}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                {category}
              </span>
            </div>

            {notes && (
              <p className="mt-4 text-gray-700 whitespace-pre-wrap">{notes}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsList;
