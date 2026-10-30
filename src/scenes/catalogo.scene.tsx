import { CatalogoContainer } from "../pods/catalogo";

export function CatalogoScene() {
  return (
    <>
      <header className="space-y-1">
        <h1>Catálogo de cafés</h1>
        <p className="text-stone-600">
          Cafés de especialidad tostados esta semana.
        </p>
      </header>
      <CatalogoContainer />
    </>
  );
}
