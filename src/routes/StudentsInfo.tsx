import { useUserContext } from "../context/userContext";
import FemaleProfile from "../assets/icon-female-user.svg?react";
import MaleProfile from "../assets/icon-male-user.svg?react";

const StudentsInfo = () => {
  const { user } = useUserContext();

  return (
    <div className='lg:p-10 p-4 '>
      <h2 className='text-light-green text-3xl'>Student Info</h2>
      <div className='flex gap-8 mt-10 '>
        <div>
          {user?.gender === "F" ? (
            <FemaleProfile className='w-30 h-30' />
          ) : (
            <MaleProfile className='w-30 h-30' />
          )}
        </div>
        <div className='lg:w-[20%]'>
          <ul className='space-y-4'>
            <li className='flex justify-between flex-wrap'>
              <p className='font-bold'>Name :</p>
              <p>{user?.name}</p>
            </li>
            <li className='flex justify-between flex-wrap'>
              <p className='font-bold'>Mat no. :</p>
              <p>{user?.matno}</p>
            </li>
            <li className='flex justify-between flex-wrap'>
              <p className='font-bold'>Gender/sex :</p>
              <p>{user?.gender === "F" ? "Female" : "Male"}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentsInfo;
