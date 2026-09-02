export class Dinero {
    valor;
    constructor(valor) {
        this.valor = valor;
    }
    static crear(valor) {
        if (!Number.isInteger(valor)) {
            throw new Error("El valor monetario no puede tener decimales.");
        }
        if (valor < 0) {
            throw new Error("El valor monetario no puede ser negativo.");
        }
        return new Dinero(valor);
    }
    obtenerValor() {
        return this.valor;
    }
    MayorQue(otro) {
        return this.valor > otro.valor;
    }
    MayorIgualQue(otro) {
        return this.valor >= otro.valor;
    }
    sumar(otro) {
        return Dinero.crear(this.valor + otro.valor);
    }
    restar(otro) {
        return Dinero.crear(this.valor - otro.valor);
    }
    IgualA(otro) {
        return this.valor === otro.valor;
    }
}
//# sourceMappingURL=Dinero.js.map