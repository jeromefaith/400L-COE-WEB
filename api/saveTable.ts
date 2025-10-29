import fs from "fs";
import path from "path";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { headers, rows } = req.body;

    if (!headers || !rows) {
      return res.status(400).json({ error: "Invalid table data" });
    }

    // Define the file path in your project (relative to root)
    const filePath = path.join(process.cwd(), "Database", "TableData.json");

    // Ensure Database folder exists
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    // Write data to JSON file
    fs.writeFileSync(
      filePath,
      JSON.stringify({ headers, rows }, null, 2),
      "utf-8"
    );

    return res.status(200).json({ message: "Table saved successfully" });
  } catch (error) {
    console.error("Error saving table:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
