import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Banner from '../components/Restaurant Menu/Banner';
import RestaurantInfo from '../components/Restaurant Menu/RestaurantInfo';
import MenuCard from '../components/UI/MenuCard'; // Adjust the import path as needed
import { getMenuItemsByRestaurantId } from '../utils/api'; // Adjust the import path as needed

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

const RestaurantMenu: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>(); // Extract restaurantId from URL
  const [menuSections, setMenuSections] = useState<MenuSection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!restaurantId) return;

      try {
        setLoading(true);
        const menuItems = await getMenuItemsByRestaurantId(restaurantId);

        // Group menu items by category
        const groupedItems: { [key: string]: MenuItem[] } = {};

        menuItems.forEach((item: MenuItem) => {
          const category = item.category || 'Menu'; // Default to 'Menu' if category is not set
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
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load menu items');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [restaurantId]);

  if (!restaurantId) {
    return <div className="text-center py-8 text-red-500">Restaurant ID not provided.</div>;
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen flex flex-col">
      {/* Banner Section */}
      <Banner />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex flex-col gap-8 flex-1">
        {/* Menu Section (Main Content) */}
        <div className="flex-1 space-y-10">
          {loading ? (
            <div className="text-center py-8">Loading menu...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : menuSections.length > 0 ? (
            menuSections.map((section) => (
              <div key={section.section}>
                <h2 className="text-2xl font-bold mb-4">{section.section}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {section.items.map((item, i) => (
                    <MenuCard key={item._id} item={item} index={i} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">No menu items available for this restaurant.</div>
          )}
        </div>

        {/* Restaurant Info (Sidebar) */}
        <div className="md:w-1/3">
          <RestaurantInfo />
        </div>
      </main>
    </div>
  );
};

export default RestaurantMenu;