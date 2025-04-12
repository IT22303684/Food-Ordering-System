
import AdminResturentRequestTable from "../../components/UI/AdminResturentRequestTable"; // Use the correct table
import ResturentTitle from "../../components/UI/ResturentTitle"; // Assuming this is correct

export interface Restaurant {
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
  businessLicense?: File | null;
  foodSafetyCert?: File | null;
  exteriorPhoto?: File | null;
  logo?: File | null;
  status?: string;
}

// Define table headers for restaurant details including documents and status
const tableHeaders = [
  "Restaurant Name",
  "Contact Person",
  "Phone Number",
  "Business Type",
  "Cuisine Type",
  "Operating Hours",
  "Delivery Radius",
  "Tax ID",
  "Street Address",
  "City",
  "State",
  "Zip Code",
  "Country",
  "Email",
  "Business License",
  "Food Safety Certificate",
  "Exterior Photo",
  "Logo",
  "Status",
  "Actions",
];

// Sample restaurant data including document files and status
const restaurantData: Restaurant[] = [
  {
    restaurantName: "Pizza Palace",
    contactPerson: "John Doe",
    phoneNumber: "+1-123-456-7890",
    businessType: "Restaurant",
    cuisineType: "Italian",
    operatingHours: "10 AM - 10 PM",
    deliveryRadius: "5 miles",
    taxId: "TAX12345",
    streetAddress: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    email: "contact@pizzapalace.com",
    businessLicense: null,
    foodSafetyCert: null,
    exteriorPhoto: null,
    logo: null,
    status: "Pending",
  },
  {
    restaurantName: "Burger Haven",
    contactPerson: "Jane Smith",
    phoneNumber: "+1-987-654-3210",
    businessType: "Fast Food Chain",
    cuisineType: "American",
    operatingHours: "9 AM - 11 PM",
    deliveryRadius: "10 miles",
    taxId: "TAX67890",
    streetAddress: "456 Elm Street",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    country: "USA",
    email: "info@burgerhaven.com",
    businessLicense: new File([""], "business-license.pdf"),
    foodSafetyCert: new File([""], "food-safety-cert.pdf"),
    exteriorPhoto: new File([""], "exterior-photo.jpg"),
    logo: new File([""], "logo.png"),
    status: "Pending",
  },
];

const RequestRestaurant = () => {
  return (
    <div className="p-4">
      <ResturentTitle text="Restaurant Requests" />
      <AdminResturentRequestTable headers={tableHeaders} data={restaurantData} />
    </div>
  );
};

export default RequestRestaurant;