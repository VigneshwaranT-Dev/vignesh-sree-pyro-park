import { useParams, useOutletContext } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import {
  Star,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  Sparkles,
  ShoppingCart,
} from "lucide-react";
import { Maximize } from "lucide-react";
import RelatedProducts from "../components/RelatedProducts";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { openCart } = useOutletContext<{ openCart: () => void }>();
  const { cart, addToCart, updateQty } = useCart();

  const product = products.find((p) => p.id === Number(id));

  const [activeImage, setActiveImage] = useState(0);
  const [showMore, setShowMore] = useState(false);

  // 🔥 GALLERY STATES
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // 🔥 SCROLL LOCK FIX
  useEffect(() => {
    if (showGallery) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showGallery]);

  if (!product) return <div className="text-white">Product not found</div>;

  const cartItem = cart.find((c: any) => c.id === product.id);
  const qty = cartItem?.qty || 0;

  const price = product.offerPrice || product.price;

  const discount =
    product.offerPrice && product.price
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0;

  const isOutOfStock = product.inStock === false;

  const currentMedia = product.images[galleryIndex];

  const relatedProducts = products
  .filter((p) => p.category === product.category && p.id !== product.id)
  .slice(0, 6);

  const fallbackProducts =
    relatedProducts.length > 0
      ? relatedProducts
      : products.filter((p) => p.id !== product.id).slice(0, 6);

  return (
    <div className="px-4 md:px-12 py-10 text-white min-h-screen">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* 🔥 LEFT - IMAGE */}
        <div className="sticky top-[120px] h-fit">

          <div className="relative bg-[#020617] rounded-2xl p-8 flex items-center justify-center border border-white/5">

            <img
              src={product.images[activeImage]}
              className="h-[300px] object-contain transition-transform duration-300 hover:scale-105"
            />

            {/* 🔍 ENLARGE */}
            <button
              onClick={() => {
                setGalleryIndex(activeImage);
                setShowGallery(true);
              }}
              className="absolute bottom-4 right-4 bg-black/60 backdrop-blur p-2 rounded-lg hover:bg-orange-500 transition"
            >
              <Maximize size={16}/>
            </button>
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-5">
            {product.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImage(i)}
                className={`p-1 rounded-lg cursor-pointer border transition ${
                  activeImage === i
                    ? "border-orange-500 scale-105"
                    : "border-white/10 hover:border-orange-400"
                }`}
              >
                <img src={img} className="w-16 h-16 object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 RIGHT - DETAILS */}
        <div className="flex flex-col gap-6">

          <h1 className="text-3xl font-semibold">{product.name}</h1>

          {/* RATING */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-orange-400 flex items-center gap-1">
              <Star size={14} className="fill-orange-400" />
              {product.rating || 4.2}
            </span>
            <span className="text-gray-500">(120 reviews)</span>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-4">
            <span className="text-3xl text-orange-400 font-bold">
              ₹{price}
            </span>

            {product.offerPrice && (
              <span className="line-through text-gray-500">
                ₹{product.price}
              </span>
            )}

            {discount > 0 && (
              <span className="bg-green-500/10 text-green-400 px-2 py-1 text-xs rounded">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* FEATURES */}
          <div className="space-y-2 text-sm text-gray-300">
            <p className="flex items-center gap-2">
              <Sparkles size={14} className="text-orange-400" />
              High brightness visual effects
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-green-400" />
              Safety tested & certified
            </p>
            <p className="flex items-center gap-2">
              <Truck size={14} className="text-blue-400" />
              Fast delivery available
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="text-sm text-gray-400">
            {showMore
              ? "Premium quality festive crackers designed for bright and colorful celebrations. Built with enhanced safety standards and long-lasting performance."
              : "Premium quality festive crackers designed for bright and colorful celebrations..."}

            <button
              onClick={() => setShowMore(!showMore)}
              className="text-orange-400 ml-2"
            >
              {showMore ? "Show less" : "Read more"}
            </button>
          </div>

          {/* CART */}
          <div className="pt-4 border-t border-white/10">
            {isOutOfStock ? (
              <button className="bg-gray-700 h-[48px] px-8 rounded-xl">
                Out of Stock
              </button>
            ) : qty === 0 ? (
              <button
                onClick={() => {
                  addToCart(product);
                  openCart();
                }}
                className="
                  bg-orange-500 hover:bg-orange-600
                  h-[48px] px-10 rounded-xl
                  flex items-center justify-center
                "
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center gap-4">

                {/* 🔥 QTY BOX */}
                <div
                  className="
                    flex items-center
                    h-[48px]
                    bg-orange-500/10
                    border border-orange-500/20
                    rounded-xl
                    overflow-hidden
                  "
                >
                  <button
                    onClick={() => updateQty(product.id, qty - 1)}
                    className="px-4 h-full hover:bg-orange-500/20"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="px-5 text-sm font-medium">
                    {qty}
                  </span>

                  <button
                    onClick={() => updateQty(product.id, qty + 1)}
                    className="px-4 h-full hover:bg-orange-500/20"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* 🔥 VIEW CART BUTTON */}
                <button
                  onClick={openCart}
                  className="
                    bg-orange-500 hover:bg-orange-600
                    h-[48px] w-[48px]
                    rounded-xl
                    flex items-center justify-center
                  "
                >
                   <ShoppingCart size={18} />
                </button>

              </div>
            )}

          </div>
        </div>
      </div>

      {/* 🔥 MODAL */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">

          {/* BACKDROP */}
          <div
            className="absolute inset-0"
            onClick={() => setShowGallery(false)}
          />

          {/* CONTENT */}
          <div className="relative w-full max-w-5xl mx-auto px-4 flex items-center justify-center">

            {/* CLOSE */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 text-white text-2xl z-10"
            >
              ✕
            </button>

            {/* LEFT */}
            <button
              onClick={() =>
                setGalleryIndex((prev) =>
                  prev === 0 ? product.images.length - 1 : prev - 1
                )
              }
              className="absolute left-2 md:left-4 text-white text-4xl z-10"
            >
              ‹
            </button>

            {/* MEDIA */}
            <div className="w-full flex items-center justify-center">
              {currentMedia.includes("mp4") ? (
                <video
                  src={currentMedia}
                  controls
                  autoPlay
                  className="max-h-[80vh] rounded-xl"
                />
              ) : (
                <img
                  src={currentMedia}
                  className="max-h-[80vh] object-contain rounded-xl"
                />
              )}
            </div>

            {/* RIGHT */}
            <button
              onClick={() =>
                setGalleryIndex((prev) =>
                  prev === product.images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-2 md:right-4 text-white text-4xl z-10"
            >
              ›
            </button>

          </div>
        </div>
      )}

      <RelatedProducts products={fallbackProducts} openCart={openCart} />
    </div>
  );
};

export default ProductDetailsPage;