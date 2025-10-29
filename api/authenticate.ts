import fs from "fs";
import path from "path";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const dbPath = path.resolve("./Database/StudentsDB.json");

interface Student {
  name: string;
  gender: string;
  matno: string;
  password: string;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { matno, password } = req.body;

  if (!matno || !password)
    return res.status(400).json({ error: "All fields are required" });

  let students: Student[];
  if (fs.existsSync(dbPath)) {
    students = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  } else {
    return res.status(500).json({ error: "Database not found" });
  }

  const student = students.find(
    (s) => s.matno === matno && s.password === password
  );

  if (!student) return res.status(401).json({ error: "Invalid credentials" });

  return res.status(200).json({ message: "Login successful", user: student });
}
