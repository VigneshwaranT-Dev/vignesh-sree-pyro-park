import { products } from "../data/products";
import BannerCarousel from "../components/BannerCarousel";
import CategoriesSection from "../components/CategoriesSection";
import QuickViewModal from "../components/QuickViewModal";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import MapSection from "../components/MapSection";
import { homeSections } from "../data/homeSections";
import ProductSection from "../components/ProductSection";
import HomePageSkeleton from "../components/skeletons/HomePageSkeleton";

const HomePage = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sections, setSections] = useState(homeSections);

  const [isLoading, setIsLoading] = useState(true);

  const { openCart } = useOutletContext<{ openCart: () => void }>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  return (
    <div className="mt-4">
      {/* 🔹 CATEGORY SECTION */}
      <div className="mb-6">
        <CategoriesSection />
      </div>

      <div className="mt-4 px-4">
        <BannerCarousel />
      </div>

      {/* 🔹 BEST SELLERS */}
      {sections.map((section) => {
        const filteredProducts = products.filter((p) => p.tag === section.tag);

        return (
          <ProductSection
            key={section.tag}
            {...section}
            products={filteredProducts}
            openCart={openCart}
            onQuickView={(data: any) => {
              setSelectedItem(data);
              setIsOpen(true);
            }}
          />
        );
      })}

      <MapSection />

      <QuickViewModal
        item={selectedItem}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default HomePage;
