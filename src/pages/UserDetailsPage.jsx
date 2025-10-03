import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getUserById } from '../services/api';
import './UserDetailsPage.css'

export default function UserDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const stateUser = location.state?.user;

  const [user, setUser] = useState(stateUser || null);
  const [loading, setLoading] = useState(!stateUser);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (stateUser) return;
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserById(id);
        if (alive) setUser(data);
      } catch (e) {
        if (alive) setError(e.message || 'Failed to load user');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id, stateUser]);

  if (loading) return <div style={{ padding: 16 }}>Loading user…</div>;
  if (error)   return <div style={{ padding: 16, color: 'crimson' }}>Error: {error}</div>;
  if (!user)   return null;

  return (
    <div className="container details-wrap">
    <Link to="/" relative="path" className="back-link">← Back to all users</Link>
    <article className="details-card">
      <h1>{user.name}</h1>
      <div className="details-list">
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Phone:</strong> {user.phone}</div>
        <div><strong>Company:</strong> {user.company?.name}</div>
        <div><strong>Website:</strong> {user.website}</div>
        <div><strong>Address:</strong> {user.address?.street}, {user.address?.city}</div>
      </div>
    </article>
  </div>
  );
}
