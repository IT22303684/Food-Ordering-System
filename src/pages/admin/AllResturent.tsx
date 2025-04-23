import React, { useEffect, useState } from 'react';
import AdminResturentTable from '../../components/UI/AdminResturentTable';
import ResturentTitle from '../../components/UI/ResturentTitle';
import { getAllRestaurants } from '../../utils/api';

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

// table headers for restaurant details
const tableHeaders: string[] = [
  'Restaurant Name',
  'Contact Person',
  'Phone Number',
  'Business Type',
  'Cuisine Type',
  'Operating Hours',
  'Delivery Radius',
  'Tax ID',
  'Street Address',
  'City',
  'Province',
  'Zip Code',
  'Country',
  'Status',
  'Action'
];

const RestaurantDetailsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch restaurants on component mount
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await getAllRestaurants(1, 10); // Adjust page/limit as needed
        // Map API response to match Restaurant interface
        const formattedRestaurants: Restaurant[] = response.data.map((item: any) => ({
          _id: item._id,
          restaurantName: item.restaurantName,
          contactPerson: item.contactPerson,
          phoneNumber: item.phoneNumber,
          businessType: item.businessType,
          cuisineType: item.cuisineType,
          operatingHours: item.operatingHours,
          deliveryRadius: item.deliveryRadius,
          taxId: item.taxId,
          streetAddress: item.address.streetAddress,
          city: item.address.city,
          state: item.address.state,
          zipCode: item.address.zipCode,
          country: item.address.country,
          email: item.email,
          status: item.status || 'approved',
        }));
        setRestaurants(formattedRestaurants);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load restaurants. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Handle delete action from table
  const handleDelete = (restaurantId: string) => {
    setRestaurants((prev) => prev.filter((restaurant) => restaurant._id !== restaurantId));
  };

  return (
    <div className="p-4">
      <ResturentTitle text="Restaurant Details" />
      {loading && <div className="text-center p-4 text-gray-600 dark:text-gray-300">Loading...</div>}
      {error && <div className="text-center p-4 text-red-500">{error}</div>}
      {!loading && !error && (
        <AdminResturentTable headers={tableHeaders} data={restaurants} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default RestaurantDetailsPage;
