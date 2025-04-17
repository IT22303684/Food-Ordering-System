import bannerImg from "../../assets/images/sample_resturent_img.jpeg"; 
const Banner = () => (
  <div className="w-full h-64 bg-black flex items-center justify-center relative">
    <img
      src={bannerImg}
      alt="Restaurant banner background"
      className="absolute left-0 top-0 w-full h-full object-cover"
    />
    <div className="relative z-10 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-2 mt-10">Restaurant Name</h1>
      <div className="flex gap-8 mt-5">
        <div className="bg-orange-500 text-black px-4 py-2 rounded-xl font-semibold text-lg">
          2X1 ONLY TODAY!
        </div>
        <div className="bg-orange-500 text-black px-4 py-2 rounded-xl font-semibold text-lg">
          50% OFF
        </div>
      </div>
    </div>
  </div>
);

export default Banner;