import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    if (openCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openCart]);

  return (
    <>
      <div className="select-none flex flex-col min-h-screen">
        
        <Navbar onCartClick={() => setOpenCart(true)} />

        <div className="flex-1 px-4 md:px-10">
          <Outlet context={{ openCart: () => setOpenCart(true) }}/>
        </div>

        <Footer />
      </div>

      <CartDrawer
        isOpen={openCart}
        onClose={() => setOpenCart(false)}
      />
    </>
  );
};

export default MainLayout;
// onContextMenu={(e) => e.preventDefault()}