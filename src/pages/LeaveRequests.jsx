import { useEffect, useState } from "react";

export default function LeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/dummy-data/leaveRequests.json")
      .then(res => res.json())
      .then(data => setLeaves(data));
  }, []);

  const filtered = leaves.filter(l => filter === "All" ? true : l.status === filter);

  const handleDelete = (id) => {
    if (!confirm("Delete this leave request?")) return;
    setLeaves(leaves.filter(l => l.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editData) return;
    if (editData.id) {
      setLeaves(leaves.map(l => (l.id === editData.id ? editData : l)));
    } else {
      setLeaves([...leaves, { ...editData, id: Date.now() }]);
    }
    setEditData(null);
    setShowForm(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Leave Requests</h2>

      <div className="flex gap-2 mb-4 items-center">
        <select value={filter} onChange={e => setFilter(e.target.value)} className="p-2 border">
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => { setEditData({ employee: "", leaveType: "", dates: "", status: "Pending" }); setShowForm(true); }}
        >
          + Add
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Leave Type</th>
              <th className="p-2 border">Dates</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(req => (
              <tr key={req.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <td className="p-2 border">{req.employee}</td>
                <td className="p-2 border">{req.leaveType}</td>
                <td className="p-2 border">{req.dates}</td>
                <td className="p-2 border">
                  <span className={`px-2 py-1 rounded text-white ${
                    req.status === "Approved"
                      ? "bg-green-500"
                      : req.status === "Pending"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="p-2 border flex gap-2">
                  <button onClick={() => { setEditData(req); setShowForm(true); }} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(req.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 p-6 rounded w-96 space-y-3">
            <h3 className="text-lg font-bold mb-2">{editData.id ? "Edit Request" : "Add Request"}</h3>

            <input type="text" placeholder="Employee" className="w-full p-2 border" value={editData.employee} onChange={e => setEditData({...editData, employee: e.target.value})} required />
            <input type="text" placeholder="Leave Type" className="w-full p-2 border" value={editData.leaveType} onChange={e => setEditData({...editData, leaveType: e.target.value})} required />
            <input type="text" placeholder="Dates (YYYY-MM-DD to YYYY-MM-DD)" className="w-full p-2 border" value={editData.dates} onChange={e => setEditData({...editData, dates: e.target.value})} required />
            <select className="w-full p-2 border" value={editData.status} onChange={e => setEditData({...editData, status: e.target.value})}>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => { setShowForm(false); setEditData(null); }} className="bg-gray-400 px-3 py-1 rounded text-white">Cancel</button>
              <button type="submit" className="bg-green-500 px-3 py-1 rounded text-white">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
