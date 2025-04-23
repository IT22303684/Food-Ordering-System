import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FaPhoneSquareAlt, FaSearch } from 'react-icons/fa';
import MenuCard from '../components/UI/MenuCard';
import { getMenuItemsByRestaurantId, getRestaurantById } from '../utils/api';

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  mainImage?: string;
  description?: string;
  category?: string;
  isAvailable?: boolean;
}

interface MenuSection {
  section: string;
  items: MenuItem[];
}

interface Restaurant {
  _id: string;
  restaurantName: string;
  cuisineType: string;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  exteriorPhoto?: string;
  operatingHours?: string;
  phoneNumber?: string;
  website?: string;
}

const RestaurantMenu: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [menuSections, setMenuSections] = useState<MenuSection[]>([]);
  const [filteredMenuSections, setFilteredMenuSections] = useState<MenuSection[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const [selectedCategory, setSelectedCategory] = useState<string>('All'); // State for category filter

  useEffect(() => {
    const fetchData = async () => {
      if (!restaurantId) return;

      try {
        setLoading(true);

        // Fetch restaurant details
        const restaurantData = await getRestaurantById(restaurantId);
        setRestaurant(restaurantData);

        // Fetch menu items
        const menuItems = await getMenuItemsByRestaurantId(restaurantId);

        // Group menu items by category
        const groupedItems: { [key: string]: MenuItem[] } = {};
        menuItems.forEach((item: MenuItem) => {
          const category = item.category || 'Menu';
          if (!groupedItems[category]) {
            groupedItems[category] = [];
          }
          groupedItems[category].push(item);
        });

        // Convert grouped items to menu sections
        const sections: MenuSection[] = Object.keys(groupedItems).map((category) => ({
          section: category,
          items: groupedItems[category],
        }));

        setMenuSections(sections);
        setFilteredMenuSections(sections); // Initialize filtered sections
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [restaurantId]);

  // Compute unique categories for the filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    menuSections.forEach((section) => uniqueCategories.add(section.section));
    return ['All', ...Array.from(uniqueCategories)];
  }, [menuSections]);

  // Handle search and filter logic
  useEffect(() => {
    let filtered = [...menuSections];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered
        .map((section) => ({
          section: section.section,
          items: section.items.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((section) => section.items.length > 0);
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((section) => section.section === selectedCategory);
    }

    setFilteredMenuSections(filtered);
  }, [searchQuery, selectedCategory, menuSections]);

  if (!restaurantId) {
    return <div className="text-center py-8 text-red-500">Restaurant ID not provided.</div>;
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen flex flex-col">
      {/* Banner Section */}
      <div className="w-full h-64 bg-black flex items-center justify-center relative">
        <img
          src={restaurant?.exteriorPhoto || 'https://via.placeholder.com/1200x300'}
          alt="Restaurant banner background"
          className="absolute left-0 top-0 w-full h-full object-cover opacity-70"
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-2 mt-10">
            {restaurant?.restaurantName || 'Restaurant Name'}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 flex-1">
        {/* Menu Section (Main Content) */}
        <div className="flex-1 space-y-10">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pl-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-3 w-fit rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            
          </div>

          {/* Menu Items */}
          {loading ? (
            <div className="text-center py-8">Loading menu...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : filteredMenuSections.length > 0 ? (
            filteredMenuSections.map((section) => (
              <div key={section.section}>
                <h2 className="text-2xl font-bold mb-4">{section.section}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {section.items.map((item, i) => (
                    <MenuCard key={item._id} item={item} index={i} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">No menu items match your criteria.</div>
          )}
        </div>

        {/* Restaurant Info (Sidebar) */}
        {restaurant && (
          <div className="md:w-1/4 mt-5">
            <RestaurantInfo restaurant={restaurant} />
          </div>
        )}
      </main>
    </div>
  );
};

interface RestaurantInfoProps {
  restaurant: Restaurant;
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ restaurant }) => {
  const address = `${restaurant.address.streetAddress}, ${restaurant.address.city}, ${restaurant.address.state} ${restaurant.address.zipCode}, ${restaurant.address.country}`;

  return (
    <div className="grid grid-cols-1 gap-4 my-8 bg-white">
      {/* Delivery Information */}
      <div className="bg-white p-4 rounded">
        <div className="font-bold text-orange-600 mb-2">Delivery Information</div>
        <div>{address}</div>
        <div>{restaurant.phoneNumber || 'Not available'}</div>
        <div className="mt-2">{restaurant.operatingHours || 'Not available'}</div>
      </div>
      <hr />

      {/* Contact Information */}
      <div className="bg-white p-4 rounded">
        <div className="font-bold text-orange-600 mb-2">Contact Information</div>
        <div>If you have changes or delivery issues, please contact us directly.</div>
        <div className="flex-row flex mt-4">
          <FaPhoneSquareAlt className="text-center m-1" />
          {restaurant.phoneNumber || 'Not available'}
        </div>
      </div>
      <hr />

      {/* Operational Times */}
      <div className="bg-white p-4 rounded">
        <div className="font-bold text-orange-600 mb-2">Operational Times</div>
        <div>{restaurant.operatingHours || 'Not available'}</div>
        <div>Estimated delivery time: ~30 min</div>
      </div>
    </div>
  );
};

export default RestaurantMenu;