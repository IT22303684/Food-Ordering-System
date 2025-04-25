import { useState, useEffect } from 'react';
import ResturentTitle from '../../components/UI/ResturentTitle';
import MenuItemsTable from '../../components/restaurants/MenuItemsTable';
import { getProfile, getMenuItemsByRestaurantId } from '../../utils/api';

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
    thumbnailImage?: string;
    isAvailable: boolean;
}

const AllMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        // Fetch user profile to get userId (assuming userId = restaurantId)
        const profile = await getProfile();
        const restaurantId = profile._id;

        // Fetch menu items (authenticated request)
        const items = await getMenuItemsByRestaurantId(restaurantId, true);

        // Map backend response to MenuItem interface
        const formattedItems: MenuItem[] = items.map((item: any) => ({
          id: item._id,
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          imageUrl: item.mainImage || 'https://via.placeholder.com/300x200',
          thumbnailImage: item.thumbnailImage || 'https://via.placeholder.com/50x50',
          isAvailable: item.isAvailable,
        }));

        setMenuItems(formattedItems);
        setTotalPages(1); // Update if API supports pagination
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load menu items. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-4">
      <ResturentTitle text="Menu Items" />
      {loading && <div className="text-center p-4 text-gray-600 dark:text-gray-300">Loading...</div>}
      {error && <div className="text-center p-4 text-red-500">{error}</div>}
      {!loading && !error && (
        <>
          <MenuItemsTable data={menuItems} />
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg ${
                page === 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-500 text-white hover:bg-indigo-600'
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-800 dark:text-gray-200">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-lg ${
                page === totalPages
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-500 text-white hover:bg-indigo-600'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllMenuItems;