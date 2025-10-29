import type { Student } from "../context/userContext";

export const authUser = async (matno: string, password: string) => {
  const response = await fetch("../../Database/StudentsDB.json");
  const StudentsDB: Student[] = await response.json();

  // Find the student whose matno and password match
  const student = StudentsDB.find(
    (s) =>
      s.matno.toUpperCase() === matno.toUpperCase() &&
      s.password.toLowerCase() === password.toLowerCase()
  );

  // Return authentication result
  if (student) {
    return {
      success: true,
      message: `Welcome ${student.name}!`,
      student,
    };
  } else {
    return {
      success: false,
      message: "Invalid matric number or password.",
    };
  }
};
