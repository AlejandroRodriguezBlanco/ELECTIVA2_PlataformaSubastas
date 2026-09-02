import { Dinero } from "../valueObjects/Dinero.js";
import { PeriodoSubasta } from "../valueObjects/PeriodoSubasta.js";
import { EstadoSubasta } from "../valueObjects/EstadoSubasta.js";
import { Puja } from "./Puja.js";
export class Subasta {
    id;
    vendedorId;
    precioBase;
    incrementoMinimo;
    periodo;
    estado;
    pujas;
    constructor(id, vendedorId, precioBase, incrementoMinimo, periodo) {
        this.id = id;
        this.vendedorId = vendedorId;
        this.precioBase = precioBase;
        this.incrementoMinimo = incrementoMinimo;
        this.periodo = periodo;
        this.estado = EstadoSubasta.ABIERTA;
        this.pujas = [];
    }
    static publicar(id, vendedorId, precioBase, incrementoMinimo, periodo) {
        if (precioBase.obtenerValor() <= 0) {
            throw new Error("El precio base debe ser mayor que cero.");
        }
        if (incrementoMinimo.obtenerValor() <= 0) {
            throw new Error("El incremento mínimo debe ser mayor que cero.");
        }
        return new Subasta(id, vendedorId, precioBase, incrementoMinimo, periodo);
    }
    recibirPuja(id, usuarioId, monto, momento) {
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
        }
        else {
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
    cancelar() {
        if (this.pujas.length > 0) {
            throw new Error("No se puede cancelar una subasta que ya recibió pujas.");
        }
        this.estado = EstadoSubasta.CANCELADA;
    }
    cerrarSiCorresponde(momentoActual) {
        if (this.estado !== EstadoSubasta.ABIERTA) {
            return;
        }
        if (!this.periodo.yaCerro(momentoActual)) {
            return;
        }
        this.estado = this.pujas.length > 0 ? EstadoSubasta.CERRADA : EstadoSubasta.DESIERTA;
    }
    obtenerPujaVigente() {
        if (this.pujas.length === 0) {
            return null;
        }
        return this.pujas[this.pujas.length - 1] ?? null;
    }
    obtenerId() {
        return this.id;
    }
    obtenerEstado() {
        return this.estado;
    }
    obtenerVendedorId() {
        return this.vendedorId;
    }
    obtenerHistorialPujas() {
        return this.pujas;
    }
}
//# sourceMappingURL=Subasta.js.map