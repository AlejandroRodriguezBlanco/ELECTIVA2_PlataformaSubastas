ELECTIVA2_PlataformaSubastas_EquipoPorDefinir

Materia: Electiva II - Desarrollo
Proyecto: Plataforma de Subastas en Línea
Equipo: Rodriguez-Maturana-Cañas
Integrantes:

Alejandro Rodríguez Blanco
Juan David Maturana Lozano
Juan Esteban Cañas Garcia
Descripción

Plataforma que permite a un usuario publicar artículos en subasta pública, con pujas en tiempo real. El proyecto está construido siguiendo arquitectura hexagonal y diseño guiado por el dominio.

Estructura del repositorio

-dominio de negocio puro→ domain/entities (Subasta, Puja, ResultadoPuja) y domain/valueObjects (Dinero, PeriodoSubasta, EstadoSubasta), objetos inmutables y autovalidados (RNF-07).

-aplicación → application/casosDeUso (PublicarSubasta, RegistrarPuja, CancelarSubasta) y application/ports (RepositorioSubastas, la interfaz que implementa infraestructura).

-infraestructura → infrastructure/http (rutas y controladores Express, sin lógica de negocio) e infrastructure/persistence (RepositorioSubastasEnMemoria, implementación del puerto).

-index.ts → punto de entrada del servidor.

Correspondencia con la arquitectura hexagonal
domain/: núcleo del negocio. No importa Express, ni librerías externas (RNF-02).
application/: orquesta el dominio a través de casos de uso, y define los puertos que la infraestructura debe implementar (RNF-04).
infrastructure/: implementaciones concretas — Express para HTTP, y un mapa en memoria para persistencia. Puede sustituirse sin tocar domain/ ni application/ (RNF-06).
Requisitos previos
Node.js (v20 o superior)
npm
Instalación y ejecución
Clonar el repositorio con git clone y entrar a la carpeta del proyecto.
Instalar dependencias con: npm install
Ejecutar en modo desarrollo con: npm run dev
El servidor queda disponible en http://localhost:3000
Variables de entorno
Variable	Descripción	Valor por defecto
PORT	Puerto en el que escucha el servidor	3000
Scripts disponibles
Comando	Qué hace
npm run dev	Corre el servidor en modo desarrollo con recarga automática
npm run build	Compila TypeScript a JavaScript (carpeta dist/)
npm start	Corre la versión ya compilada
Endpoints disponibles (Entrega 1)
Método	Ruta	Descripción
POST	/subastas	Publica una nueva subasta
GET	/subastas	Lista todas las subastas
GET	/subastas/:id	Consulta el detalle de una subasta
POST	/subastas/:id/pujas	Registra una puja sobre una subasta
POST	/subastas/:id/cancelar	Cancela una subasta sin pujas
Estrategia de ramas y commits

(Pendiente de definir con el equipo)

Pruebas

(Pendiente — se agregarán pruebas unitarias del dominio)