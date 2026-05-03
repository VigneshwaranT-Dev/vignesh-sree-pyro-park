import { Star, ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

type Props = {
  item: any;
  onCartOpen?: () => void;
  onClick?: () => void;
};

const ProductListCard = ({ item, onCartOpen, onClick }: Props) => {
  const { cart, addToCart, updateQty } = useCart();

  const price = item.offerPrice || item.price;
  const cartItem = cart.find((c: any) => c.id === item.id);
  const qty = cartItem?.qty || 0;

  const isOutOfStock = item.inStock === false;

  const discount =
    item.offerPrice && item.price
      ? Math.round(((item.price - item.offerPrice) / item.price) * 100)
      : 0;

  // ✅ Handle Add / Cart click
  const handleAddClick = () => {
    if (isOutOfStock) return;

    if (qty === 0) {
      addToCart(item);
    }
    
     onCartOpen?.();
  };

  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer
        flex gap-4 p-4 rounded-xl
        bg-[#0f172a]
        border border-white/5
        hover:border-orange-500/40
        hover:shadow-[0_0_20px_rgba(255,115,0,0.08)]
        transition-all duration-300
      "
    >
      {/* IMAGE */}
      <div className="relative w-[120px] h-[120px] bg-[#020617] rounded-lg flex items-center justify-center shrink-0">

        {discount > 0 && (
          <span className="absolute top-2 left-2 text-[10px] bg-orange-500 text-white px-2 py-[2px] rounded">
            {discount}% OFF
          </span>
        )}

        {isOutOfStock && (
          <span className="absolute bottom-2 left-2 text-[10px] bg-red-500 text-white px-2 py-[2px] rounded">
            Out of Stock
          </span>
        )}

        <img
          src={item.images[0]}
          alt={item.name}
          className="h-[90px] object-contain opacity-90"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between">

        {/* TOP */}
        <div>
          <h3 className="text-white font-medium text-[15px]">
            {item.name}
          </h3>

          <div className="flex items-center gap-2 mt-1 text-xs">
            <span className="text-orange-400 flex items-center gap-1">
              <Star size={13} className="fill-orange-400" />
              {item.rating || 4.2}
            </span>
            <span className="text-gray-500">(120 reviews)</span>
          </div>

          <p className="text-gray-400 text-sm mt-2 line-clamp-2">
            Premium quality festive crackers with vibrant lighting effects.
          </p>
        </div>

        {/* BOTTOM */}
        <div className="flex items-center justify-between mt-4">

          {/* PRICE */}
          <div>
            <span className="text-orange-400 text-lg font-semibold">
              ₹{price}
            </span>

            {item.offerPrice && (
              <span className="text-gray-500 line-through ml-2 text-sm">
                ₹{item.price}
              </span>
            )}
          </div>

          {/* RIGHT SIDE */}
          {isOutOfStock ? (
            // ❌ OUT OF STOCK
            <button
              disabled
              className="
                h-[38px] px-4
                bg-gray-700 text-gray-400
                rounded-lg text-sm
                cursor-not-allowed
              "
            >
              Out of Stock
            </button>
          ) : qty === 0 ? (
            // ✅ ADD BUTTON
            <button
              onClick={handleAddClick}
              className="
                h-[38px] px-4
                rounded-lg
                bg-orange-500 hover:bg-orange-600 text-white text-sm
              "
            >
              Add
            </button>
          ) : (
            // ✅ QTY STEPPER
            <div className="flex items-center gap-2">

              <div
                className="
                  h-[38px] px-2
                  flex items-center gap-3
                  rounded-lg border
                  bg-orange-500/10 border-orange-400/40
                "
              >
                <button
                  onClick={() =>
                    updateQty(item.id, Math.max(0, qty - 1))
                  }
                  className="text-gray-300 hover:text-white"
                >
                  <Minus size={14} />
                </button>

                <span className="text-white text-sm min-w-[16px] text-center">
                  {qty}
                </span>

                <button
                  onClick={() => updateQty(item.id, qty + 1)}
                  className="text-gray-300 hover:text-white"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Optional Cart Icon (only opens cart) */}
              <button
                onClick={onCartOpen}
                className="
                  h-[38px] w-[42px]
                  flex items-center justify-center
                  rounded-lg
                  bg-orange-500 hover:bg-orange-600 text-white
                "
              >
                <ShoppingCart size={16} />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductListCard;