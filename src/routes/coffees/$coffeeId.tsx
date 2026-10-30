import { createFileRoute } from "@tanstack/react-router";
import { CoffeeDetail } from "../../screens";

export const Route = createFileRoute("/coffees/$coffeeId")({
  component: DetailPage,
});

function DetailPage() {
  const { coffeeId } = Route.useParams();
  return <CoffeeDetail key={coffeeId} id={coffeeId} />;
}
