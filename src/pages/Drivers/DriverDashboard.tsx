import React, { useEffect, useState } from "react";
import { useDriver } from "../../context/DriverContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  FaMotorcycle,
  FaMapMarkerAlt,
  FaToggleOn,
  FaToggleOff,
  FaBox,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUser,
  FaLocationArrow,
} from "react-icons/fa";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { completeDelivery, getCurrentDriver } from "../../utils/api";

const DriverDashboard: React.FC = () => {
  const { driver, isAvailable, location, updateAvailability } = useDriver();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState({ lat: 1.3143, lng: 103.7093 });
  const [currentLocation, setCurrentLocation] = useState<
    [number, number] | null
  >([1.3143, 103.7093]);

  useEffect(() => {
    if (user?.id) {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (location) {
      setMapCenter({ lat: location[0], lng: location[1] });
    }
  }, [location]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setCurrentLocation(newLocation);
          setMapCenter({ lat: newLocation[0], lng: newLocation[1] });
        },
        (error) => {
          toast.error("Failed to get location");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleToggleAvailability = async () => {
    try {
      if (!driver) {
        toast.error("Please register as a driver first");
        return;
      }
      await updateAvailability(!isAvailable);
    } catch {
      toast.error("Failed to update availability");
    }
  };

  const handleCompleteDelivery = async () => {
    try {
      if (!driver?._id) {
        toast.error("Driver ID not found");
        return;
      }

      await completeDelivery(driver._id);
      toast.success("Delivery completed successfully!");

      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Complete delivery error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to complete delivery"
      );
    }
  };

  // Function to fetch and update driver data
  const fetchDriverData = async () => {
    try {
      if (!user?.id) return;

      const response = await getCurrentDriver(user.id);
      if (response.data) {
        // Update the driver context with new data
        // You might want to add an updateDriver function to your DriverContext
        // For now, we'll just log the changes
        console.log("Driver data updated:", response.data);

        // Check for changes in delivery status
        if (driver?.currentDelivery !== response.data.currentDelivery) {
          if (response.data.currentDelivery) {
            toast.info("New delivery assigned!");
          } else {
            toast.success("Delivery completed!");
          }
        }

        // Check for changes in availability
        if (driver?.isAvailable !== response.data.isAvailable) {
          toast.info(
            `You are now ${
              response.data.isAvailable ? "available" : "unavailable"
            } for deliveries`
          );
        }
      }
    } catch (error) {
      console.error("Error fetching driver data:", error);
    }
  };

  // Set up polling interval
  useEffect(() => {
    // Initial fetch
    fetchDriverData();

    // Set up interval to fetch every 30 seconds
    const intervalId = setInterval(fetchDriverData, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Driver Registration Required
          </h2>
          <p className="text-gray-600 mb-4">
            Please register as a driver to access the dashboard.
          </p>
          <button
            onClick={() => (window.location.href = "/driver-registration")}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Register as Driver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-20 mb-20 lg:max-w-7xl mx-auto px-4">
      {/* Driver Profile Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-orange-100 rounded-full">
            <FaUser className="text-orange-500 text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Driver Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Name:</span> {user?.firstName}{" "}
                  {user?.lastName}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {user?.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Driver ID:</span> {driver._id}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Vehicle Type:</span>{" "}
                  {driver.vehicleType}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Vehicle Number:</span>{" "}
                  {driver.vehicleNumber}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={isAvailable ? "text-green-600" : "text-red-600"}
                  >
                    {isAvailable ? "Available" : "Unavailable"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Information Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaLocationArrow className="text-blue-500 text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Location Information</h2>
              <p className="text-gray-600">
                {currentLocation
                  ? `Current Location: Lat: ${currentLocation[0].toFixed(
                      4
                    )}, Long: ${currentLocation[1].toFixed(4)}`
                  : "Location not set"}
              </p>
            </div>
          </div>
          {/* <button
            onClick={getCurrentLocation}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          >
            <FaMapMarkerAlt />
            <span>Update Location</span>
          </button> */}
        </div>
        <div className="h-64 w-full rounded-lg overflow-hidden">
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={["places"]}
          >
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={mapCenter}
              zoom={15}
              options={{
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: true,
                streetViewControl: true,
                fullscreenControl: true,
              }}
            >
              {currentLocation && (
                <Marker
                  position={{
                    lat: currentLocation[0],
                    lng: currentLocation[1],
                  }}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {/* Status Toggle Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <FaMotorcycle className="text-orange-500 text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Driver Status</h2>
              <p className="text-gray-600">
                Current Status:{" "}
                <span
                  className={isAvailable ? "text-green-600" : "text-red-600"}
                >
                  {isAvailable ? "Available" : "Unavailable"}
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={handleToggleAvailability}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              isAvailable
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {isAvailable ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
            <span>{isAvailable ? "Available" : "Unavailable"}</span>
          </button>
        </div>
      </div>

      {/* Active Delivery Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <FaBox className="text-purple-500 text-2xl" />
          </div>
          <h2 className="text-xl font-semibold">Active Delivery</h2>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          {driver?.currentDelivery ? (
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Delivery ID:</span>{" "}
                {driver.currentDelivery}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={
                    driver.isAvailable ? "text-green-600" : "text-red-600"
                  }
                >
                  {driver.isAvailable ? "Available" : "On Delivery"}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-gray-600 text-center">
              No active deliveries at the moment
            </p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {driver?.currentDelivery && (
          <button
            onClick={handleCompleteDelivery}
            className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors"
          >
            <div className="p-3 bg-green-100 rounded-full">
              <FaCheckCircle className="text-green-500 text-2xl" />
            </div>
            <span className="font-medium">Complete Delivery</span>
          </button>
        )}
        <button className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors">
          <div className="p-3 bg-yellow-100 rounded-full">
            <FaExclamationTriangle className="text-yellow-500 text-2xl" />
          </div>
          <span className="font-medium">Report Issue</span>
        </button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg">
        <div className="flex justify-around p-4">
          <button className="flex flex-col items-center space-y-1">
            <FaMotorcycle className="text-orange-500" />
            <span className="text-xs">Dashboard</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <FaBox className="text-gray-500" />
            <span className="text-xs">Deliveries</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <FaMapMarkerAlt className="text-gray-500" />
            <span className="text-xs">Location</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
