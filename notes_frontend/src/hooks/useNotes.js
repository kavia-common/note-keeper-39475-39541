import { useCallback, useEffect, useMemo, useState } from "react";
import { createNote, deleteNote, getNote, listNotes, updateNote } from "../services/api";

// PUBLIC_INTERFACE
export function useNotes() {
  /**
   * Hook managing notes state and CRUD operations.
   * Provides loading/error states, selection, and optimistic updates.
   */
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState({ list: false, detail: false, mutate: false });
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading((l) => ({ ...l, list: true }));
    setError(null);
    try {
      const data = await listNotes();
      setNotes(data);
      if (data.length && !selectedId) {
        setSelectedId(data[0].id);
      }
    } catch (e) {
      setError(e.message || "Failed to load notes");
    } finally {
      setLoading((l) => ({ ...l, list: false }));
    }
  }, [selectedId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    async function loadDetail() {
      if (!selectedId) {
        setSelected(null);
        return;
      }
      setLoading((l) => ({ ...l, detail: true }));
      setError(null);
      try {
        const data = await getNote(selectedId);
        setSelected(data);
      } catch (e) {
        setError(e.message || "Failed to load note");
      } finally {
        setLoading((l) => ({ ...l, detail: false }));
      }
    }
    loadDetail();
  }, [selectedId]);

  const createNew = useCallback(async () => {
    setLoading((l) => ({ ...l, mutate: true }));
    setError(null);
    try {
      const created = await createNote({ title: "Untitled", body: "" });
      setNotes((prev) => [created, ...prev]);
      setSelectedId(created.id);
      setSelected(created);
      return created;
    } catch (e) {
      setError(e.message || "Failed to create note");
      throw e;
    } finally {
      setLoading((l) => ({ ...l, mutate: false }));
    }
  }, []);

  const save = useCallback(
    async (partial) => {
      if (!selectedId) return;
      setLoading((l) => ({ ...l, mutate: true }));
      setError(null);
      try {
        const updated = await updateNote(selectedId, partial);
        setNotes((prev) =>
          prev.map((n) => (n.id === selectedId ? { ...n, ...updated } : n))
        );
        setSelected(updated);
        return updated;
      } catch (e) {
        setError(e.message || "Failed to save note");
        throw e;
      } finally {
        setLoading((l) => ({ ...l, mutate: false }));
      }
    },
    [selectedId]
  );

  const remove = useCallback(
    async (id) => {
      setLoading((l) => ({ ...l, mutate: true }));
      setError(null);
      try {
        await deleteNote(id);
        setNotes((prev) => prev.filter((n) => n.id !== id));
        if (selectedId === id) {
          const first = (prev) => (prev.length ? prev[0].id : null);
          setSelectedId((_) => first([])); // temporary clear
          setSelected(null);
          // After deletion, pick next available
          setSelectedId((_) => null);
        }
        // pick next available explicitly
        setSelectedId((_) => null);
        // If there are remaining notes, select the first
        setNotes((prevAfter) => {
          if (prevAfter.length) {
            setSelectedId(prevAfter[0].id);
            setSelected(prevAfter[0]);
          } else {
            setSelectedId(null);
            setSelected(null);
          }
          return prevAfter;
        });
      } catch (e) {
        setError(e.message || "Failed to delete note");
        throw e;
      } finally {
        setLoading((l) => ({ ...l, mutate: false }));
      }
    },
    [selectedId]
  );

  const select = useCallback((id) => setSelectedId(id), []);

  const state = useMemo(
    () => ({
      notes,
      selectedId,
      selected,
      loading,
      error,
    }),
    [notes, selectedId, selected, loading, error]
  );

  const actions = useMemo(
    () => ({
      refresh,
      createNew,
      save,
      remove,
      select,
    }),
    [refresh, createNew, save, remove, select]
  );

  return [state, actions];
}
