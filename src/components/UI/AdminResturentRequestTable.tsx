

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
  businessLicense?: File | null;
  foodSafetyCert?: File | null;
  exteriorPhoto?: File | null;
  logo?: File | null;
  status?: string; // Added status field
}

interface AdminResturentTableProps {
  headers: string[];
  data: Restaurant[];
}

const AdminResturentRequestTable: React.FC<AdminResturentTableProps> = ({ headers, data }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Handle approve action
  const handleApprove = (restaurantName: string) => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.map((restaurant) =>
        restaurant.restaurantName === restaurantName
          ? { ...restaurant, status: "Approved" }
          : restaurant
      )
    );
  };

  // Handle reject action with confirmation
  const handleReject = (restaurantName: string) => {
    if (window.confirm(`Are you sure you want to reject ${restaurantName}?`)) {
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((restaurant) =>
          restaurant.restaurantName === restaurantName
            ? { ...restaurant, status: "Rejected" }
            : restaurant
        )
      );
    }
  };

  // Filter restaurants based on search term
  const filteredRestaurants = restaurants.filter((restaurant) =>
    [
      restaurant.restaurantName,
      restaurant.contactPerson,
      restaurant.email,
      restaurant.cuisineType,
    ].some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort restaurants by restaurantName
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    const nameA = a.restaurantName.toLowerCase();
    const nameB = b.restaurantName.toLowerCase();
    return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Get status color styles
  const getStatusStyles = (status: string) => {
    const baseStyles = "px-2 py-1 text-xs font-semibold rounded-lg";
    switch (status) {
      case "Approved":
        return `${baseStyles} bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-200`;
      case "Rejected":
        return `${baseStyles} bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-200`;
      case "Pending":
      default:
        return `${baseStyles} bg-yellow-100 text-yellow-600 dark:bg-yellow-700 dark:text-yellow-200`;
    }
  };

  return (
    <>
      {/* Search and Sort Controls */}
      <div className="p-5 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={toggleSortOrder}
          className="w-full sm:w-auto px-4 py-2 bg-gray-200 border-gray-200 dark:bg-gray-800 dark:border-gray-500 rounded-lg transition-colors"
        >
          Sort by Name {sortOrder === "asc" ? "↑" : "↓"}
        </button>
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
            </tr>
          </thead>
          <tbody>
            {sortedRestaurants.map((restaurant, index) => (
              <tr
                key={restaurant.restaurantName}
                className={`border-b border-gray-200 dark:border-gray-500 ${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-600"
                    : "bg-gray-100 dark:bg-gray-700"
                } hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors`}
              >
                <td className="py-4 px-6 text-gray-800 dark:text-white">
                  {restaurant.restaurantName}
                </td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">
                  {restaurant.contactPerson}
                </td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">
                  {restaurant.phoneNumber}
                </td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">
                  {restaurant.businessType}
                </td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">
                  {restaurant.cuisineType}
                </td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">
                  {restaurant.operatingHours}
                </td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">
                  {restaurant.deliveryRadius}
                </td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">{restaurant.taxId}</td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">
                  {restaurant.streetAddress}
                </td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">{restaurant.city}</td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">{restaurant.state}</td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">
                  {restaurant.zipCode}
                </td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">{restaurant.country}</td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">{restaurant.email}</td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">
                  {restaurant.businessLicense ? (
                    <a
                      href={URL.createObjectURL(restaurant.businessLicense)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      License
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">
                  {restaurant.foodSafetyCert ? (
                    <a
                      href={URL.createObjectURL(restaurant.foodSafetyCert)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Cert
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">
                  {restaurant.exteriorPhoto ? (
                    <a
                      href={URL.createObjectURL(restaurant.exteriorPhoto)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Photo
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">
                  {restaurant.logo ? (
                    <a
                      href={URL.createObjectURL(restaurant.logo)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Logo
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="py-4 px-6 text-gray-800 dark:text-white">
                  <span className={getStatusStyles(restaurant.status || "Pending")}>
                    {restaurant.status || "Pending"}
                  </span>
                </td>
                <td className="py-4 px-6 flex space-x-2">
                  <button
                    onClick={() => handleApprove(restaurant.restaurantName)}
                    disabled={restaurant.status !== "Pending"}
                    className={`px-3 py-1 rounded-lg text-white transition-colors ${
                      restaurant.status !== "Pending"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(restaurant.restaurantName)}
                    disabled={restaurant.status !== "Pending"}
                    className={`px-3 py-1 rounded-lg text-white transition-colors ${
                      restaurant.status !== "Pending"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Grid View */}
      <div className="lg:hidden p-5 space-y-4 overflow-y-scroll h-full">
        {sortedRestaurants.map((restaurant) => (
          <div
            key={restaurant.restaurantName}
            className="border rounded-xl p-4 bg-gray-100 shadow-md hover:shadow-lg transition-shadow border-gray-200 dark:bg-gray-600 dark:border-gray-500"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">Restaurant Name:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.restaurantName}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">Contact Person:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.contactPerson}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">Phone Number:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.phoneNumber}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">Business Type:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.businessType}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">Cuisine Type:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.cuisineType}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">Operating Hours:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.operatingHours}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">Delivery Radius:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.deliveryRadius}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">Tax ID:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{restaurant.taxId}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">Street Address:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.streetAddress}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">City:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{restaurant.city}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">State:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{restaurant.state}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">Zip Code:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.zipCode}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">Country:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.country}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">Email:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{restaurant.email}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">Business License:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.businessLicense ? (
                    <a
                      href={URL.createObjectURL(restaurant.businessLicense)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      License
                    </a>
                  ) : (
                    "N/A"
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">
                  Food Safety Cert:
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.foodSafetyCert ? (
                    <a
                      href={URL.createObjectURL(restaurant.foodSafetyCert)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Cert
                    </a>
                  ) : (
                    "N/A"
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">Exterior Photo:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.exteriorPhoto ? (
                    <a
                      href={URL.createObjectURL(restaurant.exteriorPhoto)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Photo
                    </a>
                  ) : (
                    "N/A"
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">Logo:</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.logo ? (
                    <a
                      href={URL.createObjectURL(restaurant.logo)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Logo
                    </a>
                  ) : (
                    "N/A"
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-800 dark:text-white">Status:</span>
                <span className={getStatusStyles(restaurant.status || "Pending")}>
                  {restaurant.status || "Pending"}
                </span>
              </div>
            </div>
            {/* Actions */}
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleApprove(restaurant.restaurantName)}
                disabled={restaurant.status !== "Pending"}
                className={`px-3 py-1 rounded-lg text-white transition-colors ${
                  restaurant.status !== "Pending"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(restaurant.restaurantName)}
                disabled={restaurant.status !== "Pending"}
                className={`px-3 py-1 rounded-lg text-white transition-colors ${
                  restaurant.status !== "Pending"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {sortedRestaurants.length === 0 && (
        <div className="p-5 text-center text-gray-600 dark:text-gray-300">
          No restaurants found.
        </div>
      )}
    </>
  );
};

export default AdminResturentRequestTable;
