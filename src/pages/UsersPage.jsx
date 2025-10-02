import { useEffect, useMemo, useState } from 'react';
import { getUsers } from '../services/api';
import UserCard from '../components/UserCard';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [localUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUsers();
        if (alive) setUsers(data);
      } catch (e) {
        if (alive) setError(e.message || 'Failed to load users');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const allUsers = useMemo(() => [...localUsers, ...users], [localUsers, users]);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return allUsers;
    return allUsers.filter(user =>
      (user.name || '').toLowerCase().includes(normalizedQuery) ||
      (user.email || '').toLowerCase().includes(normalizedQuery)
    );
  }, [allUsers, query]);

  if (loading) return <div style={{ padding: 16 }}>Loading users…</div>;
  if (error) return <div style={{ padding: 16, color: 'crimson' }}>Error: {error}</div>;

  return (
    <div style={{ padding: 16 }}>
      <h1>Users</h1>
      {filteredUsers.length === 0 ? (
        <div>No users match your search</div>
      ) : (
        <ul className="user-list">
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user}/>
          ))}
        </ul>
      )}
    </div>
  );
}
