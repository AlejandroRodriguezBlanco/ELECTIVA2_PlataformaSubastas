export class RepositorioSubastasEnMemoria {
    subastas = new Map();
    async guardar(subasta) {
        this.subastas.set(subasta.obtenerId(), subasta);
    }
    async buscarPorId(id) {
        return this.subastas.get(id) ?? null;
    }
    async listarTodas() {
        return Array.from(this.subastas.values());
    }
}
//# sourceMappingURL=RepositorioSubastasEnMemoria.js.map