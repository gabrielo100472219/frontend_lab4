import { useState } from "react";
import { OfferCountdown } from "../common/components/offer-countdown";
import { CatalogoContainer } from "../pods/catalogo";

export function CatalogoScene() {
  const [showOffer, setShowOffer] = useState(true);

  return (
    <>
      <header className="space-y-1">
        <h1>Catálogo de cafés</h1>
        <p className="text-stone-600">
          Cafés de especialidad tostados esta semana.
        </p>
      </header>
      <aside
        aria-label="Oferta"
        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-900"
      >
        {showOffer ? <OfferCountdown /> : <p>Oferta oculta.</p>}
        <button onClick={() => setShowOffer((previous) => !previous)}>
          {showOffer ? "Ocultar oferta" : "Mostrar oferta"}
        </button>
      </aside>
      <CatalogoContainer />
    </>
  );
}
