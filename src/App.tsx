import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">TrashDash</h1>
        <p className="text-gray-600 mb-6">
          Welcome to TrashDash! Track, reduce, and manage your waste with ease.
        </p>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
          Get Started
        </button>
      </div>
      <footer className="mt-8 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} TrashDash. All rights reserved.
      </footer>
    </div>
  );
}

export default App;