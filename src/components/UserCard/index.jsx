import { Link } from "react-router-dom";
import './style.css';

export default function UserCard({ user }) {
  if (!user) return null;
  const company = user.company?.name ? ` · ${user.company.name}` : "";
  const initial = (user.name || "?").trim().charAt(0).toUpperCase();

  return (
    <li>
      <Link
        to={`/users/${user.id}`}
        state={{ user }}
        aria-label={`Open details for ${user.name}`}
        className="user-card"
      >
        <div className="user-avatar">{initial}</div>
        <div className="user-text">
          <span className="user-name">{user.name}</span>
          <span className="user-meta">{user.email}{company}</span>
        </div>
      </Link>
    </li>
  );
}
