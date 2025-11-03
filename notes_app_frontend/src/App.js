import React from "react";
import "./App.css";
import "./index.css";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import TopBar from "./components/TopBar";
import useLocalNotes from "./hooks/useLocalNotes";

/**
 * PUBLIC_INTERFACE
 * App renders the two-panel notes layout and wires events/state.
 */
function App() {
  const {
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
  } = useLocalNotes();

  // Pass explicit save flag in onChange immediate saves (currently same behavior)
  const handleNoteChange = React.useCallback(
    (fields /*, explicit */) => {
      if (!selectedId) return;
      updateNote(selectedId, fields);
    },
    [selectedId, updateNote]
  );

  return (
    <div className="app-root" data-theme="light">
      <TopBar />
      <div className="layout">
        <Sidebar
          notes={notes}
          filteredNotes={filteredNotes}
          onCreate={createNote}
          onSelect={selectNote}
          onDelete={deleteNote}
          selectedId={selectedId}
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
        />
        <Editor note={selectedNote} onChange={handleNoteChange} saving={saving} />
      </div>
    </div>
  );
}

export default App;
