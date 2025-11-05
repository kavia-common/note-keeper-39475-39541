import React from "react";

// PUBLIC_INTERFACE
export default function NoteItem({ note, selected, onClick }) {
  /** Renders a single note item row in the sidebar list. */
  const updated = new Date(note.updatedAt);
  const preview =
    note.body?.length ? note.body.slice(0, 80).replace(/\n/g, " ") : "No content yet";
  return (
    <button
      role="listitem"
      onClick={onClick}
      style={{
        ...styles.item,
        ...(selected ? styles.itemSelected : {}),
      }}
      aria-current={selected ? "true" : "false"}
    >
      <div style={styles.titleRow}>
        <div style={styles.title}>{note.title || "Untitled"}</div>
        <div style={styles.time}>{updated.toLocaleDateString()}</div>
      </div>
      <div style={styles.preview}>{preview}</div>
    </button>
  );
}

const styles = {
  item: {
    width: "100%",
    textAlign: "left",
    display: "block",
    background: "transparent",
    border: "1px solid transparent",
    borderRadius: "var(--radius-md)",
    padding: 12,
    cursor: "pointer",
    color: "var(--color-text)",
    transition: "background .15s ease, border-color .15s ease, box-shadow .15s",
    marginBottom: 8,
  },
  itemSelected: {
    background: "var(--color-background)",
    borderColor: "var(--color-border)",
    boxShadow: "var(--shadow-sm)",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    fontWeight: 600,
    fontSize: 14,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  time: {
    color: "var(--color-text-muted)",
    fontSize: 12,
  },
  preview: {
    color: "var(--color-text-muted)",
    fontSize: 12,
    marginTop: 6,
  },
};
