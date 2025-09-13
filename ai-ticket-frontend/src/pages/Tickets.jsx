import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Tickets() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
      });
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setForm({ title: "", description: "" });
        fetchTickets(); // Refresh list
      } else {
        alert(data.message || "Ticket creation failed");
      }
    } catch (err) {
      alert("Error creating ticket");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
        Create Ticket
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-10 card bg-white shadow-xl rounded-2xl border border-purple-200 p-6"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ticket Title"
          className="input input-bordered w-full px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Ticket Description"
          className="textarea textarea-bordered w-full px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        ></textarea>
        <button
          className="btn btn-primary w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
        All Tickets
      </h2>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Link
            key={ticket._id}
            className="card bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow-lg rounded-xl p-6 border border-gray-200 flex flex-col gap-2 hover:scale-[1.02] transition-transform"
            to={`/tickets/${ticket._id}`}
          >
            <h3 className="font-bold text-xl text-gray-800">{ticket.title}</h3>
            <p className="text-md text-gray-700">{ticket.description}</p>
            <p className="text-sm text-gray-500">
              Created At: {new Date(ticket.createdAt).toLocaleString()}
            </p>
          </Link>
        ))}
        {tickets.length === 0 && (
          <p className="text-center text-gray-400 italic">
            No tickets submitted yet.
          </p>
        )}
      </div>
    </div>
  );
}