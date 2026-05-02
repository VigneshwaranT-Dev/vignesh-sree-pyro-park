import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  // 🔥 Generate fake order id (later replace with backend)
  const orderId = "ORD" + Date.now();

//   const handleWhatsApp = () => {
//     const message = `
// 🧨 *New Order - Sree Vignesh Pyro Park*

// 🆔 Order ID: ${orderId}

// 🛒 Items:
// ${cart
//   .map(
//     (item: any) =>
//       `• ${item.name} x${item.qty} - ₹${
//         (item.offerPrice || item.price) * item.qty
//       }`
//   )
//   .join("\n")}

// 💰 Total: ₹${total}

// 📍 Customer Details:
// (Will add later)

// `;

//     const url = `https://wa.me/919876543210?text=${encodeURIComponent(
//       message
//     )}`;

//     window.open(url, "_blank");
//   };

  const handleContinue = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">

      <div className="max-w-xl w-full bg-[#0f172a] border border-[#1e293b] rounded-2xl p-8 text-center">

        {/* ✅ SUCCESS ICON */}
        <CheckCircle
          size={80}
          className="text-green-500 mx-auto mb-4"
        />

        <h1 className="text-2xl font-semibold text-white">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-400 mt-2 text-sm">
          Thank you for your order. We’ll contact you shortly.
        </p>

        {/* ORDER ID */}
        <div className="mt-4 bg-[#020617] border border-[#1e293b] p-3 rounded-lg">
          <p className="text-gray-400 text-xs">Order ID</p>
          <p className="text-orange-400 font-semibold">
            {orderId}
          </p>
        </div>

        {/* 🔥 ORDER SUMMARY */}
        {/* <div className="mt-6 text-left space-y-3 max-h-[200px] overflow-y-auto cart-scroll">

          {cart.map((item: any) => (
            <div
              key={item.id}
              className="flex justify-between text-sm text-gray-300"
            >
              <span>
                {item.name} × {item.qty}
              </span>

              <span>
                ₹{(item.offerPrice || item.price) * item.qty}
              </span>
            </div>
          ))}

        </div> */}

        {/* TOTAL */}
        {/* <div className="mt-4 flex justify-between text-white font-semibold border-t border-[#1e293b] pt-3">
          <span>Total</span>
          <span className="text-orange-400">₹{total}</span>
        </div> */}

        {/* ACTIONS */}
        <div className="mt-6 space-y-3">

          {/* <button
            onClick={handleWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg text-white"
          >
            Send Order via WhatsApp
          </button> */}

          <button
            onClick={handleContinue}
            className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded-lg text-white"
          >
            Continue Shopping
          </button>

        </div>

      </div>
    </div>
  );
};

export default OrderSuccessPage;