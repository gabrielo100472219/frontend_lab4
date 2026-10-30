import { useEffect, useState } from "react";
import type { Coffee } from "./model";

export function useCoffees() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return { coffees, loading, error };
}
