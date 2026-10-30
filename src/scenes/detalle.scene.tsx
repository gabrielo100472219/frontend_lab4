import { Link } from "@tanstack/react-router";
import { DetalleContainer } from "../pods/catalogo";

export function DetalleScene({ id }: { id: string }) {
  return (
    <>
      <Link to="/coffees">← Volver al catálogo</Link>
      <DetalleContainer key={id} id={id} />
    </>
  );
}
