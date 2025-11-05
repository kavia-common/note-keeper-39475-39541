import React from "react";
import NoteItem from "./NoteItem";

// PUBLIC_INTERFACE
export default function Sidebar({ notes, selectedId, onSelect, loading }) {
  /** Sidebar containing list of notes with highlighting for selected. */
  return (
    <aside style={styles.sidebar} aria-label="Notes list">
      <div style={styles.searchWrap}>
        <input
          style={styles.search}
          type="text"
          placeholder="Search (local only demo)"
          disabled
        />
      </div>
      <div style={styles.list} role="list">
        {loading?.list ? (
          <div style={styles.empty}>Loading notes…</div>
        ) : notes.length === 0 ? (
          <div style={styles.empty}>No notes yet. Create your first note!</div>
        ) : (
          notes.map((n) => (
            <NoteItem
              key={n.id}
              note={n}
              selected={n.id === selectedId}
              onClick={() => onSelect(n.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: 320,
    minWidth: 280,
    borderRight: "1px solid var(--color-border)",
    background: "var(--color-surface)",
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 56px)",
  },
  searchWrap: {
    padding: 12,
    borderBottom: "1px solid var(--color-border)",
  },
  search: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--color-border)",
    outline: "none",
    background: "var(--color-background)",
    color: "var(--color-text)",
  },
  list: {
    overflowY: "auto",
    padding: 8,
    flex: 1,
  },
  empty: {
    color: "var(--color-text-muted)",
    padding: 16,
    textAlign: "center",
  },
};
