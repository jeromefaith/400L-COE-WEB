import type { Student } from "../context/userContext";

export const authUser = async (matno: string, password: string) => {
  const res = await fetch("/api/authenticate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ matno, password }),
  });
  const data = await res.json();

  const student: Student | null = res.ok ? data.user : null;
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
