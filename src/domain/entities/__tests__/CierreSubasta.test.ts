import { describe, test, expect } from "vitest";
import { Subasta } from "../Subasta.js";
import { Dinero } from "../../valueObjects/Dinero.js";
import { PeriodoSubasta } from "../../valueObjects/PeriodoSubasta.js";
import { EstadoSubasta } from "../../valueObjects/EstadoSubasta.js";

function crearSubastaDePrueba() {
  const ahora = new Date("2026-09-01T12:00:00");
  const cierre = new Date("2026-09-02T12:00:00");

  const periodo = PeriodoSubasta.crear(ahora, cierre);
  const precioBase = Dinero.crear(10000);
  const incrementoMinimo = Dinero.crear(1000);

  return Subasta.publicar("subasta-1", "vendedor-1", precioBase, incrementoMinimo, periodo);
}

describe("Subasta - cierre", () => {
  test("no cierra antes de la fecha de cierre (RN-13, RN-14)", () => {
    const subasta = crearSubastaDePrueba();

    subasta.cerrarSiCorresponde(new Date("2026-09-01T18:00:00")); // antes de cerrar

    expect(subasta.obtenerEstado()).toBe(EstadoSubasta.ABIERTA);
  });

  test("se declara DESIERTA si cierra sin haber recibido pujas (RN-14)", () => {
    const subasta = crearSubastaDePrueba();

    subasta.cerrarSiCorresponde(new Date("2026-09-03T00:00:00")); // después de cerrar

    expect(subasta.obtenerEstado()).toBe(EstadoSubasta.DESIERTA);
  });

  test("se declara CERRADA y adjudicada si recibió al menos una puja (RN-13)", () => {
    const subasta = crearSubastaDePrueba();

    subasta.recibirPuja("puja-1", "usuario-2", Dinero.crear(10000), new Date("2026-09-01T13:00:00"));
    subasta.cerrarSiCorresponde(new Date("2026-09-03T00:00:00"));

    expect(subasta.obtenerEstado()).toBe(EstadoSubasta.CERRADA);
  });

  test("un segundo cierre no cambia el resultado ya registrado (RN-16)", () => {
    const subasta = crearSubastaDePrueba();

    subasta.recibirPuja("puja-1", "usuario-2", Dinero.crear(10000), new Date("2026-09-01T13:00:00"));
    subasta.cerrarSiCorresponde(new Date("2026-09-03T00:00:00"));

    const estadoDespuesDelPrimerCierre = subasta.obtenerEstado();

    subasta.cerrarSiCorresponde(new Date("2026-09-04T00:00:00")); // se intenta cerrar otra vez

    expect(subasta.obtenerEstado()).toBe(estadoDespuesDelPrimerCierre);
  });

  test("una subasta cancelada sin pujas puede cancelarse (RN-04)", () => {
    const subasta = crearSubastaDePrueba();

    subasta.cancelar();

    expect(subasta.obtenerEstado()).toBe(EstadoSubasta.CANCELADA);
  });

  test("no se puede cancelar una subasta que ya recibió pujas (RN-04)", () => {
    const subasta = crearSubastaDePrueba();

    subasta.recibirPuja("puja-1", "usuario-2", Dinero.crear(10000), new Date("2026-09-01T13:00:00"));

    expect(() => subasta.cancelar()).toThrow();
  });
});