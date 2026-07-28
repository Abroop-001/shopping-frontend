import React, { useState } from 'react';
import { Search, UserCheck, UserX, Shield } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: "Abroop Singh", email: "abroop@fitzonepro.com", role: "Administrator", joined: "Jan 2024", status: "Active", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80" },
    { id: 2, name: "Arjun Mehta", email: "arjun.m@gmail.com", role: "Customer", joined: "Feb 2024", status: "Active", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80" },
    { id: 3, name: "Priya Sharma", email: "priya.s@yahoo.com", role: "Customer", joined: "Mar 2024", status: "Active", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
    { id: 4, name: "Ravi Kumar", email: "ravi.k@outlook.com", role: "Customer", joined: "May 2024", status: "Suspended", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        alert(`User status updated to ${nextStatus} (Simulated)`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const promoteAdmin = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        alert(`${u.name} promoted to Administrator (Simulated)`);
        return { ...u, role: 'Administrator' };
      }
      return u;
    }));
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Manage Users</h1>
        <p className="text-xs text-ink-4 mt-0.5">Administer accounts, adjust roles, and monitor user statuses.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users by name or email..."
          className="input-base pl-9 py-2.5 text-xs"
        />
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4" />
      </div>

      {/* Users table */}
      <div className="card-base">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-2 border-b border-surface-4 text-xs font-semibold text-ink-4 uppercase">
                <th className="py-3.5 px-6">User</th>
                <th className="py-3.5 px-6">Email</th>
                <th className="py-3.5 px-6">Role</th>
                <th className="py-3.5 px-6">Joined Date</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-4 text-ink-2">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-surface-2/50 transition-colors">
                  <td className="py-3.5 px-6 flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover bg-surface-2 flex-shrink-0" />
                    <span className="text-xs font-semibold text-ink">{u.name}</span>
                  </td>
                  <td className="py-3.5 px-6 text-xs">{u.email}</td>
                  <td className="py-3.5 px-6 text-xs flex items-center gap-1.5 font-medium mt-3.5">
                    {u.role === 'Administrator' && <Shield size={13} className="text-accent-dark" />}
                    {u.role}
                  </td>
                  <td className="py-3.5 px-6 text-xs text-ink-4">{u.joined}</td>
                  <td className="py-3.5 px-6">
                    <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      u.status === 'Active' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {u.role !== 'Administrator' && (
                        <button
                          onClick={() => promoteAdmin(u.id)}
                          className="w-8 h-8 rounded-lg border border-surface-4 flex items-center justify-center text-ink-3 hover:text-ink hover:bg-surface-2 transition-all"
                          title="Promote to Admin"
                        >
                          <Shield size={13} />
                        </button>
                      )}
                      <button
                        onClick={() => toggleStatus(u.id)}
                        className={`w-8 h-8 rounded-lg border border-surface-4 flex items-center justify-center transition-all ${
                          u.status === 'Active' 
                            ? "text-red-500 hover:text-red-700 hover:bg-red-50" 
                            : "text-green-600 hover:text-green-700 hover:bg-green-50"
                        }`}
                        title={u.status === 'Active' ? "Suspend User" : "Activate User"}
                      >
                        {u.status === 'Active' ? <UserX size={13} /> : <UserCheck size={13} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-xs text-ink-4">
                    No users found matching query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
