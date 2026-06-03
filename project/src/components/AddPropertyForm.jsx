import React, { useState, useRef } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Duplex', 'Penthouse'];
const PROPERTY_STATUS = ['For Sale', 'New Launch', 'Sold Out', 'Limited Units'];
const FEATURES = [
  '24/7 Security', 'Swimming Pool', 'Gym', 'Parking', 'Garden',
  'Modular Kitchen', 'Balcony', 'Power Backup', 'Club House',
  'School Nearby', 'Hospital Nearby', 'Mall Nearby', 'Metro Station'
];

export default function AddPropertyForm() {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    priceValue: '',
    type: 'Apartment',
    status: 'For Sale',
    description: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    features: [],
    imageUrl: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageFile({
          name: file.name,
          type: file.type,
          base64: reader.result.split(',')[1]
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!imagePreview && !formData.imageUrl) newErrors.image = 'Please add an image';
    if (formData.bedrooms && isNaN(formData.bedrooms)) newErrors.bedrooms = 'Must be a number';
    if (formData.bathrooms && isNaN(formData.bathrooms)) newErrors.bathrooms = 'Must be a number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus('submitting');

    const payload = {
      title: formData.title,
      location: formData.location,
      price: formData.price,
      priceValue: parseInt(formData.priceValue) || 0,
      type: formData.type,
      status: formData.status,
      description: formData.description,
      area: formData.area,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
      features: formData.features,
      imageUrl: imagePreview || formData.imageUrl,
      timestamp: new Date().toISOString()
    };

    try {
      const SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL';
      
      if (SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL') {
        console.log('Demo mode - Property would be saved:', payload);
        setTimeout(() => {
          setStatus('success');
          setFormData({
            title: '', location: '', price: '', priceValue: '', type: 'Apartment',
            status: 'For Sale', description: '', area: '', bedrooms: '',
            bathrooms: '', features: [], imageUrl: ''
          });
          setImageFile(null);
          setImagePreview(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
          setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
        return;
      }

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      setStatus('success');
      setFormData({
        title: '', location: '', price: '', priceValue: '', type: 'Apartment',
        status: 'For Sale', description: '', area: '', bedrooms: '',
        bathrooms: '', features: [], imageUrl: ''
      });
      setImageFile(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <div className="bg-white rounded-3xl shadow-2xl border border-gradient-to-r from-sky-100 to-blue-100 overflow-hidden animate-fade-in">
        {/* Animated Header */}
        <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 p-8 sm:p-12 rounded-t-3xl relative overflow-hidden">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-white/10 rounded-full animate-blob"></div>
          <div className="absolute -bottom-8 -right-40 w-80 h-80 bg-white/10 rounded-full animate-blob animation-delay-2000"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 animate-fade-in-up">🏠 Publish New Property</h2>
            <p className="text-blue-100 text-lg animate-fade-in-up">Add details and images to showcase instantly</p>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          {status === 'success' && (
            <div className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300 text-emerald-700 rounded-2xl font-medium flex items-start gap-4 animate-bounce-in shadow-lg">
              <div className="text-4xl animate-bounce">✨</div>
              <div>
                <p className="font-extrabold text-lg">Published Successfully!</p>
                <p className="text-sm text-emerald-600 mt-1">Property appears on website within seconds.</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300 text-red-700 rounded-2xl font-medium flex items-start gap-4 animate-bounce-in">
              <AlertCircle className="w-6 h-6" />
              <div>
                <p className="font-extrabold">Error!</p>
                <p className="text-sm text-red-600">Please try again.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="border-b-2 pb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">📋</span> Basic Information
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-sky-300 outline-none transition-all text-base font-medium ${
                      errors.title ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-sky-300'
                    }`}
                    placeholder="e.g., Luxury 3BHK Villa"
                  />
                  {errors.title && <p className="text-red-600 text-sm mt-2">❌ {errors.title}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-sky-300 outline-none transition-all text-base font-medium ${
                        errors.location ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-sky-300'
                      }`}
                      placeholder="e.g., Bangalore"
                    />
                    {errors.location && <p className="text-red-600 text-sm mt-2">❌ {errors.location}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Type *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 hover:border-sky-300 rounded-xl focus:ring-4 focus:ring-sky-300 outline-none transition-all text-base font-medium"
                    >
                      {PROPERTY_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Price *</label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-sky-300 outline-none transition-all text-base font-medium ${
                        errors.price ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-sky-300'
                      }`}
                      placeholder="e.g., ₹2.4 Cr"
                    />
                    {errors.price && <p className="text-red-600 text-sm mt-2">❌ {errors.price}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Status *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 hover:border-sky-300 rounded-xl focus:ring-4 focus:ring-sky-300 outline-none transition-all text-base font-medium"
                    >
                      {PROPERTY_STATUS.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="border-b-2 pb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">🏢</span> Property Details
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-sky-300 outline-none transition-all resize-none text-base font-medium ${
                      errors.description ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-sky-300'
                    }`}
                    placeholder="Describe your property..."
                  />
                  {errors.description && <p className="text-red-600 text-sm mt-2">❌ {errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Area (sq ft)</label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 hover:border-sky-300 rounded-xl focus:ring-4 focus:ring-sky-300 outline-none transition-all text-base font-medium"
                      placeholder="e.g., 3200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Bedrooms</label>
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      min="0"
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-sky-300 outline-none transition-all text-base font-medium ${
                        errors.bedrooms ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-sky-300'
                      }`}
                      placeholder="e.g., 4"
                    />
                    {errors.bedrooms && <p className="text-red-600 text-sm mt-2">❌ {errors.bedrooms}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Bathrooms</label>
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      min="0"
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-sky-300 outline-none transition-all text-base font-medium ${
                        errors.bathrooms ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-sky-300'
                      }`}
                      placeholder="e.g., 3"
                    />
                    {errors.bathrooms && <p className="text-red-600 text-sm mt-2">❌ {errors.bathrooms}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="border-b-2 pb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">⭐</span> Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {FEATURES.map(feature => (
                  <label 
                    key={feature} 
                    className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-sky-400 hover:bg-sky-50 cursor-pointer transition-all duration-300 transform hover:scale-105"
                  >
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="w-5 h-5 text-sky-600 rounded"
                    />
                    <span className="text-sm font-semibold text-gray-700">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="pb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">📸</span> Images
              </h3>

              {imagePreview && (
                <div className="mb-8 relative animate-bounce-in">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-sky-300">
                    <img src={imagePreview} alt="Preview" className="w-full h-72 object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setImageFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-all hover:scale-110"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div className="border-4 border-dashed border-sky-300 rounded-2xl p-10 text-center hover:border-sky-500 hover:bg-sky-50 transition-all cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="flex flex-col items-center gap-4 cursor-pointer">
                    <Upload className="w-16 h-16 text-sky-400 animate-float" />
                    <div>
                      <p className="font-bold text-gray-800 text-lg">Upload Image</p>
                      <p className="text-gray-600 mt-1">Drag & drop or click</p>
                      <p className="text-xs text-gray-500 mt-3">Max 5MB (JPG, PNG, GIF)</p>
                    </div>
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                  <span className="text-gray-600 font-bold px-3">OR</span>
                  <div className="flex-1 h-0.5 bg-gradient-to-l from-gray-300 to-transparent"></div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 hover:border-sky-300 rounded-xl focus:ring-4 focus:ring-sky-300 outline-none transition-all text-base font-medium"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {errors.image && <p className="text-red-600 text-sm mt-4 font-semibold">❌ {errors.image}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`flex-1 py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 ${
                  status === 'submitting'
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl'
                }`}
              >
                {status === 'submitting' ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <span>🚀</span> Publish Now
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
