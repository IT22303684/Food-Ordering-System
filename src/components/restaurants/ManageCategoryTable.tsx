import React, { useState } from "react";
import { updateCategory, deleteCategory } from "../../utils/api";
import ConfirmationModal from "../UI/ConfirmationModal";

export interface Category {
  _id: string;
  name: string;
  description: string;
  restaurantId: string;
  createdAt: string;
  updatedAt: string;
}

interface ManageCategoryTableProps {
  headers: string[];
  data: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  restaurantId: string;
}

const ManageCategoryTable: React.FC<ManageCategoryTableProps> = ({ headers, data, setCategories, restaurantId }) => {
  const [categories, setLocalCategories] = useState<Category[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [formError, setFormError] = useState<string | null>(null);

  // Open edit modal and populate form data
  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
    });
    setIsEditModalOpen(true);
    setFormError(null);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for editing
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    try {
      const response = await updateCategory(restaurantId, selectedCategory._id, formData);
      const updatedCategory: Category = {
        _id: response.category._id,
        name: response.category.name,
        description: response.category.description || "",
        restaurantId: response.category.restaurantId,
        createdAt: response.category.createdAt,
        updatedAt: response.category.updatedAt,
      };
      const updateCategories = (prev: Category[]) =>
        prev.map((cat) => (cat._id === selectedCategory._id ? updatedCategory : cat));
      setLocalCategories(updateCategories);
      setCategories(updateCategories);
      setIsEditModalOpen(false);
      setSelectedCategory(null);
      setFormError(null);
    } catch (error: any) {
      setFormError(error.message || "Failed to update category");
      console.error("Update category error:", error);
    }
  };

  // Handle delete category
  const handleDeleteCategory = (categoryId: string, categoryName: string) => {
    openDeleteModal(
      "Confirm Delete Category",
      `Are you sure you want to delete ${categoryName}?`,
      async () => {
        try {
          await deleteCategory(restaurantId, categoryId);
          const updateCategories = (prev: Category[]) =>
            prev.filter((cat) => cat._id !== categoryId);
          setLocalCategories(updateCategories);
          setCategories(updateCategories);
          setIsDeleteModalOpen(false);
        } catch (error: any) {
          alert(`Failed to delete category: ${error.message}`);
          console.error("Delete category error:", error);
        }
      }
    );
  };

  // Open delete confirmation modal
  const openDeleteModal = (title: string, message: string, onConfirm: () => void) => {
    setIsDeleteModalOpen(true);
    setModalConfig({ title, message, onConfirm });
  };

  const [modalConfig, setModalConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ title: "", message: "", onConfirm: () => {} });

  // Map headers to data fields
  const getFieldValue = (category: Category, header: string) => {
    switch (header.toLowerCase()) {
      case "name":
        return category.name;
      case "description":
        return category.description || "-";
      case "actions":
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => openEditModal(category)}
              className="px-2 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteCategory(category._id, category.name)}
              className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        );
      default:
        return "";
    }
  };

  // Filter categories by search term
  const filteredCategories = categories.filter((category) =>
    [category.name, category.description].some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort categories by name
  const sortedCategories = [...filteredCategories].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  return (
    <>
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Edit Category
            </h2>
            {formError && (
              <div className="text-red-500 mb-4">{formError}</div>
            )}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedCategory(null);
                    setFormError(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="p-5 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block p-5 w-full text-sm rounded-md overflow-x-auto bg-white dark:bg-gray-700">
        <table className="min-w-[1000px] w-full">
          <thead className="bg-gray-200 border-gray-200 dark:bg-gray-700 dark:border-gray-500">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="text-start py-4 px-6 font-semibold text-gray-600 dark:text-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedCategories.map((category, index) => (
              <tr
                key={category._id}
                className={`border-b border-gray-200 dark:border-gray-500 ${
                  index % 2 === 0 ? "bg-gray-50 dark:bg-gray-600" : "bg-gray-100 dark:bg-gray-700"
                } hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors`}
              >
                {headers.map((header, idx) => (
                  <td key={idx} className="py-4 px-6 text-gray-800 dark:text-white">
                    {getFieldValue(category, header)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Grid View */}
      <div className="lg:hidden p-5 space-y-4 overflow-y-scroll h-full">
        {sortedCategories.map((category) => (
          <div
            key={category._id}
            className="border rounded-md p-4 shadow-md hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-gray-600"
          >
            <div className="space-y-2">
              {headers.map((header, idx) => (
                <div key={idx} className="flex justify-between items-center py-1">
                  <span className="font-medium text-gray-800 dark:text-white">{header}:</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {getFieldValue(category, header)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {sortedCategories.length === 0 && (
        <div className="p-5 text-center text-gray-600 dark:text-gray-300">
          No categories found.
        </div>
      )}
    </>
  );
};

export default ManageCategoryTable;