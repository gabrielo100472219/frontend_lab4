import type { Coffee } from "./model";

export async function getCoffees(signal: AbortSignal): Promise<Coffee[]> {
  const response = await fetch("/coffees.json", { signal });
  if (!response.ok) throw new Error("No se ha podido cargar el catálogo.");
  return response.json();
}

export async function getCoffee(
  id: string,
  signal: AbortSignal,
): Promise<Coffee | null> {
  if (!/^[1-9]\d*$/.test(id)) return null;
  const coffees = await getCoffees(signal);
  return coffees.find((coffee) => coffee.id === Number(id)) ?? null;
}
