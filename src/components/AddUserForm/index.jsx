import { useState } from "react";
import "./style.css";

export default function AddUserForm({ onAdd, disabled = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const emailRegex = /\S+@\S+/;

  const nameVal = name.trim();
  const emailVal = email.trim();

  const nameError = !nameVal ? "Name is required" : "";
  const emailError = !emailVal
    ? "email is required"
    : !emailRegex.test(emailVal)
    ? "Invalid email"
    : "";

  const handleBlur = (field) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameVal = name.trim();
    const emailVal = email.trim();

    if (!nameVal || !emailRegex.test(emailVal)) {
      alert("Please enter a name and a valid email to add a user");
      return;
    }

    onAdd({ name: nameVal, email: emailVal, company: (company || "").trim() });
    setName("");
    setEmail("");
    setCompany("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="add-user">
        <input
          type="text"
          className="user-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleBlur("name")}
          disabled={disabled}
        />
        <input
          type="email"
          className="user-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
          disabled={disabled}
        />
        <input
          type="text"
          className="user-input"
          placeholder="Company (optional)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          disabled={disabled}
        />
        <button className="add-button" type="submit" disabled={disabled}>
          Add user
        </button>
      </form>
    </>
  );
}
