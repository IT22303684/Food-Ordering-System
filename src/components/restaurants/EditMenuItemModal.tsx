import { useState } from 'react';
import { updateMenuItem } from '../../utils/api';

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
    isAvailable: boolean;
}

interface EditMenuItemModalProps {
  item: MenuItem;
  restaurantId: string;
  onClose: () => void;
  onSave: (updatedItem: MenuItem) => void;
}

const EditMenuItemModal = ({ item, restaurantId, onClose, onSave }: EditMenuItemModalProps) => {
  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description,
    price: item.price,
    category: item.category,
    isAvailable: item.isAvailable,
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'mainImage' | 'thumbnailImage') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'mainImage') setMainImage(file);
      else setThumbnailImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedData = await updateMenuItem(restaurantId, item.id, formData, {
        mainImage: mainImage || undefined,
        thumbnailImage: thumbnailImage || undefined,
      });

      const updatedItem: MenuItem = {
        id: updatedData.menuItem._id,
        name: updatedData.menuItem.name,
        description: updatedData.menuItem.description,
        price: updatedData.menuItem.price,
        category: updatedData.menuItem.category,
        imageUrl: updatedData.menuItem.mainImage || 'https://via.placeholder.com/300x200',
        isAvailable: updatedData.menuItem.isAvailable,
      };

      onSave(updatedItem);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update menu item');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Edit Menu Item</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-gray-300">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-gray-300">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="Main Course">Main Course</option>
              <option value="Appetizers">Appetizers</option>
              <option value="Desserts">Desserts</option>
              <option value="Sides">Sides</option>
              <option value="Beverages">Beverages</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-gray-300">Available</label>
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-gray-300">Main Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'mainImage')}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-gray-300">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'thumbnailImage')}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuItemModal;