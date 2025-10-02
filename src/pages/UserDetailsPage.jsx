import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getUserById } from '../services/api';

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
    <div style={{ padding: 16 }}>
      <Link to="/" relative="path">Back to all users</Link>
      <h1>{user.name}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Company:</strong> {user.company?.name}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Address:</strong> {user.address?.street}, {user.address?.city}</p>
    </div>
  );
}
