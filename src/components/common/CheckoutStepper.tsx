import { useLocation, useNavigate } from "react-router-dom";

const steps = [
  { name: "Cart", path: "/cart" },
  { name: "Checkout", path: "/checkout" },
  { name: "Complete", path: "/order-success" },
];

const CheckoutStepper = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = steps.findIndex((step) =>
    location.pathname.startsWith(step.path)
  );
  
  return (
    <div className="sticky top-[64px] z-40 w-full backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-4 py-10 flex items-center justify-center">

        <div className="flex items-center gap-4">

          {steps.map((step, index) => {
            const isActive = index === currentIndex;
            const isCompleted = index < currentIndex;

            return (
              <div key={step.name} className="flex items-center">

                {/* STEP */}
                <button
                  onClick={() => {
                    if (index <= currentIndex) navigate(step.path);
                  }}
                  className="flex items-center gap-3 group"
                >

                  {/* 🔥 CIRCLE */}
                  <div
                    className={`
                      relative w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold
                      transition-all duration-300

                      ${isActive && "bg-orange-500 text-white shadow-[0_0_15px_rgba(255,115,0,0.7)] scale-110"}
                      ${isCompleted && "bg-green-500 text-white"}
                      ${!isActive && !isCompleted && "bg-[#1e293b] text-gray-400"}
                    `}
                  >
                    {index + 1}

                    {/* GLOW RING */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full border border-orange-400 animate-ping opacity-30" />
                    )}
                  </div>

                  {/* 🔥 LABEL */}
                  <span
                    className={`
                      text-sm font-medium transition
                      ${isActive && "text-orange-400"}
                      ${isCompleted && "text-green-400"}
                      ${!isActive && !isCompleted && "text-gray-500"}
                    `}
                  >
                    {step.name}
                  </span>
                </button>

                {/* 🔥 CONNECTOR LINE */}
                {index !== steps.length - 1 && (
                  <div
                    className={`
                      w-12 h-[2px] mx-3 transition-all duration-300
                      ${index < currentIndex
                        ? "bg-gradient-to-r from-green-400 to-orange-400"
                        : "bg-[#1e293b]"
                      }
                    `}
                  />
                )}
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default CheckoutStepper;