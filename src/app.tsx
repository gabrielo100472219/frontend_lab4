import type { Coffee } from "./model";

const coffees: Coffee[] = [
  {
    id: 1,
    name: "Etiopía Yirgacheffe",
    origin: "Etiopía",
    roast: "light",
    price: 14.9,
    notes: "Floral, bergamota y té negro.",
  },
  {
    id: 2,
    name: "Colombia Huila",
    origin: "Colombia",
    roast: "medium",
    price: 12.9,
    notes: "Caramelo y manzana roja.",
  },
  {
    id: 3,
    name: "Kenia AA",
    origin: "Kenia",
    roast: "light",
    price: 15.5,
    notes: "Frutos rojos y pomelo.",
  },
];

function CoffeeCard({ coffee }: { coffee: Coffee }) {
  return (
    <li className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <h2>{coffee.name}</h2>
      <p className="text-sm text-stone-500">{coffee.origin}</p>
      <p className="mt-3 text-lg font-semibold text-amber-900">
        {coffee.price.toFixed(2)} €
      </p>
    </li>
  );
}

export function App() {
  return (
    <main>
      <h1>Tueste · Catálogo</h1>
      <p className="text-stone-600">{coffees.length} cafés este mes</p>
      <ul className="grid gap-4 sm:grid-cols-2">
        {coffees.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </ul>
    </main>
  );
}
