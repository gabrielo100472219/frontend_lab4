import { useRef } from "react";
import type { Coffee } from "../../core/coffees/model";
import { formatPrice } from "../../common/format";
import { CoffeeCard } from "./components/coffee-card";

interface Props {
  coffees: Coffee[];
  totalCoffees: number;
  search: string;
  onSearchChange: (value: string) => void;
  cartCount: number;
  cartTotal: number;
  onAdd: (coffee: Coffee) => void;
  onClearCart: () => void;
}

export function CatalogoComponent({
  coffees,
  totalCoffees,
  search,
  onSearchChange,
  cartCount,
  cartTotal,
  onAdd,
  onClearCart,
}: Props) {
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <section className="space-y-6" aria-label="Cafés del catálogo">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-stone-600">{totalCoffees} cafés este mes</p>
        <button onClick={() => searchRef.current?.focus()}>Buscar</button>
      </div>

      <section
        aria-label="Carrito"
        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4"
      >
        <p aria-live="polite" className="font-semibold">
          {cartCount} bolsas · {formatPrice(cartTotal)}
        </p>
        <button onClick={onClearCart} disabled={cartCount === 0}>
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
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      {coffees.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
          Sin resultados
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {coffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} onAdd={onAdd} />
          ))}
        </ul>
      )}
    </section>
  );
}
