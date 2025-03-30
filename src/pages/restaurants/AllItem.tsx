import ResturentItemCard from "../../components/UI/ResturentItemCard";
import ResturentTitle from "../../components/UI/ResturentTitle";

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
    isAvailable: boolean;
}

export const menuItemData: MenuItem[] = [
    {
        id: "1",
        name: "Margherita Pizza",
        description: "Classic pizza with fresh tomatoes, mozzarella, and basil",
        price: 12.99,
        category: "Main Course",
        imageUrl: "https://example.com/images/margherita-pizza.jpg",
        isAvailable: true
    },
    {
        id: "2",
        name: "Chicken Wings",
        description: "Spicy buffalo wings served with blue cheese dip",
        price: 8.99,
        category: "Appetizers",
        imageUrl: "https://example.com/images/chicken-wings.jpg",
        isAvailable: true
    },
    {
        id: "3",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a gooey center, served with vanilla ice cream",
        price: 6.49,
        category: "Desserts",
        isAvailable: true
    },
    {
        id: "4",
        name: "Caesar Salad",
        description: "Crisp romaine lettuce with croutons, parmesan, and Caesar dressing",
        price: 7.99,
        category: "Sides",
        imageUrl: "https://example.com/images/caesar-salad.jpg",
        isAvailable: true
    },
    {
        id: "5",
        name: "Pepperoni Pizza",
        description: "Traditional pizza topped with pepperoni and extra cheese",
        price: 14.99,
        category: "Main Course",
        isAvailable: false
    },
    {
        id: "6",
        name: "Mojito",
        description: "Refreshing cocktail with mint, lime, and soda",
        price: 5.99,
        category: "Beverages",
        imageUrl: "https://example.com/images/mojito.jpg",
        isAvailable: true
    },
    {
        id: "7",
        name: "Grilled Salmon",
        description: "Fresh salmon fillet grilled to perfection with lemon butter sauce",
        price: 18.99,
        category: "Main Course",
        imageUrl: "https://example.com/images/grilled-salmon.jpg",
        isAvailable: true
    },
    {
        id: "8",
        name: "French Fries",
        description: "Crispy golden fries served with ketchup",
        price: 3.99,
        category: "Sides",
        isAvailable: true
    },
    {
        id: "9",
        name: "Tiramisu",
        description: "Classic Italian dessert withcoffee-soaked ladyfingers and mascarpone",
        price: 7.49,
        category: "Desserts",
        imageUrl: "https://example.com/images/tiramisu.jpg",
        isAvailable: false
    },
    {
        id: "10",
        name: "Iced Coffee",
        description: "Chilled coffee with milk and a hint of vanilla",
        price: 4.49,
        category: "Beverages",
        isAvailable: true
    }
];

const AllItem = () => {
  return (
    <>
        <div className='p-4'>
            <ResturentTitle text="All Menu Items"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {menuItemData.map((item) => (
            <ResturentItemCard key={item.id} data={item} />
        ))}
        </div>
    </>
  );
};

export default AllItem;