import { Link } from "react-router-dom";
import './style.css';
import avatar from '../../assets/avatar.webp';

export default function UserCard({ user }) {
  if (!user) return null;
  const company = user.company?.name ? ` · ${user.company.name}` : "";
  const isClickable = !user.isLocal;

  const content = (
    <>
    <div className="user-avatar">
    <img src={avatar} alt={`${user.name} avatar`} />
    </div>
      <div className="user-text">
        <span className="user-name">{user.name}</span>
        <span className="user-meta">{user.email}{company}</span>
        {!isClickable && <small className="user-badge">Local user</small>}
        </div>
    </>
  )

  return (
    <li>
      {isClickable ? (
      <Link
        to={`/users/${user.id}`}
        state={{ user }}
        aria-label={`Open details for ${user.name}`}
        className="user-card"
      >
       {content}
      </Link>
      ) : (
        <div className="user-card user-card--disabled" aria-disabled="true">
        {content}
      </div>
    )}
  </li>
);
}