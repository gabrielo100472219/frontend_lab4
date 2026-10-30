import { createFileRoute } from "@tanstack/react-router";
import { CoffeeList } from "../../screens";

export const Route = createFileRoute("/coffees/")({
  component: CoffeeList,
});
