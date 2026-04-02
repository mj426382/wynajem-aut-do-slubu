// Auto-discovers all article*.jsx files — no manual imports needed when adding new posts
const modules = import.meta.glob('./article*.jsx', { eager: true })

export const articles = Object.values(modules)
  .map((m) => m)
  // sort newest first by date field
  .sort((a, b) => (a.date < b.date ? 1 : -1))
