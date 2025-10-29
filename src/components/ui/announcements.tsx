import { useEffect, useState } from "react";

interface Announcement {
  id: string;
  message: string;
  createdAt: string;
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then(setAnnouncements)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='w-60 absolute right-0 top-16 bg-white shadow-lg rounded-md p-4 z-50'>
      <h2 style={{ textAlign: "center" }}>Latest Announcements</h2>
      {announcements.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: 30 }}>
          No announcements yet.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {announcements.map((a) => (
            <li
              key={a.id}
              style={{
                background: "#f8f8f8",
                padding: "15px 20px",
                borderRadius: 8,
                marginBottom: 10,
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}
            >
              <p style={{ margin: 0 }}>{a.message}</p>
              <small style={{ color: "#555" }}>
                {new Date(a.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
