//
// PUBLIC_INTERFACE
// Note type and utility helpers for the app (JS since project is not TS).
/**
 * @typedef {Object} Note
 * @property {string} id - Unique ID.
 * @property {string} title - Note title.
 * @property {string} body - Note body (markdown/plain).
 * @property {number} createdAt - Timestamp (ms).
 * @property {number} updatedAt - Timestamp (ms).
 */

/**
 * PUBLIC_INTERFACE
 * Create a new blank note.
 * @returns {Note}
 */
export function createBlankNote() {
  const now = Date.now();
  return {
    id: cryptoRandomId(),
    title: "Untitled",
    body: "",
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * PUBLIC_INTERFACE
 * Generate a random id using crypto if available, else fallback.
 * @returns {string}
 */
export function cryptoRandomId() {
  if (window.crypto && window.crypto.getRandomValues) {
    const buf = new Uint32Array(4);
    window.crypto.getRandomValues(buf);
    return Array.from(buf).map((n) => n.toString(16)).join("-");
  }
  return Math.random().toString(36).slice(2) + "-" + Date.now().toString(36);
}
