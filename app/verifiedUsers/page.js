'use client';

import { useEffect, useState } from 'react';

export default function VerifiedUsers() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/verifiedUsers');
            const data = await response.json();
            setUsers(data.users);
            setUserCount(data.count);
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        setFilteredUsers(
            users.filter(user =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, users]);

    return (
        <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
            <h1 className="text-3xl font-semibold mb-6">Verified Users</h1>
            <div className="flex justify-between items-center w-full max-w-4xl mb-4">
                <div className="text-lg font-medium">
                    Total Verified Users: <span className="font-bold">{userCount}</span>
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or email..."
                    className="p-2 border rounded-lg w-64"
                />
            </div>

            <div className="w-full max-w-4xl overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Year</th>
                            <th className="py-2 px-4 border">Branch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <tr key={index} className="text-center">
                                    <td className="py-2 px-4 border">{user.name}</td>
                                    <td className="py-2 px-4 border">{user.email}</td>
                                    <td className="py-2 px-4 border">{user.year}</td>
                                    <td className="py-2 px-4 border">{user.branch}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-4 text-center text-gray-500">
                                    No verified users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}