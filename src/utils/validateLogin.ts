export function validateInputs(password: string, matno: string) {
  const errors: { password: string; matno: string } = {
    password: "",
    matno: "",
  };

  // 1️⃣ Check for empty fields
  if (!password || password.trim() === "") {
    errors.password = "Password field cannot be empty.";
  }

  if (!matno || matno.trim() === "") {
    errors.matno = "Matric number field cannot be empty.";
  }

  // 2️⃣ Validate matric number format
  // Example format: ENG/COE/22003798
  const matnoPattern = /^[A-Z]{3}\/[A-Z]{3}\/\d{8}$/;

  if (matno && !matnoPattern.test(matno.trim())) {
    errors.matno =
      "Matric number format is invalid. Expected format: ENG/COE/XXXXXXXX";
  }

  // 3️⃣ Return result
  return {
    isValid: errors.matno.length === 0 && errors.password.length === 0,
    errors,
  };
}
