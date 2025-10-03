import { useEffect, useState } from 'react';

export default function SearchBar({ value, onChange, onReset, disabled = false }){
    const [query, setQuery] = useState('');

    return <>
     <input
        type="search"
        placeholder="Search by name or email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        style={{ padding: 8, width: 300, marginBottom: 12 }}
        aria-label="Search users"
      />
    </>
}