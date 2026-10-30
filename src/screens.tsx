import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { roastLabels, type Coffee } from "./model";
import { useCoffee, useCoffees } from "./hooks";

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
        <h2>
          <Link to="/coffees/$coffeeId" params={{ coffeeId: String(coffee.id) }}>
            {coffee.name}
          </Link>
        </h2>
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

export function CoffeeList() {
  const { coffees, loading, error } = useCoffees();
  const [cart, setCart] = useState<Coffee[]>([]);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const addToCart = (coffee: Coffee) => {
    setCart((previous) => [...previous, coffee]);
  };

  const total = cart.reduce((sum, coffee) => sum + coffee.price, 0);
  const visible = coffees.filter((coffee) =>
    coffee.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1>Tueste · Catálogo</h1>
        <button onClick={() => searchRef.current?.focus()}>Buscar</button>
      </header>
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
          ref={searchRef}
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
    </>
  );
}

export function CoffeeDetail({ id }: { id: string }) {
  const { coffee, loading, error } = useCoffee(id);

  return (
    <>
      <Link to="/coffees">← Volver al catálogo</Link>
      {loading ? (
        <p role="status">Cargando…</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : !coffee ? (
        <p>Café no encontrado</p>
      ) : (
        <article className="space-y-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <header>
            <h1>{coffee.name}</h1>
            <p className="text-stone-500">{coffee.origin}</p>
          </header>
          <dl className="grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-sm text-stone-500">Tueste</dt>
              <dd className="font-medium">{roastLabels[coffee.roast]}</dd>
            </div>
            <div>
              <dt className="text-sm text-stone-500">Precio</dt>
              <dd className="font-medium">{coffee.price.toFixed(2)} €</dd>
            </div>
            <div>
              <dt className="text-sm text-stone-500">Identificador</dt>
              <dd className="font-medium">#{coffee.id}</dd>
            </div>
          </dl>
          <div>
            <h2 className="text-base">Notas de cata</h2>
            <p className="text-stone-700">{coffee.notes || "Sin notas."}</p>
          </div>
        </article>
      )}
    </>
  );
}
