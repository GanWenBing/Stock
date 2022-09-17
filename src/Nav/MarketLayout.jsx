import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MarketLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default MarketLayout;