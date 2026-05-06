import { useCart } from "../context/CartContext";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CheckoutStepper from "../components/common/CheckoutStepper";

const CartPage = () => {
  const { cart, updateQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc: number, item: any) =>
      acc + (item.offerPrice || item.price) * item.qty,
    0,
  );

  const savings = cart.reduce(
    (acc: number, item: any) =>
      item.offerPrice ? acc + (item.price - item.offerPrice) * item.qty : acc,
    0,
  );

  if (cart.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div
          className="
            w-full max-w-md
            rounded-2xl
            backdrop-blur-xl
            p-8
            text-center
          "
        >
          {/* ICON */}
          <div
            className="
              mx-auto mb-3
              flex items-center justify-center
            "
          >
            <span className="text-6xl">
              <ShoppingBag size={50} className="mx-auto text-orange-400" />
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-2xl font-semibold text-white">
            Your cart is empty
          </h2>

          {/* SUBTITLE */}
          <p className="text-sm text-gray-400 mt-2 leading-6">
            Add your favorite crackers and festive combos to continue shopping.
          </p>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="
              mt-6
              h-[46px]
              px-6
              rounded-xl
              bg-gradient-to-r from-orange-500 to-orange-600
              hover:from-orange-400 hover:to-orange-500
              text-white
              shadow-[0_0_15px_rgba(255,115,0,0.5)]
              transition
              font-medium
            "
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <CheckoutStepper />

      <div className="max-w-[1200px] mx-auto pt-6 pb-24 grid lg:grid-cols-3 gap-6">
        {/* 🔥 LEFT - ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item: any) => (
            <div
              key={item.id}
              className="flex gap-4 bg-[#020617] p-4 rounded-xl border border-[#1e293b]"
            >
              {/* IMAGE */}
              <div className="w-20 h-20 bg-[#0f172a] rounded-lg flex items-center justify-center">
                <img src={item.images?.[0]} className="h-14 object-contain" />
              </div>

              {/* DETAILS */}
              <div className="flex-1">
                <p className="text-white font-medium">{item.name}</p>

                {/* PRICE */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-orange-400 font-semibold">
                    ₹{item.offerPrice || item.price}
                  </span>

                  {item.offerPrice && (
                    <span className="text-gray-500 line-through text-sm">
                      ₹{item.price}
                    </span>
                  )}
                </div>

                {/* QTY */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center bg-[#0f172a] border border-[#1e293b] rounded-md px-3 py-1 gap-3">
                    <button
                      onClick={() =>
                        item.qty === 1
                          ? removeFromCart(item.id)
                          : updateQty(item.id, item.qty - 1)
                      }
                    >
                      <Minus size={16} />
                    </button>

                    <span className="text-white">{item.qty}</span>

                    <button onClick={() => updateQty(item.id, item.qty + 1)}>
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* TOTAL */}
              <div className="text-right text-sm text-gray-400">
                ₹{(item.offerPrice || item.price) * item.qty}
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 RIGHT - SUMMARY */}
        <div className="hidden lg:block bg-[#020617] p-5 rounded-xl border border-[#1e293b] h-fit sticky top-[190px]">
          <h3 className="text-white font-semibold mb-4">Order Summary</h3>

          {/* SUBTOTAL */}
          <div className="flex justify-between text-gray-400 mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          {/* SAVINGS */}
          {savings > 0 && (
            <div className="flex justify-between text-green-400 mb-2">
              <span>You Saved</span>
              <span>-₹{savings}</span>
            </div>
          )}

          {/* COUPON */}
          <div className="mt-4">
            <input
              placeholder="Apply coupon"
              className="w-full bg-[#0f172a] border border-[#1e293b] px-3 py-2 rounded-md text-sm"
            />
          </div>

          {/* TOTAL */}
          <div className="flex justify-between text-white mt-4 font-semibold text-lg">
            <span>Total</span>
            <span className="text-orange-400">₹{subtotal}</span>
          </div>

          {/* CHECKOUT */}
          <button
            className="w-full bg-orange-500 mt-4 py-2 rounded-lg text-white"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#020617] border-t border-[#1e293b] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">Total</span>
          <span className="text-orange-400 font-semibold text-lg">
            ₹{subtotal}
          </span>
        </div>

        <button
          className="w-full bg-orange-500 py-2 rounded-lg text-white font-medium"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  );
};

export default CartPage;
