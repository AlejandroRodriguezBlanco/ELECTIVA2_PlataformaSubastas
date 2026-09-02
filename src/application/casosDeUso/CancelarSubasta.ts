import type { RepositorioSubastas } from "../ports/RepositorioSubastas.js";

export class CancelarSubasta {
  constructor(private readonly repositorio: RepositorioSubastas) {}

  async ejecutar(subastaId: string, vendedorId: string): Promise<{ exitosa: boolean; motivo?: string }> {
    const subasta = await this.repositorio.buscarPorId(subastaId);

    if (subasta === null) {
      return { exitosa: false, motivo: "La subasta no existe." };
    }

    if (subasta.obtenerVendedorId() !== vendedorId) {
      return { exitosa: false, motivo: "Solo el vendedor puede cancelar la subasta." };
    }

    try {
      subasta.cancelar();
    } catch (error) {
      const motivo = error instanceof Error ? error.message : "No se pudo cancelar la subasta.";
      return { exitosa: false, motivo };
    }

    await this.repositorio.guardar(subasta);
    return { exitosa: true };
  }
}