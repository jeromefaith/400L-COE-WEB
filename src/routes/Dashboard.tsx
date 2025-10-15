import { useUserContext } from "../context/userContext";
const Dashboard = () => {
  const { user } = useUserContext();

  return (
    <div className='justify-center items-center flex min-h-screen'>
      <h1 className=' text-dark-green text-3xl'>
        Welome to dashboard {user?.name}
      </h1>
    </div>
  );
};

export default Dashboard;
