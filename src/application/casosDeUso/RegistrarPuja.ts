import { Dinero } from "../../domain/valueObjects/Dinero.js";
import type { ResultadoPuja } from "../../domain/entities/ResultadoPuja.js";
import type { RepositorioSubastas } from "../ports/RepositorioSubastas.js";

export interface DatosRegistrarPuja {
  subastaId: string;
  pujaId: string;
  usuarioId: string;
  monto: number;
  momento: Date;
}

export class RegistrarPuja {
  constructor(private readonly repositorio: RepositorioSubastas) {}

  async ejecutar(datos: DatosRegistrarPuja): Promise<ResultadoPuja> {
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