// src/components/address/AddAddressModal.tsx

import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AuthInput from "../auth/AuthInput";
import { useAddress } from "../../context/AddressContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddAddressModal = ({ isOpen, onClose }: Props) => {
  const { addAddress } = useAddress();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [addressType, setAddressType] = useState("Home");
  const [isDefault, setIsDefault] = useState(false);
  const [error, setError] = useState("");

  // ✅ FIX: Reset ALL state every time the modal opens or closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      // Reset form + error when modal closes
      setFullName("");
      setMobile("");
      setAddress("");
      setLandmark("");
      setCity("");
      setState("");
      setPincode("");
      setAddressType("Home");
      setIsDefault(false);
      setError("");
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleClose = () => {
    setError(""); // clear immediately on close click
    onClose();
  };

  const handleSave = () => {
    if (!fullName || !mobile || !address || !city || !state || !pincode) {
      setError("Please fill all required fields");
      return;
    }
    if (mobile.length < 10) {
      setError("Please enter valid mobile number");
      return;
    }
    if (pincode.length < 6) {
      setError("Please enter valid pincode");
      return;
    }

    addAddress({
      id: crypto.randomUUID(),
      fullName,
      mobile,
      address,
      landmark,
      city,
      state,
      pincode,
      addressType,
      isDefault,
    } as any);

    onClose(); // useEffect handles the reset
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99998,
              backgroundColor: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          />

          {/* MODAL WRAPPER */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "672px",
                maxHeight: "calc(100vh - 32px)",
                display: "flex",
                flexDirection: "column",
                borderRadius: "28px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "#071120",
                boxShadow: "0 25px 80px rgba(0,0,0,0.65)",
                overflow: "hidden",
              }}
            >
              {/* GLOW */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 240,
                  height: 240,
                  background: "rgba(249,115,22,0.1)",
                  filter: "blur(120px)",
                  pointerEvents: "none",
                }}
              />

              {/* CLOSE */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 z-20 h-10 w-10 flex items-center justify-center rounded-full border border-white/10 bg-black/40 text-gray-300 hover:text-white hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-300"
              >
                <X size={18} />
              </button>

              {/* SCROLLABLE BODY */}
              <div
                style={{
                  position: "relative",
                  zIndex: 10,
                  padding: "20px 24px 8px",
                  overflowY: "auto",
                  flex: 1,
                  minHeight: 0,
                }}
              >
                {/* TOP */}
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    <MapPin size={24} />
                  </div>
                  <div className="pr-10">
                    <h2 className="text-3xl font-bold text-white">
                      Add Address
                    </h2>
                    <p className="mt-1 text-sm text-gray-400 leading-6">
                      Please provide a valid delivery address for smooth order
                      delivery.
                    </p>
                  </div>
                </div>

                {/* NOTE */}
                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-orange-500/10 bg-orange-500/5 p-3">
                  <Info size={17} className="text-orange-400 mt-0.5 shrink-0" />
                  <p className="text-sm leading-6 text-gray-400">
                    Ensure your address, city, state, and pincode are correct to
                    avoid delivery delays.
                  </p>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                {/* FORM */}
                <div className="mt-5 space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <AuthInput
                      label="Full Name"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setError("");
                      }}
                    />
                    <AuthInput
                      label="Mobile Number"
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                        setError("");
                      }}
                    />
                  </div>

                  <AuthInput
                    label="Full Address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setError("");
                    }}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <AuthInput
                      label="Landmark (Optional)"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                    />
                    <AuthInput
                      label="Pincode"
                      value={pincode}
                      onChange={(e) => {
                        setPincode(e.target.value);
                        setError("");
                      }}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <AuthInput
                      label="City"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        setError("");
                      }}
                    />
                    <AuthInput
                      label="State"
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                        setError("");
                      }}
                    />
                  </div>

                  {/* ADDRESS TYPE */}
                  <div className="flex items-center gap-4 pt-1 pb-3">
                    <p className="text-sm font-medium text-gray-300 shrink-0">
                      Address Type
                    </p>
                    <div className="flex items-center gap-3">
                      {["Home", "Work", "Other"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setAddressType(type)}
                          className={`h-[38px] px-5 rounded-xl border text-sm font-medium transition-all duration-300 ${
                            addressType === type
                              ? "border-orange-500/20 bg-orange-500/10 text-orange-300"
                              : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* STICKY FOOTER */}
              <div
                style={{
                  position: "relative",
                  zIndex: 10,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "12px",
                  padding: "16px 24px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  backgroundColor: "#071120",
                }}
              >
                <button
                  onClick={handleClose}
                  className="h-[42px] px-5 rounded-xl border border-white/10 bg-white/5 text-gray-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="h-[42px] px-6 rounded-xl font-semibold text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-[0_0_15px_rgba(255,115,0,0.5)] transition-all duration-300"
                >
                  Save Address
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default AddAddressModal;
