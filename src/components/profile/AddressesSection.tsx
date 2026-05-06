import { useState } from "react";
import { MapPin, Plus, Trash2 } from "lucide-react";

import { useAddress } from "../../context/AddressContext";
import AddAddressModal from "../address/AddAddressModal";

const AddressesSection = () => {
  const { addresses, deleteAddress } = useAddress();

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Saved Addresses</h1>

          <p className="mt-2 text-gray-400">Manage your delivery locations</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="
            flex items-center gap-2
            h-[46px]
            px-5
            rounded-xl
            bg-gradient-to-r from-orange-500 to-orange-600
            hover:from-orange-400 hover:to-orange-500
            text-white
            shadow-[0_0_15px_rgba(255,115,0,0.5)]
            transition-all duration-300
            font-semibold
          "
        >
          <Plus size={18} />
          Add Address
        </button>
      </div>

      {/* LIST */}
      {addresses.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          {addresses.map((item) => (
            <div
              key={item.id}
              className="
                relative overflow-hidden

                rounded-3xl
                border border-white/10

                bg-[#0f172a]/90
                backdrop-blur-2xl

                p-6
              "
            >
              {/* GLOW */}
              <div
                className="
                  absolute top-0 right-0

                  w-32 h-32

                  bg-orange-500/10
                  blur-[90px]
                "
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xl font-semibold text-white">
                      {item.fullName}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">{item.mobile}</p>
                  </div>

                  <MapPin className="text-orange-400" />
                </div>

                <p className="mt-5 text-gray-300 leading-7">{item.address}</p>

                <p className="mt-2 text-gray-400">
                  {item.city} - {item.pincode}
                </p>

                <button
                  onClick={() => deleteAddress(item.id)}
                  className="
                    mt-6

                    flex items-center gap-2

                    px-4 py-2

                    rounded-xl

                    border border-red-500/20
                    bg-red-500/10

                    text-red-400
                    text-sm

                    hover:bg-red-500/15

                    transition
                  "
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="
            mt-10

            rounded-3xl
            border border-dashed border-white/10

            bg-[#0f172a]/60

            p-14 text-center
          "
        >
          <MapPin size={50} className="mx-auto text-orange-400" />

          <h2 className="mt-5 text-2xl font-semibold text-white">
            No Saved Addresses
          </h2>

          <p className="mt-2 text-gray-400">
            Add your delivery address to continue checkout
          </p>
        </div>
      )}

      <AddAddressModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default AddressesSection;
