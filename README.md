# FrameVault

Prototipo local para estudiantes de producción audiovisual: inventaría el material, crea dos respaldos y verifica su contenido mediante SHA-256 antes de la entrega a postproducción.

## Ejecutar

Necesitas Python 3.10 o posterior. En Windows abre **Iniciar FrameVault Web.cmd**, o ejecuta desde la carpeta del proyecto:

```sh
python web_server.py
```

Abre http://127.0.0.1:8765. La interfaz compilada está incluida: no necesitas Node.js ni internet para usarla. Mantén abierto el proceso del servidor mientras trabajas.

## Usar con archivos reales

1. Elige una tarjeta/carpeta o importa archivos sueltos.
2. Selecciona dos carpetas de respaldo existentes, preferiblemente en discos físicos distintos.
3. Revisa el inventario y pulsa **Crear inventario**.
4. Pulsa **Proteger material**. Consulta los errores y usa **Reintentar copia** cuando corresponda.
5. Revisa el pasaporte por archivo y descarga el reporte de entrega.

La organización por proyecto, jornada, cámara y tarjeta es opcional. La jornada automática usa la fecha de modificación; la cámara se indica manualmente. La importación admite hasta 10 GB por archivo; para archivos mayores usa su carpeta local.

## Pruebas de usuario

Despliega **Probar con una persona** al final de la página. Usa copias de 5–10 archivos reales y conserva los originales. Inicia una sesión nueva, observa la tarea y exporta el resultado JSON antes de recargar. El registro incluye tiempo, activación, ayudas y confianza; no incluye rutas ni nombres de archivos. No pongas datos personales en las notas.

## Desarrollo y comprobaciones

La interfaz usa React y Vite. Usa una versión de Node.js compatible con Vite 8 (Node 22.12+).

```sh
python -m unittest test_core test_web -v
cd frontend
npm ci
npx vitest run
npm run build
```

Después de cambiar la interfaz, recompila y recarga el navegador. Las pruebas usan archivos temporales; no requieren material personal. La demo se genera desde la aplicación.

## Alcance del prototipo

- Funciona únicamente en este computador, con el servidor en 127.0.0.1. No está preparado para publicarse como servicio multiusuario ni para distribuir copias entre dispositivos.
- Dos carpetas no garantizan dos discos independientes. Se advierte si los destinos están en el mismo volumen.
- El resultado de integridad es puntual. No garantiza la salud futura del disco ni que el video sea reproducible. Verifica nuevamente cuando cambien los archivos.
- El pasaporte es un registro local editable, sin firma digital. No hay cifrado ni custodia forense certificada.
- Los reportes de entrega contienen nombres y rutas; compártelos solo con tu equipo.
- Los datos de usuarios, respaldos, historial, dependencias instaladas y archivos temporales quedan fuera del repositorio.
