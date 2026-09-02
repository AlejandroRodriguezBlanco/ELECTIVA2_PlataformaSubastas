import { Subasta } from "../../domain/entities/Subasta.js";
import { Dinero } from "../../domain/valueObjects/Dinero.js";
import { PeriodoSubasta } from "../../domain/valueObjects/PeriodoSubasta.js";
import type { RepositorioSubastas } from "../ports/RepositorioSubastas.js";

export interface DatosPublicarSubasta {
  id: string;
  vendedorId: string;
  precioBase: number;
  incrementoMinimo: number;
  fechaPublicacion: Date;
  fechaCierre: Date;
}

export class PublicarSubasta {
  constructor(private readonly repositorio: RepositorioSubastas) {}

  async ejecutar(datos: DatosPublicarSubasta): Promise<Subasta> {
    const precioBase = Dinero.crear(datos.precioBase);
    const incrementoMinimo = Dinero.crear(datos.incrementoMinimo);
    const periodo = PeriodoSubasta.crear(datos.fechaPublicacion, datos.fechaCierre);

    const subasta = Subasta.publicar(
      datos.id,
      datos.vendedorId,
      precioBase,
      incrementoMinimo,
      periodo
    );

    await this.repositorio.guardar(subasta);

    return subasta;
  }
}