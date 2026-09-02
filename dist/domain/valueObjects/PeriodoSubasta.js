const UNA_HORA_EN_MS = 60 * 60 * 1000;
const TREINTA_DIAS_EN_MS = 30 * 24 * 60 * 60 * 1000;
export class PeriodoSubasta {
    fechaPublicacion;
    fechaCierre;
    constructor(fechaPublicacion, fechaCierre) {
        this.fechaPublicacion = fechaPublicacion;
        this.fechaCierre = fechaCierre;
    }
    static crear(fechaPublicacion, fechaCierre) {
        if (fechaCierre.getTime() <= fechaPublicacion.getTime()) {
            throw new Error("La fecha de cierre debe ser posterior a la fecha de publicación.");
        }
        const duracionEnMs = fechaCierre.getTime() - fechaPublicacion.getTime();
        if (duracionEnMs < UNA_HORA_EN_MS) {
            throw new Error("La duración de la subasta no puede ser inferior a una hora.");
        }
        if (duracionEnMs > TREINTA_DIAS_EN_MS) {
            throw new Error("La duración de la subasta no puede ser superior a treinta días.");
        }
        return new PeriodoSubasta(fechaPublicacion, fechaCierre);
    }
    obtenerFechaCierre() {
        return this.fechaCierre;
    }
    obtenerFechaPublicacion() {
        return this.fechaPublicacion;
    }
    yaCerro(momentoActual) {
        return momentoActual.getTime() >= this.fechaCierre.getTime();
    }
}
//# sourceMappingURL=PeriodoSubasta.js.map