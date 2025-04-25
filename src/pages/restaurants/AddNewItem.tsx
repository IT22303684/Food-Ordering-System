import { useState, useEffect } from 'react';
import RestaurantTitle from "../../components/UI/ResturentTitle";
import CategorySelect from "../../components/UI/CategorySelect";
import { addMenuItem, getProfile } from "../../utils/api";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string; // Category _id
  imageUrl?: string;
  isAvailable: boolean;
}

const AddNewItem = () => {
  const [formData, setFormData] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    isAvailable: true,
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [restaurantId, setRestaurantId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch restaurantId on mount
  useEffect(() => {
    const fetchRestaurantId = async () => {
      try {
        setLoading(true);
        const profile = await getProfile();
        setRestaurantId(profile._id);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load restaurant profile.");
        console.error("Fetch profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantId();
  }, []);

  // Handle text and checkbox input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  // Handle file input changes
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'mainImage' | 'thumbnailImage'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'mainImage') setMainImage(file);
      else setThumbnailImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addMenuItem(restaurantId, formData, {
        mainImage: mainImage || undefined,
        thumbnailImage: thumbnailImage || undefined,
      });
      const newItem: MenuItem = {
        id: response.menuItem._id,
        name: response.menuItem.name,
        description: response.menuItem.description,
        price: response.menuItem.price,
        category: response.menuItem.category,
        imageUrl: response.menuItem.mainImage,
        isAvailable: response.menuItem.isAvailable,
      };
      console.log('New Menu Item:', newItem);

      // Reset form after submission
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
        isAvailable: true,
      });
      setMainImage(null);
      setThumbnailImage(null);
      setSubmitError(null);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to add menu item.");
      console.error("Add menu item error:", err);
    }
  };

  return (
    <>
      <div className='p-4'>
        <RestaurantTitle text="Add Menu Item"/>
      </div>

      <div className="max-w-2xl mx-auto">
        {loading && <div className="text-center p-4 text-gray-600 dark:text-gray-300">Loading...</div>}
        {error && <div className="text-center p-4 text-red-500">{error}</div>}
        {!loading && !error && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
            {submitError && <div className="text-red-500 mb-4">{submitError}</div>}
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
              <CategorySelect
                restaurantId={restaurantId}
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            {/* Main Image */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">Main Image (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'mainImage')}
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none"
              />
            </div>

            {/* Thumbnail Image */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">Thumbnail Image (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'thumbnailImage')}
                className="w-full py-2 px-3 border rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none"
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
        )}
      </div>
    </>
  );
};

export default AddNewItem;