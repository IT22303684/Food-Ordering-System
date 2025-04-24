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
  password?: string; // Optional for updates
  agreeTerms?: boolean; // Optional for updates
  businessLicense: File | null;
  foodSafetyCert: File | null;
  exteriorPhoto: File | null;
  logo: File | null;
}

interface RestaurantUpdateData {
  restaurantName?: string;
  contactPerson?: string;
  phoneNumber?: string;
  businessType?: string;
  cuisineType?: string;
  operatingHours?: string;
  deliveryRadius?: string;
  taxId?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  email?: string;
  password?: string;
  agreeTerms?: boolean;
}

// Register restaurant
export const registerRestaurant = async (
  restaurantData: RestaurantFormData
) => {
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
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const response = await fetch(`${BASE_URL}/restaurants`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch restaurant");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch restaurant by userId error:", error);
    throw error;
  }
};

// Update restaurant
export const updateRestaurant = async (
  restaurantId: string,
  data: RestaurantUpdateData,
  files?: { [key: string]: File | null }
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const formData = new FormData();

    // Append text fields
    Object.entries(data).forEach(([key, value]) => {
      if (key === "address") {
        // Handle nested address object
        Object.entries(value as { [key: string]: string }).forEach(
          ([addrKey, addrValue]) => {
            formData.append(`address[${addrKey}]`, addrValue);
          }
        );
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
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        // Do NOT set Content-Type; fetch will set it automatically for multipart/form-data
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update restaurant");
    }

    return await response.json();
  } catch (error) {
    console.error("Update restaurant error:", error);
    throw error;
  }
};

// Get all resturents
export const getAllRestaurants = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/restaurants/all?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch restaurants");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch all restaurants error:", error);
    throw error;
  }
};

// get restaurant details by id
export const getRestaurantById = async (restaurantId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/restaurants/${restaurantId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to fetch restaurant details"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch restaurant details error:", error);
    throw error;
  }
};

//--------------------------- Menu api's -------------------

// get menu item by resturent id
export const getMenuItemsByRestaurantId = async (restaurantId: string) => {
  try {
    const response = await fetch(
      `http://localhost:3010/api/restaurants/${restaurantId}/menu-items`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch menu items");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch menu items error:", error);
    throw error;
  }
};

//fetch a specific menu item by ID
export const getMenuItemById = async (
  restaurantId: string,
  menuItemId: string
) => {
  try {
    const response = await fetch(
      `http://localhost:3010/api/restaurants/${restaurantId}/menu-items/${menuItemId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch menu item");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch menu item error:", error);
    throw error;
  }
};

//--------------------------- Cart APIs -------------------

interface CartItem {
  _id?: string;
  menuItemId: string;
  restaurantId: string;
  name: string;
  price: number;
  quantity: number;
  mainImage?: string;
  thumbnailImage?: string;
}

// Get cart
export const getCart = async (cartId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/carts/${cartId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }

    return await response.json();
  } catch (error) {
    console.error("Get cart error:", error);
    throw error;
  }
};

// Add item to cart
export const addToCart = async (cartId: string, item: CartItem) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const requestBody = {
      menuItemId: item.menuItemId,
      restaurantId: item.restaurantId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      mainImage: item.mainImage
        ? item.mainImage
        : "https://via.placeholder.com/500",
      thumbnailImage: item.thumbnailImage
        ? item.thumbnailImage
        : "https://via.placeholder.com/200",
    };

    console.log("Sending cart request:", {
      url: `${BASE_URL}/carts/${cartId}/items`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.substring(0, 10) + "...",
      },
      body: requestBody,
    });

    const response = await fetch(`${BASE_URL}/carts/${cartId}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseText = await response.text();
    console.log("Raw response:", responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText };
    }

    if (!response.ok) {
      console.error("Cart API error:", {
        status: response.status,
        statusText: response.statusText,
        error: data,
        requestBody: requestBody,
      });
      throw new Error(data.message || "Failed to add item to cart");
    }

    console.log("Cart API success:", data);
    return data;
  } catch (error) {
    console.error("Add to cart error:", error);
    throw error;
  }
};

// Update cart item
export const updateCartItem = async (
  userId: string,
  menuItemId: string,
  quantity: number
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    // First, get the cart to verify the item exists
    const cartResponse = await fetch(`${BASE_URL}/carts/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!cartResponse.ok) {
      throw new Error("Cart not found");
    }

    const cart = await cartResponse.json();
    const itemExists = cart.items.some(
      (item: CartItem) => item.menuItemId === menuItemId
    );

    if (!itemExists) {
      throw new Error("Item not found in cart");
    }

    const response = await fetch(
      `${BASE_URL}/carts/${userId}/items/${menuItemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update cart item");
    }

    return await response.json();
  } catch (error) {
    console.error("Update cart item error:", error);
    throw error;
  }
};

// Remove cart item
export const removeCartItem = async (userId: string, menuItemId: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(
      `${BASE_URL}/carts/${userId}/items/${menuItemId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to remove cart item");
    }

    return await response.json();
  } catch (error) {
    console.error("Remove cart item error:", error);
    throw error;
  }
};

// Clear cart
export const clearCart = async (userId: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${BASE_URL}/carts/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to clear cart");
    }

    return await response.json();
  } catch (error) {
    console.error("Clear cart error:", error);
    throw error;
  }
};

// Create a new cart
export const createCart = async (userId: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    console.log("Creating cart for user:", userId);

    const response = await fetch(`${BASE_URL}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    });

    // Log the raw response for debugging
    const responseText = await response.text();
    console.log("Raw create cart response:", responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText };
    }

    if (!response.ok) {
      console.error("Create cart error:", {
        status: response.status,
        statusText: response.statusText,
        error: data,
      });
      throw new Error(data.message || "Failed to create cart");
    }

    console.log("Cart created successfully:", data);
    return data;
  } catch (error) {
    console.error("Create cart error:", error);
    throw error;
  }
};
