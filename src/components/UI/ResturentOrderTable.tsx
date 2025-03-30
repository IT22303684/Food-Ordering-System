import { Order } from '@/pages/restaurants/NewOrder';
import React, { useState } from 'react';

interface ResturentTableProps {
    headers: string[];
    data: Order[];
}

const ResturentTable: React.FC<ResturentTableProps> = ({ headers, data }) => {
    const [orders, setOrders] = useState<Order[]>(data);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // Status options
    const statusOptions = ['New', 'Processing', 'Ready', 'Delivered', 'Cancelled'];

    // Handle status change
    const handleStatusChange = (orderId: string, newStatus: string) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.orderId === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    // Filter orders based on search term
    const filteredOrders = orders.filter(order =>
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort orders by date
    const sortedOrders = [...filteredOrders].sort((a, b) => {
        const dateA = new Date(a.orderTime).getTime();
        const dateB = new Date(b.orderTime).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    // Toggle sort order
    const toggleSortOrder = () => {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    // Status color mapping with dark theme support
    const getStatusStyles = (status: string) => {
        const baseStyles = 'w-fit px-2 py-1 text-xs font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500';
        switch (status) {
            case 'New':
                return `${baseStyles} bg-gray-100 text-blue-600 border-blue-600 dark:bg-gray-500 dark:text-blue-200 dark:border-blue-400`;
            case 'Processing':
                return `${baseStyles} bg-gray-100 text-yellow-600 border-yellow-600 dark:bg-gray-500 dark:text-yellow-200 dark:border-yellow-400`;
            case 'Ready':
                return `${baseStyles} bg-gray-100 text-green-600 border-green-600 dark:bg-gray-500 dark:text-green-200 dark:border-green-400`;
            case 'Delivered':
                return `${baseStyles} bg-gray-100 text-purple-600 border-purple-600 dark:bg-gray-500 dark:text-purple-200 dark:border-purple-400`;
            case 'Cancelled':
                return `${baseStyles} bg-gray-100 text-red-600 border-red-600 dark:bg-gray-500 dark:text-red-200 dark:border-red-400`;
            default:
                return `${baseStyles} bg-gray-100 text-gray-600 border-gray-600 dark:bg-gray-500 dark:text-gray-200 dark:border-gray-400`;
        }
    };

    return (
        <>
            {/* Search and Sort Controls */}
            <div className="p-5 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    onClick={toggleSortOrder}
                    className="w-full sm:w-auto px-4 py-2 bg-gray-200 border-gray-200 dark:bg-gray-800 dark:border-gray-500 transition-colors"
                >
                    Sort by Date {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block p-5 w-full text-sm rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-600">
                <table className="w-full">
                    <thead className="bg-gray-200 border-gray-200 dark:bg-gray-700 dark:border-gray-500">
                        <tr>
                            {headers.filter(header => header !== 'Action').map((header, index) => (
                                <th key={index} className="text-start py-4 px-6 font-semibold text-gray-600 dark:text-gray-200">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOrders.map((order, index) => (
                            <tr
                                key={order.orderId}
                                className={`border-b border-gray-200 dark:border-gray-500 ${index % 2 === 0
                                    ? 'bg-gray-50 dark:bg-gray-600'
                                    : 'bg-gray-100 dark:bg-gray-700'
                                    } hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors`}
                            >
                                <td className="py-4 px-6">
                                    <span className="font-mono text-gray-800 dark:text-white">{order.orderId}</span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="font-medium text-gray-800 dark:text-white">{order.customerName}</div>
                                </td>
                                <td className="py-4 px-6 text-gray-600 dark:text-gray-300">{order.items}</td>
                                <td className="py-4 px-6">
                                    <span className="font-semibold text-green-600 dark:text-green-300">{order.totalAmount}</span>
                                </td>
                                <td className="py-4 px-6 text-gray-500 dark:text-gray-400">{order.orderTime}</td>
                                <td className="py-4 px-6">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                        className={getStatusStyles(order.status)}
                                    >
                                        {statusOptions.map((status) => (
                                            <option
                                                key={status}
                                                value={status}
                                                className="bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                                            >
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Grid View */}
            <div className="lg:hidden p-5 space-y-4 overflow-y-scroll h-3/4">
                {sortedOrders.map((order) => (
                    <div
                        key={order.orderId}
                        className="border rounded-2xl p-4 bg-gray-100 shadow-md hover:shadow-lg transition-shadow border-gray-200 dark:bg-gray-600 dark:border-gray-500"
                    >
                        <div className="space-y-2">
                            <div className="flex justify-between items-start">
                                <div className="font-mono text-indigo-600 dark:text-indigo-300">{order.orderId}</div>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                    className={getStatusStyles(order.status)}
                                >
                                    {statusOptions.map((status) => (
                                        <option
                                            key={status}
                                            value={status}
                                            className="bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                                        >
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-gray-800 font-medium dark:text-white">{order.customerName}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Items: {order.items}</div>
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-green-600 font-semibold dark:text-green-300">
                                    {order.totalAmount}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{order.orderTime}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ResturentTable;