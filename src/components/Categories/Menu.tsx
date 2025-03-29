const Menu: React.FC = () => {
  const menuItems = [
    { name: "Big Mac", desc: "Double beef, fresh lettuce", price: "$5.99", img: "/images/big-mac.jpg" },
    { name: "Fries", desc: "Crispy golden fries", price: "$2.99", img: "/images/fries.jpg" },
    { name: "Coke", desc: "Refreshing cola drink", price: "$1.99", img: "/images/coke.jpg" },
  ];

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-4">Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg">
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="text-gray-500 mb-1">{item.desc}</p>
            <p className="font-bold mb-3">{item.price}</p>
            <button className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;