import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import CheckoutStepper from "../components/common/CheckoutStepper";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const CheckoutPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [payment, setPayment] = useState("whatsapp");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "India",
    address1: "",
    address2: "",
    city: "",
    state: "Tamil Nadu",
    pincode: "",
    phone: "",
    email: "",
    password: "",
    notes: "",
    upi: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const subtotal = cart.reduce(
    (acc: number, item: any) =>
      acc + (item.offerPrice || item.price) * item.qty,
    0
  );

  const packing = Math.round(subtotal * 0.03);
  const total = subtotal + packing;

  const handlePlaceOrder = () => {
    console.log({ form, payment });
    navigate("/order-success");
  };

  const input =
    "px-3 py-2 rounded-md text-sm text-white border border-[#1e293b] bg-[#0f172a] outline-none focus:border-orange-400";

  return (
    <>
      <CheckoutStepper />

      <div className="max-w-[1200px] mx-auto pb-24 grid lg:grid-cols-3 gap-6">

        {/* 🔥 LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* BILLING */}
          <div className="bg-[#020617] p-5 rounded-xl border border-[#1e293b] space-y-4">

            <h2 className="text-white font-semibold">Billing Details</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input name="firstName" placeholder="First Name *" onChange={handleChange} className={input}/>
              <input name="lastName" placeholder="Last Name *" onChange={handleChange} className={input}/>

              <input name="company" placeholder="Company Name (optional)" onChange={handleChange} className={"md:col-span-2 " + input}/>

              <select name="country" className={"md:col-span-2 "+input}>
                <option>India</option>
              </select>

              <input name="address1" placeholder="House number and street name *" onChange={handleChange} className={"md:col-span-2 " + input}/>
              <input name="address2" placeholder="Apartment, suite, etc (optional)" onChange={handleChange} className={"md:col-span-2 " + input}/>

              <input name="city" placeholder="Town / City *" onChange={handleChange} className={input}/>

              <select name="state" className={input}>
                <option>Tamil Nadu</option>
              </select>

              <input name="pincode" placeholder="PIN Code *" onChange={handleChange} className={input}/>
              <input name="phone" placeholder="Phone *" onChange={handleChange} className={input}/>

              <input name="email" placeholder="Email address *" onChange={handleChange} className={"md:col-span-2 " + input}/>
            </div>

            {/* PASSWORD */}
            <div className="border border-[#1e293b] p-4 rounded-lg">
              <p className="text-sm text-gray-300 mb-2">
                Create account password *
              </p>

              <div className="flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={input + " flex-1"}
                  onChange={handleChange}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-gray-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

          </div>

          {/* NOTES */}
          <div className="bg-[#020617] p-5 rounded-xl border border-[#1e293b]">
            <h3 className="text-white font-semibold mb-3">
              Additional Information
            </h3>

            <textarea
              name="notes"
              placeholder="Notes about your order..."
              rows={4}
              className={input + " w-full"}
              onChange={handleChange}
            />
          </div>

        </div>

        {/* 🔥 RIGHT */}
        <div className="hidden lg:block sticky top-[140px]">
          <div className="h-[calc(100vh--220px)] flex flex-col">

            {/* ORDER */}
            <div className="bg-[#020617] border border-[#1e293b] rounded-xl flex flex-col overflow-hidden">

              <div className="px-5 py-4 border-b border-[#1e293b]">
                <h3 className="text-white font-semibold">Your Order</h3>
              </div>

              <div className="px-5 py-4 space-y-4 overflow-y-auto flex-1 cart-scroll">

                {cart.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex gap-2 items-center">
                      <img src={item.images[0]} className="h-8 w-8"/>
                      <div>
                        <p>{item.name}</p>
                        <p className="text-xs text-gray-400">× {item.qty}</p>
                      </div>
                    </div>
                    ₹{(item.offerPrice || item.price) * item.qty}
                  </div>
                ))}

              </div>

              <div className="px-5 py-4 border-t border-[#1e293b] text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Packing Charges</span>
                  <span>₹{packing}</span>
                </div>

                <div className="flex justify-between text-white font-semibold">
                  <span>Total</span>
                  <span className="text-orange-400">₹{total}</span>
                </div>
              </div>

            </div>

            {/* PAYMENT */}
            <div className="bg-[#020617] border border-[#1e293b] rounded-xl mt-4 p-5 space-y-4">

              <h4 className="text-white font-semibold">Payment Method</h4>

              {/* BANK */}
              <label className="block">
                <input type="radio" checked={payment==="bank"} onChange={()=>setPayment("bank")} />
                <span className="ml-2">Direct Bank Transfer</span>

                {payment === "bank" && (
                  <div className="text-xs mt-2 text-gray-400 bg-[#0f172a] p-3 rounded">
                    Make your payment directly into our bank account.
                  </div>
                )}
              </label>

              {/* UPI */}
              <label className="block">
                <input type="radio" checked={payment==="upi"} onChange={()=>setPayment("upi")} />
                <span className="ml-2">Pay with UPI QR Code</span>

                {payment === "upi" && (
                  <div className="mt-2 space-y-2">
                    <p className="text-xs text-gray-400">
                      Use any UPI app like GPay, PhonePe.
                    </p>
                    <input
                      name="upi"
                      placeholder="Enter UPI ID"
                      className={input + " w-full"}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </label>

              {/* WHATSAPP */}
              <label className="block">
                <input type="radio" checked={payment==="whatsapp"} onChange={()=>setPayment("whatsapp")} />
                <span className="ml-2">WhatsApp Order</span>

                {payment === "whatsapp" && (
                  <div className="text-xs mt-2 text-gray-400 bg-[#0f172a] p-3 rounded">
                    Send your order via WhatsApp.
                  </div>
                )}
              </label>

              <button
                onClick={handlePlaceOrder}
                className="w-full py-3 bg-orange-500 rounded-lg text-white font-semibold"
              >
                PLACE ORDER
              </button>

            </div>

          </div>
        </div>

      </div>

      {/* MOBILE */}
      <div className="lg:hidden fixed bottom-0 w-full bg-[#020617] p-4">
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-orange-500 py-2 rounded-lg text-white"
        >
          Place Order ₹{total}
        </button>
      </div>
    </>
  );
};

export default CheckoutPage;