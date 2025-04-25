import { useState, useEffect } from 'react';
import ResturentItemCard from '../../components/restaurants/ResturentItemCard';
import ResturentTitle from '../../components/UI/ResturentTitle';
import EditMenuItemModal from '../../components/restaurants/EditMenuItemModal';
import { getProfile, getMenuItemsByRestaurantId } from '../../utils/api';

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
    isAvailable: boolean;
}

const ManageMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Step 1: Fetch user profile to get userId (assuming userId = restaurantId)
        const profile = await getProfile();
        const fetchedRestaurantId = profile._id; // Assuming _id is the userId/restaurantId
        setRestaurantId(fetchedRestaurantId);

        // Step 2: Fetch menu items (authenticated request)
        const items = await getMenuItemsByRestaurantId(fetchedRestaurantId, true);

        // Map backend response to MenuItem interface
        const formattedItems: MenuItem[] = items.map((item: any) => ({
          id: item._id,
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          imageUrl: item.mainImage || 'https://via.placeholder.com/300x200',
          isAvailable: item.isAvailable,
        }));

        setMenuItems(formattedItems);
        setFilteredItems(formattedItems); // Initialize filtered items
      } catch (err: any) {
        setError(err.message || 'Failed to load menu items');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Handle search and category filtering
  useEffect(() => {
    let filtered = menuItems;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory, menuItems]);

  const handleEdit = (item: MenuItem) => {
    setEditItem(item); // Open modal with item data
  };

  const handleDelete = (id: string) => {
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setFilteredItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSaveEdit = (updatedItem: MenuItem) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setFilteredItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditItem(null); // Close modal
  };

  const handleCloseModal = () => {
    setEditItem(null); // Close modal
  };

  const categories = [
    'All',
    'Main Course',
    'Appetizers',
    'Desserts',
    'Sides',
    'Beverages',
  ];

  if (loading) {
    return (
      <div className="p-4">
        <ResturentTitle text="All Menu Items" />
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <ResturentTitle text="All Menu Items" />
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4">
        <ResturentTitle text="Menu Items Management " />
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-1/2 p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-1/4 p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ResturentItemCard
              key={item.id}
              data={item}
              restaurantId={restaurantId || ''}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            No menu items found.
          </div>
        )}
      </div>
      {editItem && (
        <EditMenuItemModal
          item={editItem}
          restaurantId={restaurantId || ''}
          onClose={handleCloseModal}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
};

export default ManageMenuItems;