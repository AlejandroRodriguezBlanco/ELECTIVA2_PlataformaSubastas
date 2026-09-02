import { Subasta } from "../../domain/entities/Subasta.js";
import type { RepositorioSubastas } from "../ports/RepositorioSubastas.js";
export interface DatosPublicarSubasta {
    id: string;
    vendedorId: string;
    precioBase: number;
    incrementoMinimo: number;
    fechaPublicacion: Date;
    fechaCierre: Date;
}
export declare class PublicarSubasta {
    private readonly repositorio;
    constructor(repositorio: RepositorioSubastas);
    ejecutar(datos: DatosPublicarSubasta): Promise<Subasta>;
}
//# sourceMappingURL=PublicarSubasta.d.ts.map