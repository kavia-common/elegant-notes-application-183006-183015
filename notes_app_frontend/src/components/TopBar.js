import React from "react";

/**
 * PUBLIC_INTERFACE
 * TopBar shows a simple header for small screens.
 */
export default function TopBar() {
  return (
    <div className="topbar" role="banner" aria-label="App header">
      <span className="brand-dot" aria-hidden="true" />
      <span className="brand-name">Elegant Notes</span>
    </div>
  );
}
