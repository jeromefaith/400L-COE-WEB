import { useState } from "react";
import Header from "../components/ui/header";
import Sidebar from "../components/ui/sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <Header setIsSidebarOpen={setIsOpen} isSidebarOpen={isOpen} />
      <div className={`${isOpen ? "lg:grid" : ""}  grid-cols-[1fr_8fr]`}>
        <Sidebar isSidebarOpen={isOpen} />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
