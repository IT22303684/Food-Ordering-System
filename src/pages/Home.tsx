import HeroSection from "@/components/Home/HeroSection";
import RestaurantsSection from "@/components/Home/RestaurantsSection";
import DeliverySection from "@/components/Home/DeliverySection";
import ReviewsSection from "@/components/Home/ReviewsSection";

function Home() {
  return (
    <div className="w-full overflow-hidden">
      <HeroSection />
      <RestaurantsSection />
      <DeliverySection />
      <ReviewsSection />
    </div>
  );
}

export default Home;
