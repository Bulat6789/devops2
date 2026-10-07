import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [health, setHealth] = useState("loading");

  async function loadNotes() {
    try {
      const response = await fetch("/api/notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Failed to load notes:", error);
    }
  }

  async function loadHealth() {
    try {
      const response = await fetch("/health");
      const data = await response.json();
      setHealth(data.status);
    } catch (error) {
      setHealth("error");
    }
  }

  async function addNote(event) {
    event.preventDefault();

    await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });

    setTitle("");
    setBody("");

    await loadNotes();
  }

  useEffect(() => {
    loadNotes();
    loadHealth();
  }, []);

  return (
    <div className="container">
      <h1>Notes</h1>

      <p>
        Backend status: <strong>{health}</strong>
      </p>

      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <textarea
          placeholder="Body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />

        <button type="submit">Add note</button>
      </form>

      <h2>Notes list</h2>

      {notes.length === 0 ? (
        <p>No notes yet</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <strong>{note.title}</strong>
              <p>{note.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
