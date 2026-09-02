import { describe, test, expect } from "vitest";
import { Subasta } from "../Subasta.js";
import { Dinero } from "../../valueObjects/Dinero.js";
import { PeriodoSubasta } from "../../valueObjects/PeriodoSubasta.js";

function crearSubastaDePrueba() {
  const ahora = new Date("2026-09-01T12:00:00");
  const cierre = new Date("2026-09-02T12:00:00"); // 1 día después, cumple RN-03

  const periodo = PeriodoSubasta.crear(ahora, cierre);
  const precioBase = Dinero.crear(10000);
  const incrementoMinimo = Dinero.crear(1000);

  return Subasta.publicar("subasta-1", "vendedor-1", precioBase, incrementoMinimo, periodo);
}

describe("Subasta - aceptación y rechazo de pujas", () => {
  test("acepta la primera puja si es igual al precio base (RN-08)", () => {
    const subasta = crearSubastaDePrueba();

    const resultado = subasta.recibirPuja(
      "puja-1",
      "usuario-2",
      Dinero.crear(10000),
      new Date("2026-09-01T13:00:00")
    );

    expect(resultado.exitosa).toBe(true);
  });

  test("rechaza la primera puja si es menor al precio base (RN-08)", () => {
    const subasta = crearSubastaDePrueba();

    const resultado = subasta.recibirPuja(
      "puja-1",
      "usuario-2",
      Dinero.crear(5000),
      new Date("2026-09-01T13:00:00")
    );

    expect(resultado.exitosa).toBe(false);
  });

  test("rechaza una puja que no supera el incremento mínimo (RN-09)", () => {
    const subasta = crearSubastaDePrueba();

    subasta.recibirPuja("puja-1", "usuario-2", Dinero.crear(10000), new Date("2026-09-01T13:00:00"));

    const resultado = subasta.recibirPuja(
      "puja-2",
      "usuario-3",
      Dinero.crear(10500),
      new Date("2026-09-01T14:00:00")
    );

    expect(resultado.exitosa).toBe(false);
  });

  test("acepta una puja que supera el incremento mínimo (RN-09)", () => {
    const subasta = crearSubastaDePrueba();

    subasta.recibirPuja("puja-1", "usuario-2", Dinero.crear(10000), new Date("2026-09-01T13:00:00"));

    const resultado = subasta.recibirPuja(
      "puja-2",
      "usuario-3",
      Dinero.crear(11000),
      new Date("2026-09-01T14:00:00")
    );

    expect(resultado.exitosa).toBe(true);
  });

  test("rechaza que el vendedor puje por su propio artículo (RN-07)", () => {
    const subasta = crearSubastaDePrueba();

    const resultado = subasta.recibirPuja(
      "puja-1",
      "vendedor-1",
      Dinero.crear(10000),
      new Date("2026-09-01T13:00:00")
    );

    expect(resultado.exitosa).toBe(false);
  });

  test("rechaza que un usuario supere su propia puja vigente (RN-10)", () => {
    const subasta = crearSubastaDePrueba();

    subasta.recibirPuja("puja-1", "usuario-2", Dinero.crear(10000), new Date("2026-09-01T13:00:00"));

    const resultado = subasta.recibirPuja(
      "puja-2",
      "usuario-2",
      Dinero.crear(12000),
      new Date("2026-09-01T14:00:00")
    );

    expect(resultado.exitosa).toBe(false);
  });

  test("rechaza pujas sobre una subasta cerrada (RN-06)", () => {
    const subasta = crearSubastaDePrueba();

    subasta.cerrarSiCorresponde(new Date("2026-09-03T00:00:00")); // después de la fecha de cierre

    const resultado = subasta.recibirPuja(
      "puja-1",
      "usuario-2",
      Dinero.crear(10000),
      new Date("2026-09-03T00:01:00")
    );

    expect(resultado.exitosa).toBe(false);
  });
});