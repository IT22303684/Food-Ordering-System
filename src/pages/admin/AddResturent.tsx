import { useState } from 'react';
import ResturentTitle from "../../components/UI/ResturentTitle";

export interface Restaurant {
  restaurantName: string;
  contactPerson: string;
  phoneNumber: string;
  businessType: string;
  cuisineType: string;
  operatingHours: string;
  deliveryRadius: string;
  taxId: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  email: string;
}

const AddResturent = () => {
  const [formData, setFormData] = useState<Restaurant>({
    restaurantName: '',
    contactPerson: '',
    phoneNumber: '',
    businessType: '',
    cuisineType: '',
    operatingHours: '',
    deliveryRadius: '',
    taxId: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    email: '',
  });

  // Options for dropdowns
  const businessTypes = ['Restaurant', 'Fast Food Chain', 'Cafe', 'Food Truck', 'Catering'];
  const cuisineTypes = ['Italian', 'American', 'Mexican', 'Chinese', 'Indian', 'Other'];

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRestaurant: Restaurant = { ...formData };
    console.log('New Restaurant:', newRestaurant);
    // Replace with API call in production, e.g.:
    // await fetch('/api/restaurants', { method: 'POST', body: JSON.stringify(newRestaurant) });

    // Reset form after submission
    setFormData({
      restaurantName: '',
      contactPerson: '',
      phoneNumber: '',
      businessType: '',
      cuisineType: '',
      operatingHours: '',
      deliveryRadius: '',
      taxId: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      email: '',
    });
  };

  return (
    <>
      <div className="p-4">
        <ResturentTitle text="Add New Restaurant" />
      </div>

      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl"
        >
          {/* Restaurant Name and Contact Person */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                Restaurant Name
              </label>
              <input
                type="text"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter restaurant name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter contact person"
              />
            </div>
          </div>

          {/* Phone Number and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                pattern="\+?[1-9]\d{1,14}" // Basic phone number validation
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="+1-123-456-7890"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter email"
              />
            </div>
          </div>

          {/* Business Type and Cuisine Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                Business Type
              </label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select business type</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                Cuisine Type
              </label>
              <select
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select cuisine type</option>
                {cuisineTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Operating Hours and Delivery Radius */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                Operating Hours
              </label>
              <input
                type="text"
                name="operatingHours"
                value={formData.operatingHours}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., 10 AM - 10 PM"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                Delivery Radius
              </label>
              <input
                type="text"
                name="deliveryRadius"
                value={formData.deliveryRadius}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., 5 miles"
              />
            </div>
          </div>

          {/* Tax ID */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
              Tax ID
            </label>
            <input
              type="text"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              required
              className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter tax ID"
            />
          </div>

          {/* Address Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter street address"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter city"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter state"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                Zip Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                pattern="\d{5}(-\d{4})?" // Basic US zip code validation
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter zip code"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter country"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors text-center"
          >
            Add Restaurant
          </button>
        </form>
      </div>
    </>
  );
};

export default AddResturent;