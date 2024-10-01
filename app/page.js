'use client';

import { useState } from 'react';
import QRCodeScanner from '../components/QRCodeScanner';
import Image from 'next/image';

export default function Home() {
    const [details, setDetails] = useState(null);
    const [error, setError] = useState('');

    const handleScan = async (data) => {
        const parsedData = JSON.parse(data); 
        const response = await fetch('/api/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parsedData),
        });

        const result = await response.json();

        if (response.ok) {
            setDetails(result.details);
            setError('');
        } else {
            setError(result.message);
            setDetails(null);
        }
    };

    const handleAccept = () => {
        alert('Entry has been verified!');
        setDetails(null); 
    };

    return (
        <div className="flex flex-col gap-2 items-center justify-center min-h-screen bg-gradient-to-r from-violet-500 to-pink-400 p-4">
            <Image 
              src = {'./assets/src.svg'}
              height={150}
              width={150}
            />
            <h1 className="text-4xl font-bold mb-8 text-white text-center drop-shadow-lg">Garba Night QR Code Verification</h1>
            <QRCodeScanner onScan={handleScan} />
            {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
            {details && (
                <div className="mt-4 p-6 bg-white shadow-lg rounded-lg w-full max-w-md border border-purple-500">
                    <h2 className="text-3xl font-semibold mb-2 text-black">Registered Details</h2>
                    <p className='text-slate-900'><strong>Name:</strong> {details.name}</p>
                    <p className='text-slate-900'><strong>Email:</strong> {details.email}</p>
                    <p className='text-slate-900'><strong>Year:</strong> {details.year}</p>
                    <p className='text-slate-900'><strong>Branch:</strong> {details.branch}</p>
                    <button
                        onClick={handleAccept}
                        className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 shadow-lg"
                    >
                        Accept and Verify
                    </button>
                </div>
            )}
            <footer className="mt-8 text-center text-white text-sm">
                <p>We look forward to celebrating Garba Night with you!</p>
            </footer>
        </div>
    );
}