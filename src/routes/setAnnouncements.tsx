import React, { useState, useEffect } from "react";

interface Announcement {
  id: string;
  message: string;
  createdAt: string;
}

export default function SetAnnouncements() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("/api/announcements");
      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Add new announcement
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      setStatus("Please enter an announcement message.");
      return;
    }

    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setStatus("✅ Announcement added successfully!");
      setMessage("");
      setAnnouncements(data.data);
    } catch (err: any) {
      setStatus("❌ " + err.message);
    }
  };

  // Delete announcement
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;

    try {
      const res = await fetch(`/api/announcements?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok)
        throw new Error(data.error || "Failed to delete announcement");

      setAnnouncements(data.data);
      setStatus("🗑️ Announcement deleted successfully!");
    } catch (err: any) {
      setStatus("❌ " + err.message);
    }
  };

  return (
    <div className='p-3' style={{ maxWidth: 700, margin: "50px auto" }}>
      <h2 className='text-center text-2xl'>Admin — Manage Announcements</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <textarea
          rows={3}
          className='border-1 w-full p-2 border-border-clr rounded-md mt-8'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type a new announcement...'
        />
        <button
          type='submit'
          className='bg-light-green mt-3 px-4 py-2 cursor-pointer rounded-sm text-white'
        >
          Save
        </button>
      </form>

      {status && (
        <p style={{ marginBottom: 20, textAlign: "center" }}>{status}</p>
      )}

      <hr />

      {loading ? (
        <p>Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <p>No announcements yet.</p>
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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p style={{ margin: 0 }}>{a.message}</p>
                <small style={{ color: "#555" }}>
                  {new Date(a.createdAt).toLocaleString()}
                </small>
              </div>
              <button
                onClick={() => handleDelete(a.id)}
                style={{
                  background: "red",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
