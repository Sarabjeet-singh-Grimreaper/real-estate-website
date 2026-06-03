import React, { useState } from 'react';
import PropertyList from './components/PropertyList'; // Ensure this matches your actual file name
import AddPropertyForm from './components/AddPropertyForm';

export default function App() {
  // State to toggle between the list and the upload form
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 
            className="text-2xl font-extrabold text-blue-600 cursor-pointer"
            onClick={() => setShowForm(false)}
          >
            RealEstate Demo
          </h1>
          
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all duration-200"
          >
            {showForm ? 'View Properties' : '+ Publish Property'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto p-4 pb-12">
        {showForm ? (
          <AddPropertyForm />
        ) : (
          <PropertyList />
        )}
      </main>
    </div>
  );
}