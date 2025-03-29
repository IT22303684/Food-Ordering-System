import React from 'react';
import { Button } from '@/components/UI/Button';

const Menu: React.FC = () => {
    const menuItems = [
        {
            category: 'Big Macs',
            items: [
                { name: 'Classic Big Mac', price: '$ 3.99', image: '/images/big-mac.jpg' },
                { name: 'Double Big Mac', price: '$ 5.49', image: '/images/double-big-mac.jpg' },
                { name: 'Spicy Big Mac', price: '$ 4.29', image: '/images/spicy-big-mac.jpg' }
            ]
        },
        {
            category: 'Fries',
            items: [
                { name: 'Classic Fries', price: '$ 1.49', image: '/images/fries.jpg' },
                { name: 'Cheesy Fries', price: '$ 2.29', image: '/images/cheesy-fries.jpg' },
                { name: 'Curly Fries', price: '$ 2.79', image: '/images/curly-fries.jpg' }
            ]
        },
        {
            category: 'Cold Drinks',
            items: [
                { name: 'Coke', price: '$ 1.29', image: '/images/coke.jpg' },
                { name: 'Sprite', price: '$ 1.29', image: '/images/sprite.jpg' },
                { name: 'Fanta', price: '$ 1.29', image: '/images/fanta.jpg' }
            ]
        }
    ];

    return (
        <div className="p-6 space-y-10">
            {menuItems.map((category) => (
                <div key={category.category}>
                    <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {category.items.map((item) => (
                            <div key={item.name} className="bg-white rounded-2xl shadow-md p-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="rounded-lg w-full h-40 object-cover mb-4"
                                />
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-gray-500">{item.price}</p>
                                <Button className="mt-4 w-full">Add to Cart</Button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Menu;
