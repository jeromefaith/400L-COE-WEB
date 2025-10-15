import { StudentsDB } from "../studentsDb";

export const authUser = (matno: string, password: string) => {
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
