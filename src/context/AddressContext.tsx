import { createContext, useContext, useEffect, useState } from "react";

export type Address = {
  id: string;
  fullName: string;
  mobile: string;
  address: string;
  city: string;
  pincode: string;
};

type AddressContextType = {
  addresses: Address[];

  addAddress: (data: Address) => void;

  deleteAddress: (id: string) => void;
};

const AddressContext = createContext<AddressContextType | null>(null);

export const AddressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  // 🔥 LOAD
  useEffect(() => {
    const stored = localStorage.getItem("vsp_addresses");

    if (stored) {
      setAddresses(JSON.parse(stored));
    }
  }, []);

  // 🔥 SAVE
  useEffect(() => {
    localStorage.setItem("vsp_addresses", JSON.stringify(addresses));
  }, [addresses]);

  // 🔥 ADD
  const addAddress = (data: Address) => {
    setAddresses((prev) => [data, ...prev]);
  };

  // 🔥 DELETE
  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        addAddress,
        deleteAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);

  if (!context) {
    throw new Error("useAddress must be used inside AddressProvider");
  }

  return context;
};
