import DynamicTable from "../components/ui/dynamicTable";
import FinishedTable from "../components/ui/finishedTable";
import { useUserContext } from "../context/userContext";
const Timetable = () => {
  const { user } = useUserContext();
  return (
    <div>
      <FinishedTable />
      {user?.status === "admin" && <DynamicTable />}
    </div>
  );
};

export default Timetable;
