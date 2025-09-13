import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="navbar bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 shadow-lg px-4 py-2">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-extrabold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text"
        >
          🎟️ Ticket AI
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        {!token ? (
          <>
            <Link
              to="/signup"
              className="btn btn-sm bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white font-semibold rounded shadow hover:scale-105 transition"
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="btn btn-sm bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white font-semibold rounded shadow hover:scale-105 transition"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <span className="px-3 py-1 rounded-full bg-purple-200 text-purple-800 font-medium shadow text-sm">
              Hi, {user?.email}
            </span>
            {user && user?.role === "admin" ? (
              <Link
                to="/admin"
                className="btn btn-sm bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold rounded shadow hover:scale-105 transition"
              >
                Admin
              </Link>
            ) : null}
            <button
              onClick={logout}
              className="btn btn-sm bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white font-semibold rounded shadow hover:scale-105 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}