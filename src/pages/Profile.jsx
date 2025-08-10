import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState(user || {});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="max-w-md bg-white dark:bg-gray-800 p-4 rounded shadow">
        <input
          type="text"
          name="name"
          value={form.name || ''}
          onChange={handleChange}
          className="w-full p-2 border mb-3"
        />
        <input
          type="email"
          name="email"
          value={form.email || ''}
          onChange={handleChange}
          className="w-full p-2 border mb-3"
        />
        <input
          type="text"
          name="department"
          value={form.department || ''}
          onChange={handleChange}
          className="w-full p-2 border mb-3"
        />
        <input
          type="text"
          name="role"
          value={form.role || ''}
          onChange={handleChange}
          className="w-full p-2 border mb-3"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </div>
    </div>
  );
}
