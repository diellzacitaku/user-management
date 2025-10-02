const BASE_URL = 'https://jsonplaceholder.typicode.com';
const TIMEOUT_MS = 8000;

function isValidUser(user) {
  return user && typeof user.id === 'number' && typeof user.name === 'string' && typeof user.email === 'string';
}

async function fetchJSON(path, label) {
    const url = BASE_URL + path;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`${label} request failed (${res.status})`);
      return await res.json();
    } catch (err) {
      if (err.name === 'AbortError') throw new Error(`${label} request timed out`);
      if (err.message?.startsWith(`${label} request failed (`)) throw err;
      throw new Error(`${label} request failed (network)`);
    } finally {
      clearTimeout(timer);
    }
  }


  export async function getUsers() {
    const data = await fetchJSON('/users', 'Users');
    if (!Array.isArray(data) || data.length !== 10 || !isValidUser(data[0])) {
      throw new Error('Users response invalid');
    }
    return data;
  }

  export async function getUserById(id) {
    const data = await fetchJSON(`/users/${id}`, 'User');
    if (!isValidUser(data) || Number(data.id) !== Number(id)) {
      throw new Error('User response invalid');
    }
    return data;
  }
  
  