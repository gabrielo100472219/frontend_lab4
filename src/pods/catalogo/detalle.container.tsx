import { useCoffee } from "../../core/coffees/hooks";
import { ErrorMessage, Loading } from "../../common/components/request-status";
import { DetalleComponent } from "./detalle.component";

export function DetalleContainer({ id }: { id: string }) {
  const { coffee, loading, error } = useCoffee(id);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!coffee) return <p>Café no encontrado</p>;
  return <DetalleComponent coffee={coffee} />;
}
