import './style.css'

export default function SearchBar({ value, onChange, onReset, disabled = false }){

    return <>
     <input
     className='input search'
        type="search"
        placeholder="Search by name or email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-label="Search users"
      />
    </>
}