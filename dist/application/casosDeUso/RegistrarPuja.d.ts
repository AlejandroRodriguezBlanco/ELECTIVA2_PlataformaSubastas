import type { ResultadoPuja } from "../../domain/entities/ResultadoPuja.js";
import type { RepositorioSubastas } from "../ports/RepositorioSubastas.js";
export interface DatosRegistrarPuja {
    subastaId: string;
    pujaId: string;
    usuarioId: string;
    monto: number;
    momento: Date;
}
export declare class RegistrarPuja {
    private readonly repositorio;
    constructor(repositorio: RepositorioSubastas);
    ejecutar(datos: DatosRegistrarPuja): Promise<ResultadoPuja>;
}
//# sourceMappingURL=RegistrarPuja.d.ts.map