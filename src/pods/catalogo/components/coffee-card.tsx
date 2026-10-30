import { Link } from "@tanstack/react-router";
import type { Coffee } from "../../../core/coffees/model";
import { formatPrice } from "../../../common/format";

interface Props {
  coffee: Coffee;
  onAdd: (coffee: Coffee) => void;
}

export function CoffeeCard({ coffee, onAdd }: Props) {
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
        {formatPrice(coffee.price)}
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
