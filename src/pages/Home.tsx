import { products } from "../data/dummyData";
import BannerCarousel from "../components/BannerCarousel";
import CategoryCard from "../components/CategoryCard";
import { categories } from "../data/categories";
import ProductCard from "../components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const Home = () => {
  return (
    <div className="mt-4">

      {/* 🔹 CATEGORY SECTION */}
      <div className="mb-6">

        <div className="grid grid-cols-12 gap-4 px-4 py-3">

          {/* 5 CATEGORY CARDS */}
          {categories.slice(0, 5).map((cat, i) => (
            <div key={i} className="col-span-2">
              <CategoryCard {...cat} />
            </div>
          ))}

          {/* SEE ALL CARD */}
          <div className="col-span-2">
            <div className="h-[120px] rounded-2xl bg-[#1a1a2e]
              flex flex-col items-center justify-center cursor-pointer
              border border-orange-500/40 hover:bg-orange-500/10 transition duration-300">

              <div className="text-xl text-orange-400">→</div>

              <span className="text-sm text-orange-400 font-medium mt-1">
                See All
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 🔹 BANNER */}
      <div className="mt-4 px-4">
        <BannerCarousel />
      </div>

      {/* 🔹 BEST SELLERS */}
      <div className="mt-6 mb-6 px-4">
        <h3 className="text-lg font-semibold text-white mb-3">
          🌟 Best Sellers
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
                        <ProductCard item={item} />
                    </div>
                </SwiperSlide>
            ))}

          </Swiper>
        </div>
      </div>

    </div>
  );
};

export default Home;