import React, { useState, useRef } from 'react';

export default function AddPropertyForm() {
  const [formData, setFormData] = useState({
    Title: '',
    Location: '',
    Price: '',
    'Image URL': ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setImageFile({
          name: file.name,
          type: file.type,
          base64: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const payload = {
      ...formData,
      imageBase64: imageFile ? imageFile.base64 : null,
      imageName: imageFile ? imageFile.name : null,
      mimeType: imageFile ? imageFile.type : null
    };

    try {
      // Note: We will replace this URL with your Google Apps Script Web App URL later
      const SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL';
      
      if (SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL') {
        // Mocking submission if the URL hasn't been added yet
        setTimeout(() => {
          setStatus('success');
          setFormData({ Title: '', Location: '', Price: '', 'Image URL': '' });
          setImageFile(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
          setTimeout(() => setStatus('idle'), 3000);
        }, 1000);
        return;
      }

      // Send data to Google Sheets
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Bypasses CORS issues with Google Scripts
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      setStatus('success');
      setFormData({ Title: '', Location: '', Price: '', 'Image URL': '' });
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">🏠 Publish New Property</h2>
      
      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md font-medium">
          ✅ Property published successfully! It will now appear on your site.
        </div>
      )}
      
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md font-medium">
          ❌ Something went wrong. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Property Title</label>
          <input type="text" name="Title" value={formData.Title} onChange={handleChange} required 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
            placeholder="e.g., Luxury 3BHK Apartment in Downtown" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
            <input type="text" name="Location" value={formData.Location} onChange={handleChange} required 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
              placeholder="e.g., Mumbai, Maharashtra" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Price</label>
            <input type="text" name="Price" value={formData.Price} onChange={handleChange} required 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
              placeholder="e.g., ₹1.5 Cr or Contact for Price" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Property Image</label>
          <div className="flex flex-col space-y-4 p-5 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all cursor-pointer" />
            
            <div className="flex items-center text-gray-400 before:flex-1 before:border-t before:border-gray-300 before:mr-3 after:flex-1 after:border-t after:border-gray-300 after:ml-3 font-medium text-xs">OR</div>
            
            <input type="url" name="Image URL" value={formData['Image URL']} onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white" 
              placeholder="Paste an existing image URL..." />
          </div>
        </div>

        <button type="submit" disabled={status === 'submitting'} 
          className={`w-full py-3 px-4 text-white font-bold rounded-md shadow-md transition-all ${status === 'submitting' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'}`}>
          {status === 'submitting' ? '⏳ Publishing...' : '🚀 Publish Property'}
        </button>
      </form>
    </div>
  );
}