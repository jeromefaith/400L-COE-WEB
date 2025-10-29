import { useUserContext } from "../context/userContext";
import FinishedTable from "../components/ui/finishedTable";
const Dashboard = () => {
  const { user } = useUserContext();

  return (
    <div className='p-2 lg:p-8 min-h-screen'>
      <h1 className=' text-dark-green text-3xl font-bold'>
        Welcome {user?.name.split(" ")[0]}
      </h1>
      <FinishedTable />
    </div>
  );
};

export default Dashboard;
