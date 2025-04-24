const BASE_URL = "http://localhost:3010/api";

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (userData: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw response;
    }

    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw response;
    }

    return await response.json();
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
};

export const updateProfile = async (userData: Partial<FormData>) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw response;
    }

    return await response.json();
  } catch (error) {
    console.error("Profile update error:", error);
    throw error;
  }
};

//------------------------ Restaurant APIs ----------------------

interface RestaurantFormData {
  restaurantName: string;
  contactPerson: string;
  phoneNumber: string;
  businessType: string;
  cuisineType: string;
  operatingHours: string;
  deliveryRadius: string;
  taxId: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  email: string;
  password?: string; 
  agreeTerms?: boolean;
  businessLicense: File | null;
  foodSafetyCert: File | null;
  exteriorPhoto: File | null;
  logo: File | null;
}

// Register restaurant
export const registerRestaurant = async (restaurantData: RestaurantFormData) => {
  try {
    const formData = new FormData();
    formData.append("restaurantName", restaurantData.restaurantName);
    formData.append("contactPerson", restaurantData.contactPerson);
    formData.append("phoneNumber", restaurantData.phoneNumber);
    formData.append("businessType", restaurantData.businessType);
    formData.append("cuisineType", restaurantData.cuisineType);
    formData.append("operatingHours", restaurantData.operatingHours);
    formData.append("deliveryRadius", restaurantData.deliveryRadius);
    formData.append("taxId", restaurantData.taxId);
    // Send address fields individually instead of nesting
    formData.append("streetAddress", restaurantData.streetAddress);
    formData.append("city", restaurantData.city);
    formData.append("state", restaurantData.state);
    formData.append("zipCode", restaurantData.zipCode);
    formData.append("country", restaurantData.country);
    formData.append("email", restaurantData.email);
    if (restaurantData.password) {
      formData.append("password", restaurantData.password);
    }
    if (typeof restaurantData.agreeTerms !== "undefined") {
      formData.append("agreeTerms", String(restaurantData.agreeTerms));
    }
    if (restaurantData.businessLicense) {
      formData.append("businessLicense", restaurantData.businessLicense);
    }
    if (restaurantData.foodSafetyCert) {
      formData.append("foodSafetyCert", restaurantData.foodSafetyCert);
    }
    if (restaurantData.exteriorPhoto) {
      formData.append("exteriorPhoto", restaurantData.exteriorPhoto);
    }
    if (restaurantData.logo) {
      formData.append("logo", restaurantData.logo);
    }

    const response = await fetch(`${BASE_URL}/restaurants/register`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw response;
    }

    return await response.json();
  } catch (error) {
    console.error("Restaurant registration error:", error);
    throw error;
  }
};

// Fetch restaurant by userId
export const getRestaurantByUserId = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await fetch(`${BASE_URL}/restaurants`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch restaurant');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch restaurant by userId error:', error);
    throw error;
  }
};

// Update restaurant
export const updateRestaurant = async (restaurantId: string, data: { [key: string]: any }, files?: { [key: string]: File | null }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const formData = new FormData();

    // Append text fields
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'address') {
        // Handle nested address object
        Object.entries(value as { [key: string]: string }).forEach(([addrKey, addrValue]) => {
          formData.append(`address[${addrKey}]`, addrValue);
        });
      } else {
        formData.append(key, value as string);
      }
    });

    // Append files if provided
    if (files) {
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formData.append(key, file);
        }
      });
    }

    const response = await fetch(`${BASE_URL}/restaurants/${restaurantId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        // Do NOT set Content-Type; fetch will set it automatically for multipart/form-data
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update restaurant');
    }

    return await response.json();
  } catch (error) {
    console.error('Update restaurant error:', error);
    throw error;
  }
};

// Get all resturents
export const getAllRestaurants = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/restaurants/all?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch restaurants');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch all restaurants error:', error);
    throw error;
  }
};

// get restaurant details by id
export const getRestaurantById = async (restaurantId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/restaurants/${restaurantId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch restaurant details');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch restaurant details error:', error);
    throw error;
  }
};

// Delete a restaurant by ID
export const deleteRestaurant = async (restaurantId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/restaurants/${restaurantId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete restaurant');
    }

    return await response.json();
  } catch (error) {
    console.error('Delete restaurant error:', error);
    throw error;
  }
};

// Update restaurant status
export const updateRestaurantStatus = async (restaurantId: string, status: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/restaurants/${restaurantId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update restaurant status');
    }

    return await response.json();
  } catch (error) {
    console.error('Update restaurant status error:', error);
    throw error;
  }
};

//--------------------------- Menu api's -------------------

// get menu item by resturent id
export const getMenuItemsByRestaurantId = async (restaurantId: string) => {
  try {
    const response = await fetch(`http://localhost:3010/api/restaurants/${restaurantId}/menu-items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch menu items');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch menu items error:', error);
    throw error;
  }
};

//fetch a specific menu item by ID
export const getMenuItemById = async (restaurantId: string, menuItemId: string) => {
  try {
    const response = await fetch(`http://localhost:3010/api/restaurants/${restaurantId}/menu-items/${menuItemId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch menu item');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch menu item error:', error);
    throw error;
  }
};