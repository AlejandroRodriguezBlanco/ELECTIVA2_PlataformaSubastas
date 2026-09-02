import type { Subasta } from "../../domain/entities/Subasta.js";
import type { RepositorioSubastas } from "../../application/ports/RepositorioSubastas.js";

export class RepositorioSubastasEnMemoria implements RepositorioSubastas {
  private readonly subastas: Map<string, Subasta> = new Map();

  async guardar(subasta: Subasta): Promise<void> {
    this.subastas.set(subasta.obtenerId(), subasta);
  }

  async buscarPorId(id: string): Promise<Subasta | null> {
    return this.subastas.get(id) ?? null;
  }

  async listarTodas(): Promise<Subasta[]> {
    return Array.from(this.subastas.values());
  }
}