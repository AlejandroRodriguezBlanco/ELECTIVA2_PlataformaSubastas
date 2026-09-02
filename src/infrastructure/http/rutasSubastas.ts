import { Router, type Request, type Response } from "express";
import { randomUUID } from "node:crypto";
import type { RepositorioSubastas } from "../../application/ports/RepositorioSubastas.js";
import { PublicarSubasta } from "../../application/casosDeUso/PublicarSubasta.js";
import { RegistrarPuja } from "../../application/casosDeUso/RegistrarPuja.js";
import { CancelarSubasta } from "../../application/casosDeUso/CancelarSubasta.js";

export function crearRutasSubastas(repositorio: RepositorioSubastas): Router {
  const router = Router();

  const publicarSubasta = new PublicarSubasta(repositorio);
  const registrarPuja = new RegistrarPuja(repositorio);
  const cancelarSubasta = new CancelarSubasta(repositorio);

  router.post("/", async (req: Request, res: Response) => {
    try {
      const subasta = await publicarSubasta.ejecutar({
        id: randomUUID(),
        vendedorId: req.body.vendedorId,
        precioBase: req.body.precioBase,
        incrementoMinimo: req.body.incrementoMinimo,
        fechaPublicacion: new Date(),
        fechaCierre: new Date(req.body.fechaCierre),
      });

      res.status(201).json({
        id: subasta.obtenerId(),
        estado: subasta.obtenerEstado(),
      });
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error al publicar la subasta.";
      res.status(400).json({ error: mensaje });
    }
  });

  router.get("/", async (_req: Request, res: Response) => {
    const subastas = await repositorio.listarTodas();
    res.json(
      subastas.map((s) => ({
        id: s.obtenerId(),
        estado: s.obtenerEstado(),
      }))
    );
  });

  router.get("/:id", async (req: Request, res: Response) => {
    const subastaId = req.params.id;
    if (typeof subastaId !== "string") {
      res.status(400).json({ error: "Falta el id de la subasta." });
      return;
    }

    const subasta = await repositorio.buscarPorId(subastaId);
    if (subasta === null) {
      res.status(404).json({ error: "Subasta no encontrada." });
      return;
    }
    res.json({
      id: subasta.obtenerId(),
      estado: subasta.obtenerEstado(),
      pujaVigente: subasta.obtenerPujaVigente()?.obtenerMonto().obtenerValor() ?? null,
      historial: subasta.obtenerHistorialPujas().map((p) => ({
        usuarioId: p.obtenerUsuarioId(),
        monto: p.obtenerMonto().obtenerValor(),
        momento: p.obtenerMomento(),
      })),
    });
  });

  router.post("/:id/pujas", async (req: Request, res: Response) => {
    const subastaId = req.params.id;
    if (typeof subastaId !== "string") {
      res.status(400).json({ error: "Falta el id de la subasta." });
      return;
    }

    const resultado = await registrarPuja.ejecutar({
      subastaId,
      pujaId: randomUUID(),
      usuarioId: req.body.usuarioId,
      monto: req.body.monto,
      momento: new Date(),
    });

    if (!resultado.exitosa) {
      res.status(400).json({ error: resultado.motivo });
      return;
    }

    res.status(201).json({ mensaje: "Puja aceptada." });
  });

  router.post("/:id/cancelar", async (req: Request, res: Response) => {
    const subastaId = req.params.id;
    if (typeof subastaId !== "string") {
      res.status(400).json({ error: "Falta el id de la subasta." });
      return;
    }

    const resultado = await cancelarSubasta.ejecutar(subastaId, req.body.vendedorId);

    if (!resultado.exitosa) {
      res.status(400).json({ error: resultado.motivo });
      return;
    }

    res.json({ mensaje: "Subasta cancelada." });
  });

  return router;
}