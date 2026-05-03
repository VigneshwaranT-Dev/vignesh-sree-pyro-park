import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const RelatedProducts = ({ products, openCart }: { products: any[], openCart: (item: any) => void }) => {
  const navigate = useNavigate();

  if (!products.length) return null;

  return (
    <div className="mt-12">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <span className="w-1 h-5 bg-orange-500 rounded-sm"></span>
          🔥 You may also like
        </h2>
      </div>

      {/* SWIPER */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={4.5}
        navigation
        breakpoints={{
          320: { slidesPerView: 1.5 },
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 4.5 },
        }}
        className="px-2 py-2"
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCard
              item={item}
              onQuickView={() => {}}
              onCartClick={openCart}
              onClickCard={() => navigate(`/product/${item.id}`)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default RelatedProducts;