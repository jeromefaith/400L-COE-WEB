import { useState } from "react";
import { validateInputs } from "../utils/validateLogin";
import { useUserContext } from "../context/userContext";
import { authUser } from "../utils/authUser";
import { useNavigate } from "react-router";

type LoginFieldsType = {
  matno: string;
  password: string;
};

const defaultFieldValues = {
  matno: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [loginFields, setLoginFields] =
    useState<LoginFieldsType>(defaultFieldValues);
  const { matno, password } = loginFields;
  const [loginError, setLoginError] = useState<LoginFieldsType>();
  const { login } = useUserContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginFields({ ...loginFields, [name]: value.trim() });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { errors, isValid } = validateInputs(password, matno);

    if (errors.password || errors.matno) return setLoginError(errors);
    else if (isValid) {
      setLoginError(defaultFieldValues);
      const { success, student, message } = await authUser(matno, password);

      if (success && student) {
        login(student);
        navigate("/dashboard", { replace: true });
      } else alert(message);
    }
  };

  return (
    <div className='bg-light-green flex justify-center p-2 items-center min-h-screen'>
      <form
        onSubmit={handleLogin}
        className='bg-white lg:p-10 p-6  rounded-xl shadow-2xl flex flex-col lg:w-[30rem]  '
      >
        <h2 className='text-center text-dark-green pb-4 text-3xl font-bold'>
          Student Portal Login
        </h2>
        <div>
          <input
            className='sign-in-input'
            placeholder='Enter Mat no.'
            type='text'
            name='matno'
            onChange={handleChange}
            value={matno}
          />
          {loginError?.matno && (
            <p className='text-red-500 text-md'>{loginError.matno}</p>
          )}
        </div>

        <div>
          <input
            className='sign-in-input'
            placeholder='Enter password'
            type='password'
            name='password'
            onChange={handleChange}
            value={password}
          />
          {loginError?.password && (
            <p className='text-red-500 text-md'>{loginError.password}</p>
          )}
        </div>
        <button className='bg-dark-green py-3 rounded-sm mt-8 cursor-pointer text-white'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
