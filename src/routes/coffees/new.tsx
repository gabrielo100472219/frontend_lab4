import { createFileRoute } from "@tanstack/react-router";
import { NewCoffee } from "../../screens";

export const Route = createFileRoute("/coffees/new")({
  component: NewCoffee,
});
