import { useState } from "react";
import { useCoffees } from "../../core/coffees/hooks";
import { useCart } from "../../core/cart/cart-context";
import { ErrorMessage, Loading } from "../../common/components/request-status";
import { CatalogoComponent } from "./catalogo.component";

export function CatalogoContainer() {
  const { coffees, loading, error } = useCoffees();
  const { cart, addToCart, clearCart } = useCart();
  const [search, setSearch] = useState("");

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  const visible = coffees.filter((coffee) =>
    coffee.name.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const cartTotal = cart.reduce((sum, coffee) => sum + coffee.price, 0);

  return (
    <CatalogoComponent
      coffees={visible}
      totalCoffees={coffees.length}
      search={search}
      onSearchChange={setSearch}
      cartCount={cart.length}
      cartTotal={cartTotal}
      onAdd={addToCart}
      onClearCart={clearCart}
    />
  );
}
