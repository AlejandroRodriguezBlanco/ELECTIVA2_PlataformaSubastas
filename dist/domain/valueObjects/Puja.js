import { Dinero } from "../valueObjects/Dinero.js";
export class Puja {
    id;
    usuarioId;
    monto;
    momento;
    constructor(id, usuarioId, monto, momento) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.monto = monto;
        this.momento = momento;
    }
    obtenerId() {
        return this.id;
    }
    obtenerUsuarioId() {
        return this.usuarioId;
    }
    obtenerMonto() {
        return this.monto;
    }
    obtenerMomento() {
        return this.momento;
    }
}
//# sourceMappingURL=Puja.js.map