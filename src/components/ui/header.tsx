import { useState } from "react";
import MenuIcon from "../../assets/icon-menu.svg?react";
import NotificationIcon from "../../assets/icon-notification.svg?react";
import Announcements from "./announcements";

type HeaderProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

const Header = ({ setIsSidebarOpen, isSidebarOpen }: HeaderProps) => {
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  return (
    <header className='bg-light-green px-4 lg:px-10 relative py-6 flex justify-between items-center'>
      <MenuIcon
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className='cursor-pointer'
      />

      <NotificationIcon
        width={"2rem"}
        height={"2rem"}
        onClick={() => setShowAnnouncements(!showAnnouncements)}
        className='cursor-pointer'
      />
      {showAnnouncements && <Announcements />}
    </header>
  );
};

export default Header;
