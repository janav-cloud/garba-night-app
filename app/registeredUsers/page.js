'use client';

import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase'; // Ensure this points to your Firebase setup
import { collection, onSnapshot } from 'firebase/firestore';

export default function RegisteredUsers() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const registeredUsersCollection = collection(db, 'registered');
        const unsubscribe = onSnapshot(registeredUsersCollection, (snapshot) => {
            const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersData);
            setFilteredUsers(usersData);
            setUserCount(usersData.length);
        }, (error) => {
            console.error('Error fetching users:', error);
        });

        // Cleanup the subscription on unmount
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const searchLower = searchQuery.toLowerCase();
        setFilteredUsers(
            users.filter(user => {
                const name = user.name ? user.name.toLowerCase() : '';
                const email = user.email ? user.email.toLowerCase() : '';
                return name.includes(searchLower) || email.includes(searchLower);
            })
        );
    }, [searchQuery, users]);

    return (
        <div className="min-h-screen bg-gray-100 p-6 font-poppins">
            <h1 className="text-4xl font-bold mb-6 text-center text-sky-600">Registered Users 📋</h1>
            <hr className='mb-3 border-2'></hr>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <p className="text-xl mb-4 text-slate-600">Total Registered Users: {userCount}</p>
                <input
                    type="text"
                    placeholder="🔍 Search by name or email"
                    className="text-slate-500 p-2 border rounded-md w-full md:w-1/3"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-sky-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Year</th>
                            <th className="py-3 px-6 text-left">Branch</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
                                    <td className="py-3 px-6 text-left">{user.email}</td>
                                    <td className="py-3 px-6 text-left">{user.year}</td>
                                    <td className="py-3 px-6 text-left">{user.branch}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-3 px-6 text-center">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
