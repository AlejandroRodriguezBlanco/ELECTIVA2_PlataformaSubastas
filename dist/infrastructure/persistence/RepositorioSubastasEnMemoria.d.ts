import type { Subasta } from "../../domain/entities/Subasta.js";
import type { RepositorioSubastas } from "../../application/ports/RepositorioSubastas.js";
export declare class RepositorioSubastasEnMemoria implements RepositorioSubastas {
    private readonly subastas;
    guardar(subasta: Subasta): Promise<void>;
    buscarPorId(id: string): Promise<Subasta | null>;
    listarTodas(): Promise<Subasta[]>;
}
//# sourceMappingURL=RepositorioSubastasEnMemoria.d.ts.map