import { Dinero } from "../valueObjects/Dinero.js";
export declare class Puja {
    private readonly id;
    private readonly usuarioId;
    private readonly monto;
    private readonly momento;
    constructor(id: string, usuarioId: string, monto: Dinero, momento: Date);
    obtenerId(): string;
    obtenerUsuarioId(): string;
    obtenerMonto(): Dinero;
    obtenerMomento(): Date;
}
//# sourceMappingURL=Puja.d.ts.map