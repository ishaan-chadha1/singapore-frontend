"use client";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { useState } from "react";
import { useRouter } from "next/router";  // Import useRouter for navigation

export default function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);  // State to store the user's unique ID
  const router = useRouter();  // Initialize the router

  const onSuccess = async (proof) => {
    console.log("Success! World ID verified.");
    console.log("Proof object:", proof);

    const uniqueId = proof.nullifier_hash;  // Extract unique ID from proof
    setUserId(uniqueId);  // Save the unique ID

    setIsAuthenticated(true);
    router.push({
      pathname: '/buy-sell',
      query: { userId: uniqueId },  
    }); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="bg-white bg-opacity-10 backdrop-blur-p-8 rounded-lg max-w-md w-full text-center">
        <h1 className="font-londrina text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Worldcoin Login
        </h1>

        {!isAuthenticated ? (
          <div className="mt-8">
            <IDKitWidget
              app_id="app_da7fe4a0209edf22695b1f66f1c775a0" // Your Worldcoin App ID
              action="genomic_login" // Your Action ID
              verification_level={VerificationLevel.Device}
              handleVerify={(proof) => {
                console.log("Proof:", proof);
              }}
              onSuccess={onSuccess} // Calls onSuccess after verification
            >
              {({ open }) => (
                <button
                  onClick={open}
                  className="font-londrina mt-8 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                >
                  Verify with World ID
                </button>
              )}
            </IDKitWidget>
          </div>
        ) : (
          <div>
            <p className="font-londrina mt-6 text-xl text-green-400">
              You are authenticated!
            </p>
            <p className="font-londrina mt-2 text-lg text-gray-600">
              Your unique ID: {userId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}