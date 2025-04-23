
import React, { useState } from 'react';
import { deleteRestaurant, updateRestaurantStatus } from '../../utils/api';
import ConfirmationModal from './ConfirmationModal';

export interface Restaurant {
  _id: string;
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
  status: string;
}

interface AdminResturentTableProps {
  headers: string[];
  data: Restaurant[];
  onDelete: (restaurantId: string) => void;
}

const AdminResturentTable: React.FC<AdminResturentTableProps> = ({ headers, data, onDelete }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ title: '', message: '', onConfirm: () => {} });

  // Derived isBlocked property
  const isRestaurantBlocked = (restaurant: Restaurant) => restaurant.status === 'reject';

  // Open confirmation modal
  const openConfirmationModal = (title: string, message: string, onConfirm: () => void) => {
    setModalConfig({ title, message, onConfirm });
    setIsModalOpen(true);
  };

  // Handle delete action
  const handleDelete = (restaurantId: string, restaurantName: string) => {
    openConfirmationModal(
      'Confirm Delete',
      `Are you sure you want to delete ${restaurantName}? This action cannot be undone.`,
      async () => {
        try {
          await deleteRestaurant(restaurantId);
          setRestaurants((prevRestaurants) =>
            prevRestaurants.filter((restaurant) => restaurant._id !== restaurantId)
          );
          onDelete(restaurantId);
          setIsModalOpen(false);
        } catch (error: any) {
          alert(`Failed to delete restaurant: ${error.message}`);
          console.error('Delete error:', error);
        }
      }
    );
  };

  // Handle block/unblock action
  const handleBlock = (restaurantId: string, restaurantName: string, isBlocked: boolean) => {
    const newStatus = isBlocked ? 'approved' : 'blocked';
    openConfirmationModal(
      isBlocked ? 'Confirm Unblock' : 'Confirm Block',
      `Are you sure you want to ${isBlocked ? 'unblock' : 'block'} ${restaurantName}?`,
      async () => {
        try {
          await updateRestaurantStatus(restaurantId, newStatus);
          setRestaurants((prevRestaurants) =>
            prevRestaurants.map((restaurant) =>
              restaurant._id === restaurantId ? { ...restaurant, status: newStatus } : restaurant
            )
          );
          setIsModalOpen(false);
        } catch (error: any) {
          alert(`Failed to ${isBlocked ? 'unblock' : 'block'} restaurant: ${error.message}`);
          console.error('Block error:', error);
        }
      }
    );
  };

  // Filter restaurants based on search term
  const filteredRestaurants = restaurants.filter((restaurant) =>
    Object.values(restaurant).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText="Confirm"
        cancelText="Cancel"
      />

      {/* Search Input */}
      <div className="p-5 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Desktop Table View with Horizontal Scroll */}
      <div className="hidden lg:block p-5 w-full text-sm rounded-md overflow-x-auto bg-white dark:bg-gray-600">
        <table className="min-w-[1200px] w-full">
          <thead className="bg-gray-200 border-gray-200 dark:bg-gray-700 dark:border-gray-500">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="text-start py-4 px-6 font-semibold text-gray-600 dark:text-gray-200"
                >
                  {header}
                </th>
              ))}
              <th className="text-start py-4 px-6 font-semibold text-gray-600 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRestaurants.map((restaurant, index) => (
              <tr
                key={restaurant._id}
                className={`border-b border-gray-200 dark:border-gray-500 ${
                  isRestaurantBlocked(restaurant)
                    ? 'bg-red-100 dark:bg-red-900'
                    : index % 2 === 0
                    ? 'bg-gray-50 dark:bg-gray-600'
                    : 'bg-gray-100 dark:bg-gray-700'
                } hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors`}
              >
                {Object.values(restaurant)
                  .slice(1) // Skip _id
                  .map((value, idx) => (
                    <td key={idx} className="py-4 px-6 text-gray-800 dark:text-white">
                      {value}
                    </td>
                  ))}
                <td className="py-4 px-6 flex space-x-2">
                  <button
                    onClick={() =>
                      handleBlock(
                        restaurant._id,
                        restaurant.restaurantName,
                        isRestaurantBlocked(restaurant)
                      )
                    }
                    className={`px-3 py-1 ${
                      isRestaurantBlocked(restaurant)
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-orange-500 hover:bg-orange-600'
                    } text-white rounded-lg transition-colors`}
                  >
                    {isRestaurantBlocked(restaurant) ? 'Unblock' : 'Block'}
                  </button>
                  <button
                    onClick={() => handleDelete(restaurant._id, restaurant.restaurantName)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Grid View */}
      <div className="lg:hidden p-5 space-y-4  overflow-y-scroll h-full">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className={`border rounded-md p-4 shadow-md bg-white hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-500 ${
              isRestaurantBlocked(restaurant) ? 'bg-red-100 dark:bg-red-900' : 'bg-gray-100 dark:bg-gray-600'
            }`}
          >
            {Object.entries(restaurant)
              .slice(1) // Skip _id
              .map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-1">
                  <span className="font-medium text-gray-800 dark:text-white">{key}:</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{value}</span>
                </div>
              ))}
            {/* Actions */}
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() =>
                  handleBlock(
                    restaurant._id,
                    restaurant.restaurantName,
                    isRestaurantBlocked(restaurant)
                  )
                }
                className={`px-3 py-1 ${
                  isRestaurantBlocked(restaurant)
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-orange-500 hover:bg-orange-600'
                } text-white rounded-lg transition-colors`}
              >
                {isRestaurantBlocked(restaurant) ? 'Unblock' : 'Block'}
              </button>
              <button
                onClick={() => handleDelete(restaurant._id, restaurant.restaurantName)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredRestaurants.length === 0 && (
        <div className="p-5 text-center text-gray-600 dark:text-gray-300">
          No restaurants found.
        </div>
      )}
    </>
  );
};

export default AdminResturentTable;
