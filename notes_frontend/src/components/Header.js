import React from "react";
import { theme } from "../styles/theme";

// PUBLIC_INTERFACE
export default function Header({ onCreate }) {
  /** Top app header with title and new note button. */
  return (
    <header style={styles.header}>
      <div style={styles.titleRow}>
        <div style={styles.brand}>
          <span style={styles.brandDot} />
          <h1 style={styles.h1}>Note Keeper</h1>
        </div>
        <div style={styles.actions}>
          <button style={styles.createBtn} onClick={onCreate}>
            + New Note
          </button>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: "var(--color-surface)",
    borderBottom: `1px solid var(--color-border)`,
    padding: "12px 16px",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 1400,
    margin: "0 auto",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  brandDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    background:
      `radial-gradient( circle at 30% 30%, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100% )`,
    boxShadow: "0 0 0 3px rgba(37,99,235,0.15)",
  },
  h1: {
    margin: 0,
    fontSize: 18,
    color: "var(--color-text)",
    letterSpacing: 0.2,
  },
  actions: {},
  createBtn: {
    background: `linear-gradient(135deg, ${theme.colors.primary}, #3B82F6)`,
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-md)",
    padding: "8px 12px",
    fontWeight: 600,
    boxShadow: "var(--shadow-md)",
    cursor: "pointer",
    transition: "transform .12s ease, box-shadow .2s ease",
  },
};
