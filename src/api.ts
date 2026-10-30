import { coffeeSchema } from "./coffee.schema";
import type { Coffee, CoffeeInput } from "./model";

const storageKey = "tueste-lab4-coffees";

function readChanges(): Coffee[] {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return [];
  return JSON.parse(raw) as Coffee[];
}

export async function getCoffees(signal: AbortSignal): Promise<Coffee[]> {
  const response = await fetch("/coffees.json", { signal });
  if (!response.ok) throw new Error("No se ha podido cargar el catálogo.");
  const initial: Coffee[] = await response.json();
  const byId = new Map(initial.map((coffee) => [coffee.id, coffee]));
  for (const coffee of readChanges()) byId.set(coffee.id, coffee);
  return [...byId.values()];
}

export async function getCoffee(
  id: string,
  signal: AbortSignal,
): Promise<Coffee | null> {
  if (!/^[1-9]\d*$/.test(id)) return null;
  const coffees = await getCoffees(signal);
  return coffees.find((coffee) => coffee.id === Number(id)) ?? null;
}

// Simulamos la espera de un servidor para que se vea el botón desactivado.
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function saveCoffee(
  input: CoffeeInput,
  id?: number,
): Promise<Coffee> {
  const values = coffeeSchema.parse(input);
  const all = await getCoffees(new AbortController().signal);
  if (id !== undefined && !all.some((coffee) => coffee.id === id)) {
    throw new Error("Café no encontrado.");
  }
  const coffee = {
    ...values,
    id: id ?? Math.max(0, ...all.map((item) => item.id)) + 1,
  };
  const changes = readChanges().filter((item) => item.id !== coffee.id);
  await wait(600);
  // Si setItem falla, la promesa rechaza y el formulario conserva los datos.
  localStorage.setItem(storageKey, JSON.stringify([...changes, coffee]));
  return coffee;
}
