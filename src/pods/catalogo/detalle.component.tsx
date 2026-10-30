import { Link } from "@tanstack/react-router";
import { roastLabels, type Coffee } from "../../core/coffees/model";
import { formatPrice } from "../../common/format";

export function DetalleComponent({ coffee }: { coffee: Coffee }) {
  return (
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
          <dd className="font-medium">{formatPrice(coffee.price)}</dd>
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
      <Link
        className="inline-flex rounded-xl bg-amber-100 px-4 py-2 no-underline"
        to="/coffees/$coffeeId/edit"
        params={{ coffeeId: String(coffee.id) }}
      >
        Editar café
      </Link>
    </article>
  );
}
