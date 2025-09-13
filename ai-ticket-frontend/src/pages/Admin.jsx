import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ role: "", skills: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
        setFilteredUsers(data);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user.email);
    setFormData({
      role: user.role,
      skills: user.skills?.join(", "),
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/update-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: editingUser,
            role: formData.role,
            skills: formData.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean),
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.error(data.error || "Failed to update user");
        return;
      }

      setEditingUser(null);
      setFormData({ role: "", skills: "" });
      fetchUsers();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(
      users.filter((user) => user.email.toLowerCase().includes(query))
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Admin Panel - Manage Users
      </h1>
      <input
        type="text"
        className="input input-bordered w-full mb-8 px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="🔍 Search by email"
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="space-y-6">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow-lg rounded-xl p-6 border border-gray-200 flex flex-col md:flex-row md:items-center justify-between transition-transform hover:scale-[1.02]"
          >
            <div>
              <p className="text-lg font-semibold text-gray-800">
                <span className="mr-2">📧</span>
                {user.email}
              </p>
              <p className="text-gray-600 mt-1">
                <strong>Role:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-white ${
                    user.role === "admin"
                      ? "bg-red-500"
                      : user.role === "moderator"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                >
                  {user.role}
                </span>
              </p>
              <p className="text-gray-600 mt-1">
                <strong>Skills:</strong>{" "}
                {user.skills && user.skills.length > 0 ? (
                  user.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-purple-200 text-purple-800 px-2 py-1 rounded-full mr-2 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="italic text-gray-400">N/A</span>
                )}
              </p>
            </div>

            {editingUser === user.email ? (
              <div className="mt-4 md:mt-0 md:ml-8 space-y-2 w-full md:w-1/3">
                <select
                  className="select select-bordered w-full bg-white border-blue-300 focus:border-blue-500 rounded-lg"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>

                <input
                  type="text"
                  placeholder="Comma-separated skills"
                  className="input input-bordered w-full bg-white border-purple-300 focus:border-purple-500 rounded-lg"
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                />

                <div className="flex gap-2 mt-2">
                  <button
                    className="btn btn-success btn-sm px-4 py-1 rounded-lg shadow"
                    onClick={handleUpdate}
                  >
                    💾 Save
                  </button>
                  <button
                    className="btn btn-ghost btn-sm px-4 py-1 rounded-lg"
                    onClick={() => setEditingUser(null)}
                  >
                    ✖ Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="btn btn-primary btn-sm mt-4 md:mt-0 px-4 py-1 rounded-lg shadow hover:bg-blue-600 transition"
                onClick={() => handleEditClick(user)}
              >
                ✏️ Edit
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}