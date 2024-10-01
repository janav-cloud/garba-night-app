"use client"; // Use client-side rendering

import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const QRCodeScanner = ({ onScan }) => {
    const videoRef = useRef(null);
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();

        const startScanning = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" },
                });

                videoRef.current.srcObject = stream;
                videoRef.current.setAttribute("playsinline", true);
                videoRef.current.play();

                codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
                    if (result) {
                        onScan(result.text); 
                        setIsScanning(false);
                        videoRef.current.srcObject.getTracks().forEach(track => track.stop()); 
                    }
                    if (err && !(err instanceof Error)) {
                        console.log(err);
                    }
                });
            } catch (err) {
                setError("Error accessing camera.");
                console.error(err);
            }
        };

        if (isScanning) {
            startScanning();
        }

        return () => {
            // Cleanup
            if (videoRef.current) {
                videoRef.current.srcObject?.getTracks().forEach(track => track.stop());
            }
        };
    }, [isScanning, onScan]);

    const handleStartScanning = () => {
        setIsScanning(true);
        setError("");
    };

    return (
        <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-black">QR Code Scanner</h2>
            {error && <p className="text-red-600">{error}</p>}
            {isScanning ? (
                <video
                    ref={videoRef}
                    className="w-full h-auto rounded-lg border-2 border-purple-500"
                    style={{ maxHeight: "300px" }} // Limit height for mobile
                />
            ) : (
                <button
                    onClick={handleStartScanning}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Start Scanning
                </button>
            )}
        </div>
    );
};

export default QRCodeScanner;