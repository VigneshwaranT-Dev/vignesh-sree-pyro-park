// src/components/auth/AuthModal.tsx

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthModal = ({ isOpen, onClose }: Props) => {
  const [mode, setMode] = useState<"login" | "register">("login");

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* WRAPPER */}
          <motion.div
            className="
              fixed inset-0 z-[10000]
              flex items-end lg:items-center
              justify-center
              p-0 lg:p-4
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* MODAL */}
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 40,
                scale: 0.97,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 24,
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative isolate

                w-full
                max-w-5xl

                overflow-hidden

                rounded-t-[32px]
                lg:rounded-3xl

                border border-white/10

                bg-[#081120]/95
                backdrop-blur-2xl

                shadow-[0_20px_80px_rgba(0,0,0,0.85)]
              "
            >
              {/* AMBIENT GLOW */}
              <div
                className="
                  absolute top-0 left-1/2
                  -translate-x-1/2
                  w-[420px] h-[180px]
                  bg-orange-500/10
                  blur-[120px]
                  pointer-events-none
                "
              />

              {/* CLOSE */}
              <button
                onClick={onClose}
                className="
                  absolute top-4 right-4 z-30

                  h-10 w-10
                  flex items-center justify-center

                  rounded-full
                  border border-white/10

                  bg-black/40
                  backdrop-blur-xl

                  text-gray-300
                  hover:text-white

                  hover:border-orange-500/40
                  hover:bg-orange-500/10

                  transition-all duration-300
                "
              >
                <X size={18} />
              </button>

              <div className="grid lg:grid-cols-2 min-h-[620px]">
                {/* LEFT */}
                <div
                  className="
                    relative hidden lg:flex
                    flex-col justify-between

                    p-9

                    bg-gradient-to-br
                    from-[#020617]
                    via-[#0f172a]
                    to-orange-950/10

                    border-r border-white/5
                  "
                >
                  {/* GLOW */}
                  <div
                    className="
                      absolute top-10 left-0
                      w-[220px] h-[220px]
                      bg-orange-500/10
                      blur-[100px]
                      rounded-full
                    "
                  />

                  {/* CONTENT */}
                  <div className="relative z-10">
                    <div
                      className="
                        inline-flex items-center

                        px-4 py-1.5
                        rounded-full

                        border border-orange-500/20
                        bg-orange-500/10

                        text-orange-300
                        text-sm
                      "
                    >
                      Premium Fireworks Store
                    </div>

                    <h1
                      className="
                        mt-8
                        max-w-[420px]

                        text-[56px]
                        font-bold
                        leading-[1]

                        tracking-tight
                        text-white
                      "
                    >
                      Celebrate Every Festival With Premium Fireworks
                    </h1>

                    <p
                      className="
                        mt-6
                        max-w-[420px]

                        text-[15px]
                        leading-7
                        text-gray-400
                      "
                    >
                      Discover high-quality crackers, festive collections, and
                      premium celebration products from Vignesh Sree Pyro Park.
                    </p>
                  </div>

                  {/* STATS */}
                  <div className="relative z-10 flex gap-4 mt-10">
                    <div
                      className="
                        flex-1

                        rounded-2xl
                        border border-white/10

                        bg-white/[0.05]
                        backdrop-blur-xl

                        p-4

                        hover:border-orange-500/20
                        hover:bg-white/[0.07]

                        transition-all duration-300
                      "
                    >
                      <p className="text-xl font-semibold text-white">
                        Premium
                      </p>

                      <p className="mt-2 text-sm text-gray-400 leading-6">
                        Festival collections
                      </p>
                    </div>

                    <div
                      className="
                        flex-1

                        rounded-2xl
                        border border-white/10

                        bg-white/[0.05]
                        backdrop-blur-xl

                        p-4

                        hover:border-orange-500/20
                        hover:bg-white/[0.07]

                        transition-all duration-300
                      "
                    >
                      <p className="text-xl font-semibold text-white">
                        Sivakasi
                      </p>

                      <p className="mt-2 text-sm text-gray-400 leading-6">
                        Trusted fireworks source
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <motion.div
                  layout
                  transition={{
                    layout: {
                      duration: 0.35,
                      ease: "easeInOut",
                    },
                  }}
                  className="
                    relative

                    p-6 sm:p-8 lg:p-9

                    bg-[#081120]/80
                    backdrop-blur-2xl
                  "
                >
                  {/* MOBILE HEADER */}
                  <div className="lg:hidden mb-8">
                    <h2 className="text-2xl font-bold text-white">
                      Vignesh Sree Pyro Park
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                      Premium festive shopping experience
                    </p>
                  </div>

                  {/* TOGGLE */}
                  <div
                    className="
                      relative

                      mb-8
                      flex

                      rounded-xl

                      border border-white/10

                      bg-[#020617]/80
                      backdrop-blur-xl

                      p-1
                    "
                  >
                    {/* ACTIVE TAB */}
                    <motion.div
                      layoutId="authTab"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className={`
                        absolute top-1 bottom-1
                        w-[calc(50%-4px)]

                        rounded-lg

                        bg-gradient-to-r
                        from-orange-500
                        to-orange-600

                        shadow-[0_0_25px_rgba(255,115,0,0.35)]

                        ${mode === "login" ? "left-1" : "left-[calc(50%+2px)]"}
                      `}
                    />

                    <button
                      onClick={() => setMode("login")}
                      className={`
                        relative z-10
                        flex-1

                        h-[46px]

                        rounded-lg

                        text-sm
                        font-semibold

                        transition-colors duration-300

                        ${
                          mode === "login"
                            ? "text-white"
                            : "text-gray-400 hover:text-white"
                        }
                      `}
                    >
                      Login
                    </button>

                    <button
                      onClick={() => setMode("register")}
                      className={`
                        relative z-10
                        flex-1

                        h-[46px]

                        rounded-lg

                        text-sm
                        font-semibold

                        transition-colors duration-300

                        ${
                          mode === "register"
                            ? "text-white"
                            : "text-gray-400 hover:text-white"
                        }
                      `}
                    >
                      Register
                    </button>
                  </div>

                  {/* FORM SWITCH */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mode}
                      initial={{
                        opacity: 0,
                        y: 10,
                        filter: "blur(6px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                        filter: "blur(6px)",
                      }}
                      transition={{
                        duration: 0.25,
                        ease: "easeOut",
                      }}
                    >
                      {mode === "login" ? (
                        <LoginForm onSuccess={onClose} />
                      ) : (
                        <RegisterForm onSuccess={onClose} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
