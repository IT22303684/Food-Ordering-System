import { useState } from 'react';
import { MenuItem } from '../../pages/restaurants/AllItem'; 
import ResturentTitle from "../../components/UI/ResturentTitle";

const AddNewItem = () => {
  const [formData, setFormData] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    isAvailable: true,
  });

  // Categories for dropdown
  const categories = ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Sides'];

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement; // Type assertion to handle checkbox
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: MenuItem = {
      ...formData,
      id: Date.now().toString(), // Simple ID generation, replace with UUID in production
    };
    console.log('New Menu Item:', newItem);
    // Here you would typically send this to your backend API
    // e.g., await fetch('/api/menu-items', { method: 'POST', body: JSON.stringify(newItem) });

    // Reset form after submission
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      imageUrl: '',
      isAvailable: true,
    });
  };

  return (
    <>
    <div className='p-4'>
            <ResturentTitle text="Add Menu Item"/>
    </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl ">
          {/* Menu Name and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">Menu Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter item name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter price"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter item description"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">Image URL (Optional)</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter image URL"
            />
          </div>

          {/* Availability Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="text-sm font-bold text-gray-700 dark:text-gray-200">Available</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors text-center"
          >
            Add Item
          </button>
        </form>
      </div>
      </>

  );
};

export default AddNewItem;