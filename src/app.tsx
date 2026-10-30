import { useEffect, useState } from "react";
import type { Coffee } from "./model";

function CoffeeCard({
  coffee,
  onAdd,
}: {
  coffee: Coffee;
  onAdd: (coffee: Coffee) => void;
}) {
  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div>
        <h2>{coffee.name}</h2>
        <p className="text-sm text-stone-500">{coffee.origin}</p>
      </div>
      <p className="text-lg font-semibold text-amber-900">
        {coffee.price.toFixed(2)} €
      </p>
      <button
        className="self-start"
        aria-label={`Añadir ${coffee.name} al carrito`}
        onClick={() => onAdd(coffee)}
      >
        Añadir al carrito
      </button>
    </li>
  );
}

export function App() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState<Coffee[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch("/coffees.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("No se ha podido cargar el catálogo.");
        return response.json() as Promise<Coffee[]>;
      })
      .then((data) => {
        if (!controller.signal.aborted) setCoffees(data);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setError("No se ha podido cargar el catálogo.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const addToCart = (coffee: Coffee) => {
    setCart((previous) => [...previous, coffee]);
  };

  const total = cart.reduce((sum, coffee) => sum + coffee.price, 0);
  const visible = coffees.filter((coffee) =>
    coffee.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <main>
      <h1>Tueste · Catálogo</h1>
      {!loading && !error && (
        <p className="text-stone-600">{coffees.length} cafés este mes</p>
      )}

      <section
        aria-label="Carrito"
        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4"
      >
        <p aria-live="polite" className="font-semibold">
          {cart.length} bolsas · {total.toFixed(2)} €
        </p>
        <button onClick={() => setCart([])} disabled={cart.length === 0}>
          Vaciar
        </button>
      </section>

      <div className="grid gap-1">
        <label htmlFor="search">Buscar por nombre</label>
        <input
          id="search"
          placeholder="Por ejemplo, Kenia"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading ? (
        <p role="status">Cargando…</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
          Sin resultados
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {visible.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} onAdd={addToCart} />
          ))}
        </ul>
      )}
    </main>
  );
}
