import { Dinero } from "../valueObjects/Dinero.js";
import { PeriodoSubasta } from "../valueObjects/PeriodoSubasta.js";
import { EstadoSubasta } from "../valueObjects/EstadoSubasta.js";
import { Puja } from "./Puja.js";
import type { ResultadoPuja } from "./ResultadoPuja.js";

export class Subasta {
  private readonly id: string;
  private readonly vendedorId: string;
  private readonly precioBase: Dinero;
  private readonly incrementoMinimo: Dinero;
  private readonly periodo: PeriodoSubasta;
  private estado: EstadoSubasta;
  private readonly pujas: Puja[];

  private constructor(
    id: string,
    vendedorId: string,
    precioBase: Dinero,
    incrementoMinimo: Dinero,
    periodo: PeriodoSubasta
  ) {
    this.id = id;
    this.vendedorId = vendedorId;
    this.precioBase = precioBase;
    this.incrementoMinimo = incrementoMinimo;
    this.periodo = periodo;
    this.estado = EstadoSubasta.ABIERTA;
    this.pujas = [];
  }

  static publicar(
    id: string,
    vendedorId: string,
    precioBase: Dinero,
    incrementoMinimo: Dinero,
    periodo: PeriodoSubasta
  ): Subasta {
    if (precioBase.obtenerValor() <= 0) {
      throw new Error("El precio base debe ser mayor que cero.");
    }
    if (incrementoMinimo.obtenerValor() <= 0) {
      throw new Error("El incremento mínimo debe ser mayor que cero.");
    }
    return new Subasta(id, vendedorId, precioBase, incrementoMinimo, periodo);
  }

  recibirPuja(id: string, usuarioId: string, monto: Dinero, momento: Date): ResultadoPuja {
    if (this.estado !== EstadoSubasta.ABIERTA) {
      return { exitosa: false, motivo: "La subasta no se encuentra abierta." };
    }

    if (usuarioId === this.vendedorId) {
      return { exitosa: false, motivo: "El vendedor no puede pujar por su propio artículo." };
    }

    const pujaVigente = this.obtenerPujaVigente();

    if (pujaVigente === null) {
      if (!monto.MayorIgualQue(this.precioBase)) {
        return { exitosa: false, motivo: "La primera puja debe ser mayor o igual al precio base." };
      }
    } else {
      if (pujaVigente.obtenerUsuarioId() === usuarioId) {
        return { exitosa: false, motivo: "Ya eres el mejor postor, no puedes superar tu propia puja." };
      }

      const minimoRequerido = pujaVigente.obtenerMonto().sumar(this.incrementoMinimo);

      if (!monto.MayorIgualQue(minimoRequerido)) {
        return { exitosa: false, motivo: "La puja debe superar la vigente en al menos el incremento mínimo." };
      }
    }

    const nuevaPuja = new Puja(id, usuarioId, monto, momento);
    this.pujas.push(nuevaPuja);
    return { exitosa: true, puja: nuevaPuja };
  }

  cancelar(): void {
    if (this.pujas.length > 0) {
      throw new Error("No se puede cancelar una subasta que ya recibió pujas.");
    }
    this.estado = EstadoSubasta.CANCELADA;
  }

  cerrarSiCorresponde(momentoActual: Date): void {
    if (this.estado !== EstadoSubasta.ABIERTA) {
      return;
    }
    if (!this.periodo.yaCerro(momentoActual)) {
      return;
    }
    this.estado = this.pujas.length > 0 ? EstadoSubasta.CERRADA : EstadoSubasta.DESIERTA;
  }

  obtenerPujaVigente(): Puja | null {
  if (this.pujas.length === 0) {
    return null;
  }
  return this.pujas[this.pujas.length - 1] ?? null;
}

  obtenerId(): string {
    return this.id;
  }

  obtenerEstado(): EstadoSubasta {
    return this.estado;
  }

  obtenerVendedorId(): string {
    return this.vendedorId;
  }

  obtenerHistorialPujas(): ReadonlyArray<Puja> {
    return this.pujas;
  }
}