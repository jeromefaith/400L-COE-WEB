import { useState, useEffect } from "react";
import { useUserContext } from "../context/userContext";

type ChangePasswordsFields = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const defaultFieldValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
const ChangePassword = () => {
  const [formFields, setFormFields] =
    useState<ChangePasswordsFields>(defaultFieldValues);
  const [message, setMessage] = useState<string | null>(null);
  const { user } = useUserContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value.trim() });
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (message) alert(message);
  }, [message]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formFields;
    if (!user) {
      setMessage("User not logged in.");
      return;
    }
    if (newPassword !== confirmPassword) return alert("Passwords do not match");
    const matno = user.matno;
    setFormFields(defaultFieldValues);
    try {
      const res = await fetch("/api/changePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matno, oldPassword, newPassword }),
      });

      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    } finally {
      setFormFields(defaultFieldValues);
    }
  };

  return (
    <div className='lg:p-8 p-2'>
      <form
        onSubmit={handleSubmit}
        className='border-black border-1 lg:w-[40rem] p-4'
        action=''
      >
        <h2 className='text-3xl text-center lg:text-left font-medium'>
          Change Password
        </h2>
        <input
          className='border-1 border-border-clr p-2 mt-4  rounded-md w-full'
          type='password'
          placeholder='Old password'
          name='oldPassword'
          onChange={handleChange}
        />
        <input
          className='border-1 border-border-clr p-2 mt-4  rounded-md w-full'
          type='password'
          placeholder='New password'
          name='newPassword'
          onChange={handleChange}
        />
        <input
          className='border-1 border-border-clr p-2 mt-4  rounded-md w-full'
          type='password'
          placeholder='Confirm password'
          name='confirmPassword'
          onChange={handleChange}
        />
        <button className='bg-light-green py-2 px-5 cursor-pointer text-white rounded-sm mt-7'>
          Change password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
