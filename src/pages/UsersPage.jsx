import { useEffect, useMemo, useState } from 'react';
import { getUsers } from '../services/api';

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
    const q = query.trim().toLowerCase();
    if (!q) return allUsers;
    return allUsers.filter(u =>
      (u.name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q)
    );
  }, [allUsers, query]);

  if (loading) return <div style={{ padding: 16 }}>Loading users…</div>;
  if (error) return <div style={{ padding: 16, color: 'crimson' }}>Error: {error}</div>;

  return (
    <div style={{ padding: 16 }}>
      <h1>Users</h1>

      <input
        type="search"
        placeholder="Search by name or email…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 8, width: 300, marginBottom: 12 }}
        aria-label="Search users"
      />

      {filteredUsers.length === 0 ? (
        <div>No users match your search</div>
      ) : (
        <ul style={{ lineHeight: 1.6 }}>
          {filteredUsers.map(u => (
            <li key={u.id}>
              <strong>{u.name}</strong> — {u.email} {u.company?.name ? `(${u.company.name})` : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
