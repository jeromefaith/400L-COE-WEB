import fs from "fs";
import path from "path";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const dbPath = path.resolve("./Database/Announcements.json");

interface Announcement {
  id: string;
  message: string;
  createdAt: string;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Ensure JSON file exists
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([], null, 2), "utf-8");
  }

  const data: Announcement[] = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

  // GET — fetch all
  if (req.method === "GET") {
    return res.status(200).json(data);
  }

  // POST — add new
  if (req.method === "POST") {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message text is required" });
    }

    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      message,
      createdAt: new Date().toISOString(),
    };

    data.push(newAnnouncement);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");

    return res.status(201).json({ message: "Announcement added", data });
  }

  // DELETE — remove one
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Announcement ID is required" });
    }

    const filtered = data.filter((a) => a.id !== id);

    fs.writeFileSync(dbPath, JSON.stringify(filtered, null, 2), "utf-8");

    return res
      .status(200)
      .json({ message: "Announcement deleted", data: filtered });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
