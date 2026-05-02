import { products } from "../data/dummyData";
import BannerCarousel from "../components/BannerCarousel";
import ProductCard from "../components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import CategoriesSection from "../components/CategoriesSection";
import QuickViewModal from "../components/QuickViewModal";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { openCart } = useOutletContext<{ openCart: () => void }>();

  return (
    <div className="mt-4">

      {/* 🔹 CATEGORY SECTION */}
      <div className="mb-6">
        <CategoriesSection />
      </div>

      {/* 🔹 BANNER */}
      <div className="mt-4 px-4">
        <BannerCarousel />
      </div>

      {/* 🔹 BEST SELLERS */}
      <div className="mt-6 mb-6 px-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">

          {/* Left Accent Line */}
          <span className="w-1 h-5 bg-orange-500 rounded-sm"></span>

          {/* Title */}
          <span className="flex items-center gap-1">
            🔥 <span>Top Fire Picks</span>
          </span>

        </h3>
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={4.5}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            centeredSlides={false}
            className="w-full px-6 py-4"
            breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
            }}
            >

            {products.map((item) => (
                <SwiperSlide key={item.id} >
                    <div className="w-full">
                        <ProductCard item={item}
                        onCartClick={openCart} 
                        onQuickView={(data) => {
                          setSelectedItem(data);
                          setIsOpen(true);
                        }} />
                    </div>
                </SwiperSlide>
            ))}

          </Swiper>
        </div>
      </div>

      <div className="mt-6 mb-6 px-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">

          {/* Left Accent Line */}
          <span className="w-1 h-5 bg-orange-500 rounded-sm"></span>

          {/* Title */}
          <span className="flex items-center gap-1">
            🎉 <span>Kids Favorites</span>
          </span>

        </h3>
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={4.5}
            autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            }}
            centeredSlides={false}
            className="w-full px-6 py-4"
            breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
            }}
            >

            {products.map((item) => (
                <SwiperSlide key={item.id} >
                    <div className="w-full">
                        <ProductCard item={item}
                        onCartClick={openCart}  
                        onQuickView={(data) => {
                          setSelectedItem(data);
                          setIsOpen(true);
                        }}/>
                    </div>
                </SwiperSlide>
            ))}

          </Swiper>
        </div>
      </div>

      <div className="mt-6 mb-6 px-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">

          {/* Left Accent Line */}
          <span className="w-1 h-5 bg-orange-500 rounded-sm"></span>

          {/* Title */}
          <span className="flex items-center gap-1">
            🎆 <span>Sky Shots</span>
          </span>

        </h3>
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={4.5}
            autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            }}
            centeredSlides={false}
            className="w-full px-6 py-4"
            breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
            }}
            >

            {products.map((item) => (
                <SwiperSlide key={item.id} >
                    <div className="w-full">
                        <ProductCard item={item} 
                        onCartClick={openCart}
                        onQuickView={(data) => {
                          setSelectedItem(data);
                          setIsOpen(true);
                        }}/>
                    </div>
                </SwiperSlide>
            ))}

          </Swiper>
        </div>
      </div>

      <QuickViewModal
        item={selectedItem}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

    </div>
  );
};

export default Home;