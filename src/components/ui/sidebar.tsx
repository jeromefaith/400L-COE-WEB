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
      className={`py-8 px-4 absolute -left-[120%] lg:relative bg-light-green w-[13rem] h-screen ${
        isSidebarOpen ? "lg:block left-0 " : "lg:hidden -left-1/2"
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
          <NavLink to='/course-materials'>Course Materials</NavLink>
        </li>
        <li>
          <NavLink to='/timetable'>Timetable</NavLink>
        </li>
        <li>
          <NavLink to='/results'>Results</NavLink>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
