import React, { useEffect, useState } from "react";

// PUBLIC_INTERFACE
export default function Editor({ note, loading, onSave, onDelete }) {
  /**
   * Note editor pane. Allows editing title/body and saving.
   * Shows loading/empty states and delete with confirmation.
   */
  const [title, setTitle] = useState(note?.title || "");
  const [body, setBody] = useState(note?.body || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(note?.title || "");
    setBody(note?.body || "");
  }, [note?.id]);

  if (loading?.detail && !note) {
    return <div style={styles.empty}>Loading note…</div>;
  }

  if (!note) {
    return (
      <div style={styles.empty}>
        Select a note from the sidebar or create a new one.
      </div>
    );
  }

  async function handleSave() {
    setSaving(true);
    try {
      await onSave({ title, body });
    } finally {
      setSaving(false);
    }
  }

  function handleDelete() {
    if (!note) return;
    const ok = window.confirm("Delete this note? This cannot be undone.");
    if (ok) {
      onDelete(note.id);
    }
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.toolbar}>
        <button style={{ ...styles.btn, ...styles.primary }} onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </button>
        <button style={{ ...styles.btn, ...styles.danger }} onClick={handleDelete}>
          Delete
        </button>
      </div>
      <input
        style={styles.titleInput}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        style={styles.textarea}
        placeholder="Write your note here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
    </div>
  );
}

const styles = {
  wrap: {
    height: "calc(100vh - 56px)",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    background:
      "var(--color-surface)",
  },
  empty: {
    height: "calc(100vh - 56px)",
    display: "grid",
    placeItems: "center",
    color: "var(--color-text-muted)",
    background: "var(--color-surface)",
  },
  toolbar: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  btn: {
    border: "none",
    borderRadius: "var(--radius-md)",
    padding: "8px 12px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "var(--shadow-sm)",
    transition: "transform .12s ease, box-shadow .2s ease, opacity .12s ease",
  },
  primary: {
    background: "linear-gradient(135deg, var(--color-primary), #3B82F6)",
    color: "#fff",
  },
  danger: {
    background: "linear-gradient(135deg, #EF4444, #DC2626)",
    color: "#fff",
    marginLeft: "auto",
  },
  titleInput: {
    fontSize: 20,
    fontWeight: 600,
    padding: "12px 14px",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-border)",
    outline: "none",
    background: "var(--color-background)",
    color: "var(--color-text)",
    boxShadow: "var(--shadow-sm)",
  },
  textarea: {
    flex: 1,
    resize: "none",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-border)",
    outline: "none",
    padding: 14,
    lineHeight: 1.6,
    fontSize: 14,
    background:
      "linear-gradient(180deg, #ffffff, rgba(243,244,246,0.5))",
    color: "var(--color-text)",
    boxShadow: "var(--shadow-sm)",
  },
};
