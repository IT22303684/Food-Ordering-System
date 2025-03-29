const Categories: React.FC = () => {
  const categories = ["Full Course", "Vegan Selection", "Low-Calorie Choice"];

  return (
    <div className="flex flex-wrap justify-center gap-4 p-6 bg-gray-100">
      {categories.map((category, index) => (
        <div
          key={index}
          className="bg-white shadow-md px-6 py-3 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-center text-lg font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default Categories;