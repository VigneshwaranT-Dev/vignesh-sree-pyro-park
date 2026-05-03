import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 🔥 adjust based on your navbar height
    const NAVBAR_HEIGHT = 110;

    window.scrollTo({
      top: 0,
      behavior: "instant", // use "smooth" if you want animation
    });

    // OPTIONAL (if you want offset handling later)
    document.documentElement.style.scrollPaddingTop = `${NAVBAR_HEIGHT}px`;
  }, [pathname]);

  return null;
};

export default ScrollToTop;