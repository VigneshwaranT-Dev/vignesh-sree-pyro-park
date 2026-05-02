import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-10">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout