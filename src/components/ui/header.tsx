import MenuIcon from "../../assets/icon-menu.svg?react";
import NotificationIcon from "../../assets/icon-notification.svg?react";

type HeaderProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

const Header = ({ setIsSidebarOpen, isSidebarOpen }: HeaderProps) => {
  return (
    <header className='bg-light-green px-4 lg:px-10 py-6 flex justify-between items-center'>
      <MenuIcon
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className='cursor-pointer'
      />

      <NotificationIcon
        width={"2rem"}
        height={"2rem"}
        className='cursor-pointer'
      />
    </header>
  );
};

export default Header;
