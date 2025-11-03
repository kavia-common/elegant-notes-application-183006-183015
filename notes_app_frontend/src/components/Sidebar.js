import React from "react";
import NoteItem from "./NoteItem";
import { APP_LOGO_PUBLIC } from "../assets/images";

/**
 * PUBLIC_INTERFACE
 * Sidebar renders the left panel with search, sort, create, and note list.
 */
export default function Sidebar({
  notes,
  filteredNotes,
  onCreate,
  onSelect,
  onDelete,
  selectedId,
  search,
  setSearch,
  sort,
  setSort,
}) {
  return (
    <aside className="sidebar" aria-label="Notes list">
      <div className="sidebar-top">
        <div className="brand">
          <img
            src={APP_LOGO_PUBLIC}
            alt="Notes App Logo"
            className="app-logo"
            height={32}
          />
          <span className="brand-name">Elegant Notes</span>
        </div>
        <button className="btn primary" onClick={onCreate} aria-label="Create note">
          + New
        </button>
      </div>

      <div className="controls">
        <label className="sr-only" htmlFor="search-notes">Search notes</label>
        <input
          id="search-notes"
          type="search"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search notes"
        />
        <label htmlFor="sort-notes" className="sr-only">Sort by</label>
        <select
          id="sort-notes"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort notes"
        >
          <option value="updatedAt">Last edited</option>
          <option value="createdAt">Created</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div className="notes-list" role="list">
        {filteredNotes.length === 0 ? (
          <div className="empty">No notes found.</div>
        ) : (
          filteredNotes.map((n) => (
            <NoteItem
              key={n.id}
              note={n}
              active={n.id === selectedId}
              onClick={() => onSelect(n.id)}
              onDelete={() => onDelete(n.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
