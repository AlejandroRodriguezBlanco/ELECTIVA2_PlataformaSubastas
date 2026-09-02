import { Puja } from "./Puja.js";

export type ResultadoPuja =
  | { exitosa: true; puja: Puja }
  | { exitosa: false; motivo: string };