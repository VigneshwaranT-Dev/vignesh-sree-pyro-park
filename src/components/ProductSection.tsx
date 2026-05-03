import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const ProductSection = ({
  title,
  icon,
  tag,
  products,
  openCart,
  onQuickView
}: any) => {
  const navigate = useNavigate();

  return (
    <div className="mt-6 mb-6 px-4">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">

        <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
          <span className="w-1 h-5 bg-orange-500 rounded-sm"></span>

          <span className="flex items-center gap-1">
            {icon} <span>{title}</span>
          </span>
        </h3>

        <button
          onClick={() => navigate(`/products?tag=${tag}`)}
          className="flex items-center gap-1 text-sm text-orange-400 hover:text-orange-300"
        >
          See All →
        </button>

      </div>

      {/* SWIPER */}
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={4.5}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="w-full px-6 py-4"
      >
        {products.map((item: any) => (
          <SwiperSlide key={item.id}>
            <ProductCard
              onClickCard={() => navigate(`/product/${item.id}`)}
              item={item}
              onCartClick={openCart}
              onQuickView={onQuickView}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSection;