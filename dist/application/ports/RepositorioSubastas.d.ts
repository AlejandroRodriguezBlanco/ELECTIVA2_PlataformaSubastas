import type { Subasta } from "../../domain/entities/Subasta.js";
export interface RepositorioSubastas {
    guardar(subasta: Subasta): Promise<void>;
    buscarPorId(id: string): Promise<Subasta | null>;
    listarTodas(): Promise<Subasta[]>;
}
//# sourceMappingURL=RepositorioSubastas.d.ts.map