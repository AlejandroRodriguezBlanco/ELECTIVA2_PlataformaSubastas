import { Dinero } from "../valueObjects/Dinero.js";

export class Puja {
  private readonly id: string;
  private readonly usuarioId: string;
  private readonly monto: Dinero;
  private readonly momento: Date;

  constructor(id: string, usuarioId: string, monto: Dinero, momento: Date) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.monto = monto;
    this.momento = momento;
  }

  obtenerId(): string {
    return this.id;
  }

  obtenerUsuarioId(): string {
    return this.usuarioId;
  }

  obtenerMonto(): Dinero {
    return this.monto;
  }

  obtenerMomento(): Date {
    return this.momento;
  }
}