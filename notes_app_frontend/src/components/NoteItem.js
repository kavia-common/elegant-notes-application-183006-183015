import React from "react";

/**
 * PUBLIC_INTERFACE
 * NoteItem renders a note preview in the sidebar list.
 */
export default function NoteItem({ note, active, onClick, onDelete }) {
  const updated = new Date(note.updatedAt);
  const sub =
    note.body.trim().split("\n")[0].slice(0, 80) ||
    "No content";

  return (
    <button
      className={`note-item ${active ? "active" : ""}`}
      onClick={onClick}
      aria-current={active ? "true" : "false"}
      aria-label={`Open note ${note.title}`}
    >
      <div className="note-item-header">
        <div className="note-item-title" title={note.title}>
          {note.title || "Untitled"}
        </div>
        <button
          className="icon-btn danger"
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("Delete this note? This action cannot be undone.")) {
              onDelete();
            }
          }}
          aria-label={`Delete note ${note.title}`}
          title="Delete"
        >
          🗑
        </button>
      </div>
      <div className="note-item-sub">{sub}</div>
      <div className="note-item-meta" aria-label="Last edited">
        Last edited {updated.toLocaleString()}
      </div>
    </button>
  );
}
