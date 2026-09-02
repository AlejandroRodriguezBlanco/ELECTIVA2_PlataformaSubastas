export class Dinero {
  private readonly valor: number;

  private constructor(valor: number) {
    this.valor = valor;
  }

  static crear(valor: number): Dinero {
    if (!Number.isInteger(valor)) {
      throw new Error("El valor monetario no puede tener decimales.");
    }
    if (valor < 0) {
      throw new Error("El valor monetario no puede ser negativo.");
    }
    return new Dinero(valor);
  }

  obtenerValor(): number {
    return this.valor;
  }

  MayorQue(otro: Dinero): boolean {
    return this.valor > otro.valor;
  }

  MayorIgualQue(otro: Dinero): boolean {
    return this.valor >= otro.valor;
  }

  sumar(otro: Dinero): Dinero {
    return Dinero.crear(this.valor + otro.valor);
  }

  restar(otro: Dinero): Dinero {
    return Dinero.crear(this.valor - otro.valor);
  }

  IgualA(otro: Dinero): boolean {
    return this.valor === otro.valor;
  }
}