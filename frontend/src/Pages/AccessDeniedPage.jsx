import React from "react";

const UnauthorizedAccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-4">403</h1>
        <h2 className="text-2xl font-bold mb-4">Unauthorized Access</h2>
        <p className="text-lg mb-6">
          You do not have permission to access this page. Please contact your
          administrator if you believe this is a mistake.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-200"
        >
          Go to Home
        </button>
      </div>
      <div className="mt-8">
        <img
          src="https://via.placeholder.com/400x300.png?text=Unauthorized+Access"
          alt="Unauthorized Access"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
