import { Link, Outlet } from "@tanstack/react-router";

export function AppLayout() {
  return (
    <main>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <p className="text-sm font-bold uppercase tracking-widest text-amber-800">
          ☕ Tueste
        </p>
        <nav aria-label="Principal" className="flex gap-2">
          <Link to="/coffees" activeOptions={{ exact: true }}>
            Catálogo
          </Link>
          <Link to="/coffees/new">Añadir café</Link>
        </nav>
      </header>
      <Outlet />
      <footer className="border-t border-stone-200 pt-6 text-xs text-stone-500">
        Datos de ejemplo. Los cambios se guardan solo en este navegador.
      </footer>
    </main>
  );
}
