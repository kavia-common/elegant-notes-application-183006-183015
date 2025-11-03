import React from "react";
import { APP_LOGO_PUBLIC } from "../assets/images";

/**
 * PUBLIC_INTERFACE
 * TopBar shows a simple header for small screens.
 * Displays the application logo with responsive sizing.
 */
export default function TopBar() {
  return (
    <div className="topbar" role="banner" aria-label="App header">
      <img
        src={APP_LOGO_PUBLIC}
        alt="Notes App Logo"
        className="app-logo"
        height={32}
      />
      <span className="brand-name">Elegant Notes</span>
    </div>
  );
}
