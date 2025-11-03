import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createBlankNote } from "../types";

/**
 * PUBLIC_INTERFACE
 * useLocalNotes manages a list of notes persisted to localStorage,
 * supports CRUD, search, sort, and selection.
 * @returns {{
 *  notes: Array,
 *  filteredNotes: Array,
 *  selectedId: string|null,
 *  search: string,
 *  setSearch: (s:string)=>void,
 *  sort: 'updatedAt'|'createdAt'|'title',
 *  setSort: (s)=>void,
 *  createNote: ()=>void,
 *  selectNote: (id:string)=>void,
 *  updateNote: (id:string, fields: Partial<{title:string, body:string}> )=>void,
 *  deleteNote: (id:string)=>void,
 *  selectedNote: any,
 *  saving: boolean
 * }}
 */
export default function useLocalNotes() {
  const STORAGE_KEY = "elegant-notes.v1";
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("updatedAt");
  const [saving, setSaving] = useState(false);
  const saveTimerRef = useRef(null);

  // Load from localStorage once with sample data if empty
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setNotes(Array.isArray(parsed) ? parsed : []);
        if (Array.isArray(parsed) && parsed.length) {
          setSelectedId(parsed[0].id);
        }
      } else {
        // seed with sample notes
        const now = Date.now();
        const sample = [
          {
            id: "welcome-" + now,
            title: "Welcome to Elegant Notes",
            body:
              "This is a simple, elegant notes app.\n\n- Create notes with the + button\n- Search and sort notes\n- Autosave with Ctrl/Cmd+S\n- Your notes are saved locally\n\nEnjoy! ✨",
            createdAt: now - 60000,
            updatedAt: now - 60000,
          },
          {
            id: "tips-" + now,
            title: "Tips",
            body:
              "• Use the search box to find notes by title/body\n• Click a note to select it\n• Delete a note from the context menu (trash icon)\n• Keyboard: Ctrl/Cmd+S to save",
            createdAt: now - 30000,
            updatedAt: now - 30000,
          },
        ];
        setNotes(sample);
        setSelectedId(sample[0].id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sample));
      }
    } catch (e) {
      // noop fallback to empty
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist notes with debounce to minimize writes.
  useEffect(() => {
    if (!notes) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    setSaving(true);
    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (e) {
        // ignore quota errors
      } finally {
        setSaving(false);
      }
    }, 400);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [notes]);

  const createNote = useCallback(() => {
    setNotes((prev) => {
      const n = createBlankNote();
      const next = [n, ...prev];
      setSelectedId(n.id);
      return next;
    });
  }, []);

  const selectNote = useCallback((id) => setSelectedId(id), []);

  const updateNote = useCallback((id, fields) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, ...fields, updatedAt: Date.now() }
          : n
      )
    );
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== id);
      if (next.length === 0) {
        setSelectedId(null);
      } else if (id === selectedId) {
        setSelectedId(next[0].id);
      }
      return next;
    });
  }, [selectedId]);

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const filteredNotes = useMemo(() => {
    let list = notes;
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.body.toLowerCase().includes(q)
      );
    }
    const sorter = {
      updatedAt: (a, b) => b.updatedAt - a.updatedAt,
      createdAt: (a, b) => b.createdAt - a.createdAt,
      title: (a, b) => a.title.localeCompare(b.title),
    }[sort] || ((a, b) => b.updatedAt - a.updatedAt);
    return [...list].sort(sorter);
  }, [notes, search, sort]);

  return {
    notes,
    filteredNotes,
    selectedId,
    search,
    setSearch,
    sort,
    setSort,
    createNote,
    selectNote,
    updateNote,
    deleteNote,
    selectedNote,
    saving,
  };
}
