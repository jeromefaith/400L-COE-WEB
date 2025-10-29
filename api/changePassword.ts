import fs from "fs";
import path from "path";

import type { VercelRequest, VercelResponse } from "@vercel/node";

const studentsDB = JSON.parse(
  fs.readFileSync("./Database/StudentsDB.json", "utf-8")
);

interface Student {
  name: string;
  gender: string;
  matno: string;
  password: string;
}
const dbPath = path.resolve("./Database/StudentsDB.json");
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { matno, oldPassword, newPassword } = req.body;

  if (!matno || !oldPassword || !newPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Load students from file or fallback to TS data
  let studentsData: Student[];
  if (fs.existsSync(dbPath)) {
    studentsData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  } else {
    studentsData = studentsDB;
  }

  const student = studentsData.find((s) => s.matno === matno);
  if (!student) return res.status(404).json({ error: "Student not found" });

  if (student.password.toLowerCase() !== String(oldPassword).toLowerCase())
    return res.status(401).json({ error: "Incorrect current password" });

  if (newPassword.length < 4)
    return res.status(400).json({ error: "New password too short" });

  student.password = newPassword;

  fs.writeFileSync(dbPath, JSON.stringify(studentsData, null, 2), "utf-8");

  return res
    .status(200)
    .json({ message: "Password updated successfully", user: student });
}
