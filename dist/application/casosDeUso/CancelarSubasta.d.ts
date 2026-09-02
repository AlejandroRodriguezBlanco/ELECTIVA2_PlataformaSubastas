import type { RepositorioSubastas } from "../ports/RepositorioSubastas.js";
export declare class CancelarSubasta {
    private readonly repositorio;
    constructor(repositorio: RepositorioSubastas);
    ejecutar(subastaId: string, vendedorId: string): Promise<{
        exitosa: boolean;
        motivo?: string;
    }>;
}
//# sourceMappingURL=CancelarSubasta.d.ts.map