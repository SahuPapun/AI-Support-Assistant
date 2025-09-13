import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react";

export default function TicketDetailsPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/tickets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setTicket(data.ticket);
        } else {
          alert(data.message || "Failed to fetch ticket");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading)
    return <div className="text-center mt-10">Loading ticket details...</div>;
  if (!ticket) return <div className="text-center mt-10">Ticket not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
        Ticket Details
      </h2>

      <div className="card bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 shadow-2xl p-8 space-y-6 rounded-2xl border border-purple-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{ticket.title}</h3>
        <p className="text-lg text-gray-700 mb-4">{ticket.description}</p>

        {/* Conditionally render extended details */}
        {ticket.status && (
          <>
            <div className="divider font-semibold text-purple-500">Metadata</div>
            <div className="flex flex-wrap gap-4 mb-2">
              <span className={`px-3 py-1 rounded-full text-white font-medium shadow ${ticket.status === "open" ? "bg-green-500" : ticket.status === "closed" ? "bg-red-500" : "bg-yellow-500"}`}>
                Status: {ticket.status}
              </span>
              {ticket.priority && (
                <span className="px-3 py-1 rounded-full bg-pink-200 text-pink-800 font-medium shadow">
                  Priority: {ticket.priority}
                </span>
              )}
              {ticket.relatedSkills?.length > 0 && (
                <span className="px-3 py-1 rounded-full bg-blue-200 text-blue-800 font-medium shadow">
                  Skills: {ticket.relatedSkills.join(", ")}
                </span>
              )}
              {ticket.assignedTo && (
                <span className="px-3 py-1 rounded-full bg-purple-200 text-purple-800 font-medium shadow">
                  Assigned: {ticket.assignedTo?.email}
                </span>
              )}
            </div>

            {ticket.helpfulNotes && (
              <div className="mt-4">
                <strong className="block text-lg text-purple-700 mb-2">Helpful Notes:</strong>
                <div className="prose max-w-none rounded bg-white p-4 shadow">
                  <ReactMarkdown>{ticket.helpfulNotes}</ReactMarkdown>
                </div>
              </div>
            )}

            {ticket.createdAt && (
              <p className="text-sm text-gray-500 mt-4 text-right">
                Created At: {new Date(ticket.createdAt).toLocaleString()}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}