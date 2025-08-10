import { useEffect, useState } from "react";

export default function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetch("/dummy-data/employees.json")
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase()) ||
    emp.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (!confirm("Delete this employee?")) return;
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editData) return;
    if (editData.id) {
      // Update existing
      setEmployees(employees.map(emp => (emp.id === editData.id ? editData : emp)));
    } else {
      // Add new
      setEmployees([...employees, { ...editData, id: Date.now() }]);
    }
    setEditData(null);
    setShowForm(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Employee Directory</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 flex-1"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => { setEditData({ name: "", email: "", department: "", role: "", status: "Active" }); setShowForm(true); }}
        >
          + Add
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(emp => (
              <tr key={emp.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <td className="p-2 border">{emp.name}</td>
                <td className="p-2 border">{emp.email}</td>
                <td className="p-2 border">{emp.department}</td>
                <td className="p-2 border">{emp.role}</td>
                <td className="p-2 border">
                  <span className={`px-2 py-1 rounded text-white ${emp.status === "Active" ? "bg-green-500" : "bg-red-500"}`}>
                    {emp.status}
                  </span>
                </td>
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => { setEditData(emp); setShowForm(true); }}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleSave}
            className="bg-white dark:bg-gray-800 p-6 rounded w-96 space-y-3"
          >
            <h3 className="text-lg font-bold mb-2">{editData.id ? "Edit Employee" : "Add Employee"}</h3>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border"
              value={editData.name}
              onChange={e => setEditData({ ...editData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border"
              value={editData.email}
              onChange={e => setEditData({ ...editData, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Department"
              className="w-full p-2 border"
              value={editData.department}
              onChange={e => setEditData({ ...editData, department: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Role"
              className="w-full p-2 border"
              value={editData.role}
              onChange={e => setEditData({ ...editData, role: e.target.value })}
              required
            />
            <select
              className="w-full p-2 border"
              value={editData.status}
              onChange={e => setEditData({ ...editData, status: e.target.value })}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => { setShowForm(false); setEditData(null); }} className="bg-gray-400 px-3 py-1 rounded text-white">Cancel</button>
              <button type="submit" className="bg-green-500 px-3 py-1 rounded text-white">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
