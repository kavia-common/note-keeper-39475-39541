import React, { useEffect } from "react";
import "./App.css";
import { applyThemeToDocument } from "./styles/theme";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { useNotes } from "./hooks/useNotes";

// PUBLIC_INTERFACE
export default function App() {
  /** Main application rendering a two-pane notes layout with CRUD flows. */
  const [state, actions] = useNotes();
  const { notes, selectedId, selected, loading, error } = state;

  useEffect(() => {
    applyThemeToDocument();
  }, []);

  return (
    <div className="App" style={styles.app}>
      <div style={styles.gradientBg} />
      <Header onCreate={actions.createNew} />
      <main style={styles.main}>
        <Sidebar
          notes={notes}
          selectedId={selectedId}
          onSelect={actions.select}
          loading={loading}
        />
        <section style={styles.section}>
          {error ? (
            <div style={styles.error}>
              <div style={styles.errorTitle}>Something went wrong</div>
              <div style={styles.errorText}>{error}</div>
            </div>
          ) : null}
          <Editor
            note={selected}
            loading={loading}
            onSave={actions.save}
            onDelete={actions.remove}
          />
        </section>
      </main>
      <footer style={styles.footer}>
        <span>
          API mode:{" "}
          <code>
            {process.env.REACT_APP_API_BASE
              ? `Backend (${process.env.REACT_APP_API_BASE})`
              : "In-memory (no REACT_APP_API_BASE)"}
          </code>
        </span>
      </footer>
    </div>
  );
}

const styles = {
  app: {
    background: "var(--color-background)",
    minHeight: "100vh",
    color: "var(--color-text)",
    position: "relative",
  },
  gradientBg: {
    position: "absolute",
    inset: 0,
    background: "var(--gradient)",
    zIndex: 0,
  },
  main: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "320px 1fr",
    maxWidth: 1400,
    margin: "0 auto",
    boxShadow: "var(--shadow-md)",
    borderRadius: "var(--radius-xl)",
    overflow: "hidden",
    border: "1px solid var(--color-border)",
  },
  section: {
    background: "var(--color-surface)",
    minHeight: "calc(100vh - 56px)",
    position: "relative",
  },
  footer: {
    position: "sticky",
    bottom: 0,
    zIndex: 1,
    padding: "8px 16px",
    color: "var(--color-text-muted)",
    fontSize: 12,
    background: "transparent",
  },
  error: {
    position: "absolute",
    top: 8,
    right: 8,
    background: "#fff",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-md)",
    padding: 10,
    maxWidth: 360,
    zIndex: 2,
  },
  errorTitle: {
    fontWeight: 700,
    marginBottom: 4,
    color: "#EF4444",
  },
  errorText: {
    color: "var(--color-text)",
    fontSize: 12,
  },
};

// Responsive
// Note: base CSS (App.css) remains, but layout is managed here using inline styles for clarity.
