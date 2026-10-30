import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

function Layout() {
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
        </nav>
      </header>
      <Outlet />
    </main>
  );
}

export const Route = createRootRoute({
  component: Layout,
  notFoundComponent: () => <h1>Página no encontrada</h1>,
});
