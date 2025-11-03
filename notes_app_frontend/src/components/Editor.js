import React, { useEffect, useRef, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Editor renders the right panel with title/body editing and save status.
 * @param {{ note: { id:string, title:string, body:string } | null, onChange: Function, saving: boolean }} props
 */
export default function Editor({ note, onChange, saving }) {
  const [localTitle, setLocalTitle] = useState(note?.title || "");
  const [localBody, setLocalBody] = useState(note?.body || "");
  const titleRef = useRef(null);

  // Sync local state when note changes
  useEffect(() => {
    setLocalTitle(note?.title || "");
    setLocalBody(note?.body || "");
  }, [note?.id]);

  // Debounced save on input changes
  useEffect(() => {
    if (!note) return;
    const t = setTimeout(() => {
      onChange({ title: localTitle, body: localBody });
    }, 300);
    return () => clearTimeout(t);
  }, [localTitle, localBody, note, onChange]);

  // Keyboard shortcut Ctrl/Cmd+S to save immediately
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (note) onChange({ title: localTitle, body: localBody }, true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [note, localTitle, localBody, onChange]);

  if (!note) {
    return (
      <section className="editor empty-editor" aria-label="Editor">
        <div className="empty">
          Select a note to start editing, or create a new one.
        </div>
      </section>
    );
  }

  return (
    <section className="editor" aria-label="Editor">
      <div className="editor-top">
        <input
          ref={titleRef}
          className="title-input"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          placeholder="Note title"
          aria-label="Note title"
        />
        <div
          className={`save-indicator ${saving ? "saving" : "saved"}`}
          aria-live="polite"
        >
          {saving ? "Saving…" : "Saved"}
        </div>
      </div>
      <textarea
        className="body-input"
        value={localBody}
        onChange={(e) => setLocalBody(e.target.value)}
        placeholder="Start writing..."
        aria-label="Note body"
      />
    </section>
  );
}
