import { useUserContext } from "../../context/userContext";
import ProfileIcon from "../../assets/account.svg?react";
import { NavLink, Link } from "react-router";
import { useNavigate } from "react-router";

const Sidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav
      className={`py-8 px-4 absolute lg:relative lg:left-0 bg-light-green w-[13rem] transition-all duration-125 h-screen ${
        isSidebarOpen ? "lg:block -left-[120%]" : "lg:hidden left-0"
      }`}
    >
      <div className='mb-10 text-white'>
        <Link to={"/student-info"}>
          <ProfileIcon
            width={"2rem"}
            height={"2rem"}
            className='cursor-pointer mb-4'
          />
        </Link>
        <h2>{user?.name}</h2>
      </div>

      <ul className='flex flex-col gap-4 text-white sidebar-links'>
        <li>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to='/student-info'>Student Info</NavLink>
        </li>
        <li>
          <NavLink to='/timetable'>Timetable</NavLink>
        </li>
        {user?.status === "admin" && (
          <li>
            <NavLink to='/set-announcements' className='text-[1rem]'>
              Set Announcements
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to='/change-password'>Change password</NavLink>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
