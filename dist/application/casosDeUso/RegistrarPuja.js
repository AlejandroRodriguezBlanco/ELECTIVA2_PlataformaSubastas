import { Dinero } from "../../domain/valueObjects/Dinero.js";
export class RegistrarPuja {
    repositorio;
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    async ejecutar(datos) {
        const subasta = await this.repositorio.buscarPorId(datos.subastaId);
        if (subasta === null) {
            return { exitosa: false, motivo: "La subasta no existe." };
        }
        subasta.cerrarSiCorresponde(datos.momento);
        const monto = Dinero.crear(datos.monto);
        const resultado = subasta.recibirPuja(datos.pujaId, datos.usuarioId, monto, datos.momento);
        await this.repositorio.guardar(subasta);
        return resultado;
    }
}
//# sourceMappingURL=RegistrarPuja.js.map