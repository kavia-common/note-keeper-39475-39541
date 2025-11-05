const API_BASE = process.env.REACT_APP_API_BASE || "";

/**
 * Note shape
 * {
 *  id: string,
 *  title: string,
 *  body: string,
 *  updatedAt: string (ISO),
 *  createdAt: string (ISO)
 * }
 */

// In-memory fallback store
let memoryNotes = [
  {
    id: "welcome",
    title: "Welcome to Note Keeper",
    body:
      "This is your first note. You can edit, delete, or create new notes.\n\n" +
      "Tip: Configure REACT_APP_API_BASE in .env to connect to a backend API.\n\n" +
      "Ocean Professional theme applied. Enjoy!",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ideas",
    title: "Ideas",
    body: "- Build a notes API\n- Add tags & search\n- Dark mode enhancements",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function delay(ms = 250) {
  return new Promise((res) => setTimeout(res, ms));
}

const isBackendConfigured = () => API_BASE && API_BASE.trim().length > 0;

// PUBLIC_INTERFACE
export async function listNotes() {
  /** List notes from backend or in-memory. */
  if (isBackendConfigured()) {
    const res = await fetch(`${API_BASE}/notes`);
    if (!res.ok) throw new Error(`Failed to list notes (${res.status})`);
    return res.json();
  }
  await delay();
  return [...memoryNotes].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
}

// PUBLIC_INTERFACE
export async function getNote(id) {
  /** Get a single note by id. */
  if (isBackendConfigured()) {
    const res = await fetch(`${API_BASE}/notes/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error(`Failed to get note (${res.status})`);
    return res.json();
  }
  await delay();
  const note = memoryNotes.find((n) => n.id === id);
  if (!note) throw new Error("Note not found");
  return { ...note };
}

// PUBLIC_INTERFACE
export async function createNote(payload) {
  /** Create a new note. Payload: {title, body}. */
  if (isBackendConfigured()) {
    const res = await fetch(`${API_BASE}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Failed to create note (${res.status})`);
    return res.json();
  }
  await delay();
  const now = new Date().toISOString();
  const newNote = {
    id: cryptoRandomId(),
    title: payload.title || "Untitled",
    body: payload.body || "",
    createdAt: now,
    updatedAt: now,
  };
  memoryNotes = [newNote, ...memoryNotes];
  return { ...newNote };
}

// PUBLIC_INTERFACE
export async function updateNote(id, payload) {
  /** Update an existing note. Payload: {title?, body?}. */
  if (isBackendConfigured()) {
    const res = await fetch(`${API_BASE}/notes/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Failed to update note (${res.status})`);
    return res.json();
  }
  await delay();
  const idx = memoryNotes.findIndex((n) => n.id === id);
  if (idx === -1) throw new Error("Note not found");
  const updated = {
    ...memoryNotes[idx],
    ...payload,
    updatedAt: new Date().toISOString(),
  };
  memoryNotes[idx] = updated;
  return { ...updated };
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /** Delete a note by id. */
  if (isBackendConfigured()) {
    const res = await fetch(`${API_BASE}/notes/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Failed to delete note (${res.status})`);
    return true;
  }
  await delay();
  memoryNotes = memoryNotes.filter((n) => n.id !== id);
  return true;
}

function cryptoRandomId() {
  // Use Web Crypto if available; fallback to Math.random
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "id-" + Math.random().toString(36).slice(2, 10);
}
