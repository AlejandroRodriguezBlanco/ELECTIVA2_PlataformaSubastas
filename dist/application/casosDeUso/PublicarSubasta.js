import { Subasta } from "../../domain/entities/Subasta.js";
import { Dinero } from "../../domain/valueObjects/Dinero.js";
import { PeriodoSubasta } from "../../domain/valueObjects/PeriodoSubasta.js";
export class PublicarSubasta {
    repositorio;
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    async ejecutar(datos) {
        const precioBase = Dinero.crear(datos.precioBase);
        const incrementoMinimo = Dinero.crear(datos.incrementoMinimo);
        const periodo = PeriodoSubasta.crear(datos.fechaPublicacion, datos.fechaCierre);
        const subasta = Subasta.publicar(datos.id, datos.vendedorId, precioBase, incrementoMinimo, periodo);
        await this.repositorio.guardar(subasta);
        return subasta;
    }
}
//# sourceMappingURL=PublicarSubasta.js.map