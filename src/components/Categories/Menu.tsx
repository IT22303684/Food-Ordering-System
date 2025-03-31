import React from 'react';
import { Button } from './Button';
import { motion } from 'framer-motion';

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
                <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">{category.category}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {category.items.map((item) => (
                            <motion.div
                                key={item.name}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white rounded-2xl shadow-lg transition-shadow p-4 hover:shadow-xl"
                            >
                                <div className="h-40 w-full overflow-hidden rounded-lg mb-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-gray-500">{item.price}</p>
                                <Button className="mt-4 w-full">Add to Cart</Button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Menu;
