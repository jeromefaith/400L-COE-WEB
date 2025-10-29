import fs from "fs";
import path from "path";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const filePath = path.join(process.cwd(), "Database", "TableData.json");

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "No table data found" });
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error loading table:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
