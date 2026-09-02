import { Dinero } from "../valueObjects/Dinero.js";
import { PeriodoSubasta } from "../valueObjects/PeriodoSubasta.js";
import { EstadoSubasta } from "../valueObjects/EstadoSubasta.js";
import { Puja } from "./Puja.js";
import type { ResultadoPuja } from "./ResultadoPuja.js";
export declare class Subasta {
    private readonly id;
    private readonly vendedorId;
    private readonly precioBase;
    private readonly incrementoMinimo;
    private readonly periodo;
    private estado;
    private readonly pujas;
    private constructor();
    static publicar(id: string, vendedorId: string, precioBase: Dinero, incrementoMinimo: Dinero, periodo: PeriodoSubasta): Subasta;
    recibirPuja(id: string, usuarioId: string, monto: Dinero, momento: Date): ResultadoPuja;
    cancelar(): void;
    cerrarSiCorresponde(momentoActual: Date): void;
    obtenerPujaVigente(): Puja | null;
    obtenerId(): string;
    obtenerEstado(): EstadoSubasta;
    obtenerVendedorId(): string;
    obtenerHistorialPujas(): ReadonlyArray<Puja>;
}
//# sourceMappingURL=Subasta.d.ts.map