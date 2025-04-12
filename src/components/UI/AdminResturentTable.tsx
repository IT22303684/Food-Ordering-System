import React, { useState } from "react";

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

interface AdminResturentTableProps {
  headers: string[];
  data: Restaurant[];
}

const AdminResturentTable: React.FC<AdminResturentTableProps> = ({ headers, data }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Handle delete action
  const handleDelete = (restaurantName: string) => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.filter((restaurant) => restaurant.restaurantName !== restaurantName)
    );
  };

  // Handle edit action (example placeholder)
  const handleEdit = (restaurantName: string) => {
    alert(`Edit functionality for ${restaurantName} not implemented yet.`);
  };

  // Filter restaurants based on search term
  const filteredRestaurants = restaurants.filter((restaurant) =>
    Object.values(restaurant).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
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
      <div className="hidden lg:block p-5 w-full text-sm rounded-2xl overflow-x-auto bg-gray-100 dark:bg-gray-600">
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
                key={restaurant.restaurantName}
                className={`border-b border-gray-200 dark:border-gray-500 ${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-600"
                    : "bg-gray-100 dark:bg-gray-700"
                } hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors`}
              >
                {Object.values(restaurant).map((value, idx) => (
                  <td key={idx} className="py-4 px-6 text-gray-800 dark:text-white">
                    {value}
                  </td>
                ))}
                <td className="py-4 px-6 flex space-x-2">
                  <button
                    onClick={() => handleEdit(restaurant.restaurantName)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(restaurant.restaurantName)}
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
      <div className="lg:hidden p-5 space-y-4 overflow-y-scroll h-full">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant.restaurantName}
            className="border rounded-xl p-4 bg-gray-100 shadow-md hover:shadow-lg transition-shadow border-gray-200 dark:bg-gray-600 dark:border-gray-500"
          >
            {Object.entries(restaurant).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">{key}:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{value}</span>
              </div>
            ))}
            {/* Actions */}
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleEdit(restaurant.restaurantName)}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(restaurant.restaurantName)}
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
