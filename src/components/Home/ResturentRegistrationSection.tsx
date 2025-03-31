import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import CustomButton from "@/components/UI/CustomButton";
import resturent from "../../assets/images/resturent.webp";

interface FormData {
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
  confirmPassword: string;
  agreeTerms: boolean;
  businessLicense: File | null;
  foodSafetyCert: File | null;
  exteriorPhoto: File | null;
  logo: File | null;
}
const ResturentRegistrationSection = () => {
    const navigate = useNavigate();

    // State for form fields
    const [formData, setFormData] = useState<FormData>({
      restaurantName: "",
      contactPerson: "",
      phoneNumber: "",
      businessType: "",
      cuisineType: "",
      operatingHours: "",
      deliveryRadius: "",
      taxId: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
      businessLicense: null,
      foodSafetyCert: null,
      exteriorPhoto: null,
      logo: null,
    });
  
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
    // Handle input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, files, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "file" ? files?.[0] || null : type === "checkbox" ? checked : value,
      }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    };
  
    // Form validation
    const validateForm = (): boolean => {
      const newErrors: Partial<Record<keyof FormData, string>> = {};
      if (!formData.restaurantName) newErrors.restaurantName = "Restaurant name is required";
      if (!formData.contactPerson) newErrors.contactPerson = "Contact person is required";
      if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
      if (!formData.streetAddress) newErrors.streetAddress = "Street address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
      if (!formData.country) newErrors.country = "Country is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Invalid email address";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    // Handle form submission
    const handleFormSubmit = () => {
      if (validateForm()) {
        toast.success("Restaurant registered successfully!");
        navigate("/signin");
      } else {
        toast.error("Please fix the errors in the form");
      }
    };
  
    return (
      <div className="mx-auto mt-12 flex w-full max-w-[1920px] flex-col lg:flex-row">
        <Toaster position="top-right" reverseOrder={false} />
  
        {/* Left Image Section */}
        <div className="hidden lg:block lg:w-[55%]">
          <img
            src={resturent}
            alt="Background"
            className="h-full w-full object-cover"
          />
        </div>
  
        {/* Form Section */}
        <div className="flex w-full flex-col px-6 py-8 sm:px-8 md:px-12 lg:w-[45%] lg:px-16 lg:py-20 2xl:px-24">
          <div className="mb-6 hidden lg:block">
            <span className="text-4xl font-bold text-orange-600">FoodyX</span>
          </div>
  
          <div className="flex w-full flex-col">
            <h2 className="text-2xl font-bold leading-9 text-black lg:text-4xl">
              Register Your Restaurant
            </h2>
            <span className="mt-5 text-sm text-black lg:text-base">
              Provide your restaurant details to join FoodyX.
            </span>
  
            {/* Form Sections */}
            <div className="mt-10 space-y-12">
              {/* Business Details */}
              <div>
                <h3 className="mb-6 text-xl font-semibold text-black">Business Details</h3>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      name="restaurantName"
                      value={formData.restaurantName}
                      onChange={handleChange}
                      placeholder="Restaurant Name"
                      className="w-full border-b border-black text-sm focus:outline-none"
                    />
                    {errors.restaurantName && (
                      <p className="mt-2 text-xs text-red-500">{errors.restaurantName}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder="Contact Person"
                      className="w-full border-b border-black text-sm focus:outline-none"
                    />
                    {errors.contactPerson && (
                      <p className="mt-2 text-xs text-red-500">{errors.contactPerson}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full border-b border-black text-sm focus:outline-none"
                    />
                    {errors.phoneNumber && (
                      <p className="mt-2 text-xs text-red-500">{errors.phoneNumber}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      placeholder="Business Type (e.g., Restaurant, Cafe)"
                      className="w-full border-b border-black text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="cuisineType"
                      value={formData.cuisineType}
                      onChange={handleChange}
                      placeholder="Cuisine Type (e.g., Italian, Mexican)"
                      className="w-full border-b border-black text-sm focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      name="operatingHours"
                      value={formData.operatingHours}
                      onChange={handleChange}
                      placeholder="Operating Hours (e.g., Mon-Sun 9 AM - 10 PM)"
                      className="w-full border-b border-black text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="deliveryRadius"
                      value={formData.deliveryRadius}
                      onChange={handleChange}
                      placeholder="Delivery Radius (e.g., 5 miles)"
                      className="w-full border-b border-black text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleChange}
                      placeholder="Tax ID"
                      className="w-full border-b border-black text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>
  
              {/* Address Details */}
              <div>
                <h3 className="mb-6 text-xl font-semibold text-black">Address Details</h3>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleChange}
                      placeholder="Street Address"
                      className="w-full border-b border-black text-sm focus:outline-none"
                    />
                    {errors.streetAddress && (
                      <p className="mt-2 text-xs text-red-500">{errors.streetAddress}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="w-full border-b border-black text-sm focus:outline-none"
                    />
                    {errors.city && (
                      <p className="mt-2 text-xs text-red-500">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State/Province"
                      className="w-full border-b border-black text-sm focus:outline-none"
                    />
                    {errors.state && (
                      <p className="mt-2 text-xs text-red-500">{errors.state}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="ZIP/Postal Code"
                      className="w-full border-b border-black text-sm focus:outline-none"
                    />
                    {errors.zipCode && (
                      <p className="mt-2 text-xs text-red-500">{errors.zipCode}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
                      className="w-full border-b border-black text-sm focus:outline-none"
                    />
                    {errors.country && (
                      <p className="mt-2 text-xs text-red-500">{errors.country}</p>
                    )}
                  </div>
                </div>
              </div>
  
              {/* Account Setup */}
              <div>
                <h3 className="mb-6 text-xl font-semibold text-black">Account Setup</h3>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full border-b border-black text-sm focus:outline-none"
                    />
                    {errors.email && (
                      <p className="mt-2 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div className="relative sm:col-span-2">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create Password"
                      className="w-full border-b border-black text-sm focus:outline-none"
                    />
                    <div
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? (
                        <IoEyeOutline size={20} color="#646464" />
                      ) : (
                        <IoEyeOffOutline size={20} color="#646464" />
                      )}
                    </div>
                    {errors.password && (
                      <p className="mt-2 text-xs text-red-500">{errors.password}</p>
                    )}
                  </div>
                  <div className="relative sm:col-span-2">
                    <input
                      type={confirmPasswordVisible ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                      className="w-full border-b border-black text-sm focus:outline-none"
                    />
                    <div
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    >
                      {confirmPasswordVisible ? (
                        <IoEyeOutline size={20} color="#646464" />
                      ) : (
                        <IoEyeOffOutline size={20} color="#646464" />
                      )}
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-2 text-xs text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      I agree to the Terms and Conditions
                    </label>
                    {errors.agreeTerms && (
                      <p className="mt-2 text-xs text-red-500">{errors.agreeTerms}</p>
                    )}
                  </div>
                </div>
              </div>
  
              {/* Documentation */}
              <div>
                <h3 className="mb-6 text-xl font-semibold text-black">Documentation</h3>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-sm">Business License</label>
                    <input
                      type="file"
                      name="businessLicense"
                      onChange={handleChange}
                      className="mt-2 w-full text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm">Food Safety Certificate</label>
                    <input
                      type="file"
                      name="foodSafetyCert"
                      onChange={handleChange}
                      className="mt-2 w-full text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm">Restaurant Exterior Photo</label>
                    <input
                      type="file"
                      name="exteriorPhoto"
  
                      className="mt-2 w-full text-sm"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm">Logo</label>
                    <input
                      type="file"
                      name="logo"
                      onChange={handleChange}
                      className="mt-2 w-full text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
  
            {/* Submit Button */}
            <div className="mt-12">
              <CustomButton
                title="Register Restaurant"
                bgColor="bg-orange-600"
                textColor="text-white"
                onClick={handleFormSubmit}
                style="hover:bg-orange-700"
              />
            </div>
  
            {/* Sign In Link */}
            <h1 className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <span
                className="cursor-pointer font-semibold text-orange-600 hover:underline"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </span>
            </h1>
          </div>
  
          {/* Footer */}
          <div className="mt-12 py-6 text-center text-xs text-black">
            2025 © All rights reserved. FoodyX
          </div>
        </div>
      </div>
    );
}

export default ResturentRegistrationSection
