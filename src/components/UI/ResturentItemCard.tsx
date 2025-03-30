import { MenuItem } from "../../pages/restaurants/AllItem"; // Adjust path as needed

interface ResturentItemCardProps {
  data: MenuItem;
}

const ResturentItemCard = ({ data }: ResturentItemCardProps) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden transition-transform hover:scale-105">
      <img 
        src={data.imageUrl || "https://via.placeholder.com/300x200"} 
        alt={data.name} 
        className="w-full h-48 object-cover rounded-t-xl p-2"
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-800 dark:text-white">{data.name}</h2>
        <span className="inline-block bg-blue-100 text-gray-800 dark:bg-gray-500 dark:text-blue-100 px-2 py-1 rounded-full text-xs font-medium mt-1">
          {data.category}
        </span>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
          {data.description}
        </p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-lg font-bold text-green-600 dark:text-green-400">
            ${data.price.toFixed(2)}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            data.isAvailable 
              ? 'bg-green-100 text-green-600 dark:bg-green-400 dark:text-green-100' 
              : 'bg-red-100 text-red-600 dark:bg-red-500 dark:text-red-100'
          }`}>
            {data.isAvailable ? 'Available' : 'Not Available'}
          </span>
        </div>
        <div className="mt-4 flex gap-2">
          <button 
            className="flex-1 py-2 rounded-xl bg-indigo-400 text-white hover:bg-indigo-500 dark:bg-indigo-400 dark:hover:bg-indigo-500 transition-colors"
          >
            Edit
          </button>
          <button 
            className="flex-1 py-2 rounded-xl bg-red-400 text-white hover:bg-red-500 dark:bg-red-400 dark:hover:bg-red-500 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResturentItemCard;