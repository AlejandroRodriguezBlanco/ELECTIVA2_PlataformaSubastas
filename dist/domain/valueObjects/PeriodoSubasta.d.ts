export declare class PeriodoSubasta {
    private readonly fechaPublicacion;
    private readonly fechaCierre;
    private constructor();
    static crear(fechaPublicacion: Date, fechaCierre: Date): PeriodoSubasta;
    obtenerFechaCierre(): Date;
    obtenerFechaPublicacion(): Date;
    yaCerro(momentoActual: Date): boolean;
}
//# sourceMappingURL=PeriodoSubasta.d.ts.map