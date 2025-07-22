/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

import { toast } from "sonner";
import { archiveEvent, deleteEvent, getUserEvents } from "../../services/eventService";
import Swal from "sweetalert2";
import { getCurrentUser } from "../../services/AuthService";

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: "Work" | "Personal" | "Other";
  archived: boolean;
}

const UserEventsTable = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); 

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await getUserEvents();
      setEvents(res.data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/signin"); 
      return;
    }

    fetchEvents();
  }, [navigate]); // include navigate in dependency

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteEvent(id);
        toast.success("Event deleted successfully");
        fetchEvents(); // refresh list
      } catch (error: any) {
        toast.error(error.message || "Failed to delete event");
      }
    }
  };

  const handleArchiveToggle = async (id: string) => {
    try {
      await archiveEvent(id);
      toast.success("Event archive status updated");
      fetchEvents();
    } catch (error: any) {
      toast.error(error.message || "Failed to update event");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading events...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">My Events</h1>
      {events.length === 0 ? (
        <p className="text-center text-gray-600">No events found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-800 text-sm uppercase tracking-wider">
                <th className="py-3 px-4 border-b">Title</th>
                <th className="py-3 px-4 border-b">Date</th>
                <th className="py-3 px-4 border-b">Time</th>
                <th className="py-3 px-4 border-b">Notes</th>
                <th className="py-3 px-4 border-b">Category</th>
                <th className="py-3 px-4 border-b">Archived</th>
                <th className="py-3 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{event.title}</td>
                  <td className="py-3 px-4 border-b">{event.date}</td>
                  <td className="py-3 px-4 border-b">{event.time}</td>
                  <td className="py-3 px-4 border-b">
                    {event.notes || <span className="text-gray-400 italic">No notes</span>}
                  </td>
                  <td className="py-3 px-4 border-b">{event.category}</td>
                  <td className="py-3 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.archived ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {event.archived ? "Archived" : "Active"}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b flex gap-2 justify-center">
                    <button
                      onClick={() => handleArchiveToggle(event._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold px-3 py-1 rounded cursor-pointer"
                    >
                      {event.archived ? "Unarchive" : "Archive"}
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserEventsTable;
