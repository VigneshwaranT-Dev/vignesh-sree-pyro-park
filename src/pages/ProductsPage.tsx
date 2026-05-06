import { useEffect, useMemo, useRef, useState } from "react";
import ProductListCard from "../components/ProductListCard";
import { products } from "../data/products";
import { useNavigate, useOutletContext } from "react-router-dom";
import ProductsPageSkeleton from "../components/skeletons/ProductsPageSkeleton";

const sortLabels: Record<string, string> = {
  default: "",
  priceLow: "Price Low → High",
  priceHigh: "Price High → Low",
  rating: "Top Rated",
  new: "Newest",
};

const ProductsPage = () => {
  const [view, setView] = useState<"grid" | "list">("list");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { openCart } = useOutletContext<{ openCart: () => void }>();

  // ✅ PRICE RANGE
  const maxProductPrice = Math.max(
    ...products.map((p) => p.offerPrice || p.price),
  );

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(maxProductPrice);

  const [rating, setRating] = useState(0);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const [sortBy, setSortBy] = useState("default");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = view === "grid" ? 9 : 6;

  const topRef = useRef<HTMLDivElement | null>(null);

  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(products.map((p) => p.brand))];

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      if (active) {
        setIsLoading(true);
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (active) {
        setIsLoading(false);
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, [
    minPrice,
    maxPrice,
    rating,
    discountOnly,
    inStockOnly,
    selectedCategories,
    selectedBrands,
    sortBy,
    currentPage,
  ]);

  // ✅ FILTER LOGIC UPDATED
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const priceVal = p.offerPrice || p.price;

      return (
        priceVal >= minPrice &&
        priceVal <= maxPrice &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(p.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
        (rating ? p.rating >= rating : true) &&
        (discountOnly ? p.offerPrice : true) &&
        (inStockOnly ? p.inStock !== false : true)
      );
    });

    switch (sortBy) {
      case "priceLow":
        result.sort(
          (a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price),
        );
        break;

      case "priceHigh":
        result.sort(
          (a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price),
        );
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "new":
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [
    minPrice,
    maxPrice,
    rating,
    discountOnly,
    inStockOnly,
    selectedCategories,
    selectedBrands,
    sortBy,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    minPrice,
    maxPrice,
    rating,
    discountOnly,
    inStockOnly,
    selectedCategories,
    selectedBrands,
    sortBy,
  ]);

  useEffect(() => {
    if (topRef.current) {
      const y =
        topRef.current.getBoundingClientRect().top + window.scrollY - 110;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="px-4 md:px-10 py-6">
      {isLoading ? (
        <ProductsPageSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 🔥 FILTER */}
          <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 sticky top-[120px] h-fit">
            <h2 className="text-white text-sm font-medium mb-6">Filters</h2>

            {/* ✅ PRICE RANGE */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-3">Price</p>

              {/* VALUES */}
              <div className="flex justify-between text-sm text-gray-300 mb-3">
                <span>₹{minPrice}</span>
                <span>₹{maxPrice}</span>
              </div>

              <div className="relative h-6">
                {/* TRACK */}
                <div className="absolute top-1/2 left-0 right-0 h-[4px] bg-gray-700 rounded -translate-y-1/2" />

                {/* ACTIVE RANGE */}
                <div
                  className="absolute top-1/2 h-[4px] bg-orange-500 rounded -translate-y-1/2"
                  style={{
                    left: `${(minPrice / maxProductPrice) * 100}%`,
                    right: `${100 - (maxPrice / maxProductPrice) * 100}%`,
                  }}
                />

                {/* MIN RANGE */}
                <input
                  type="range"
                  min={0}
                  max={maxProductPrice}
                  value={minPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val < maxPrice) setMinPrice(val);
                  }}
                  className="
                    absolute w-full h-6 appearance-none bg-transparent pointer-events-none
                    [&::-webkit-slider-thumb]:pointer-events-auto
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-orange-500
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow
                  "
                  style={{ zIndex: minPrice > maxProductPrice - 100 ? 5 : 3 }}
                />

                {/* MAX RANGE */}
                <input
                  type="range"
                  min={0}
                  max={maxProductPrice}
                  value={maxPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val > minPrice) setMaxPrice(val);
                  }}
                  className="
                    absolute w-full h-6 appearance-none bg-transparent pointer-events-none
                    [&::-webkit-slider-thumb]:pointer-events-auto
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-orange-500
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow
                  "
                  style={{ zIndex: 4 }}
                />
              </div>
            </div>

            {/* OTHER FILTERS (UNCHANGED) */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-2">Stock Status</p>

              <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                <input
                  type="checkbox"
                  onChange={(e) => setDiscountOnly(e.target.checked)}
                />
                On Sale
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                In Stock
              </label>
            </div>

            {/* CATEGORY */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-2">Category</p>

              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex gap-2 text-sm text-gray-300 mb-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={(e) => {
                      if (e.target.checked)
                        setSelectedCategories((prev) => [...prev, cat]);
                      else
                        setSelectedCategories((prev) =>
                          prev.filter((c) => c !== cat),
                        );
                    }}
                  />
                  {cat}
                </label>
              ))}
            </div>

            {/* BRAND */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-2">Brand</p>

              {brands.map((b) => (
                <label
                  key={b}
                  className="flex gap-2 text-sm text-gray-300 mb-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={(e) => {
                      if (e.target.checked)
                        setSelectedBrands((prev) => [...prev, b]);
                      else
                        setSelectedBrands((prev) =>
                          prev.filter((x) => x !== b),
                        );
                    }}
                  />
                  {b}
                </label>
              ))}
            </div>

            {/* RATING */}
            <div>
              <p className="text-xs text-gray-400 mb-2">Rating</p>
              {[4, 3, 2].map((r) => (
                <label
                  key={r}
                  className="flex gap-2 text-sm text-gray-300 mb-2"
                >
                  <input type="radio" onChange={() => setRating(r)} />
                  {r}+ Stars
                </label>
              ))}
            </div>
          </div>

          {/* 🔥 CONTENT */}
          <div className="lg:col-span-3">
            <div ref={topRef} />

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-white">
                Products ({filteredProducts.length})
              </h2>

              <div className="flex gap-3 items-center flex-wrap">
                {/* ✅ ACTIVE SORT CHIP */}
                {sortBy !== "default" && (
                  <div
                    className="
                      flex items-center gap-2
                      bg-orange-500/10 border border-orange-400/30
                      text-orange-300
                      px-3 py-1 rounded-full text-xs
                    "
                  >
                    <span>Sort: {sortLabels[sortBy]}</span>

                    {/* ❌ CLEAR BUTTON */}
                    <button
                      onClick={() => setSortBy("default")}
                      className="text-orange-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* SORT DROPDOWN */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#020617] border border-white/10 cursor-pointer text-gray-300 px-3 py-1 rounded text-sm"
                >
                  <option value="default">Sort</option>
                  <option value="priceLow">Price Low → High</option>
                  <option value="priceHigh">Price High → Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="new">Newest</option>
                </select>
              </div>
            </div>

            {/* PRODUCTS */}
            <div className="space-y-4">
              {paginatedProducts.map((item) => (
                <ProductListCard
                  key={item.id}
                  item={item}
                  onCartOpen={openCart}
                  onClick={() => navigate(`/product/${item.id}`)}
                />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10 gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-[#0f172a]
                  border border-white/5 text-gray-300 rounded"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i + 1
                        ? "bg-orange-500 text-white"
                        : "text-gray-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-[#0f172a]
                    border border-white/5 text-gray-300 rounded"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
