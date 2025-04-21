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

//------------------------ resturent api's ----------------------

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
  password: string;
  agreeTerms: boolean;
  businessLicense: File | null;
  foodSafetyCert: File | null;
  exteriorPhoto: File | null;
  logo: File | null;
}

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
    formData.append("password", restaurantData.password);
    formData.append("agreeTerms", String(restaurantData.agreeTerms));
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

// ... other functions (login, register, etc.) remain unchanged ...