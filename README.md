renders_yoriel
CI/CD (Hito 4)

Este repo tiene un pipeline básico que cubre: tests en Push/PR, deploy automático desde main si los tests pasan, y rollback manual en Render.

Qué hace el workflow

Cuando haces un Push o PR a main, se ejecutan los tests (usando GitHub Actions).

Si los tests pasan, el job de deploy hace un POST al Render Deploy Hook (que debes agregar como secreto RENDER_DEPLOY_HOOK) para hacer el deploy en Render.

Cómo configurarlo (rápido)

En Render → tu Service → Deploy Hooks, crea un Deploy Hook y copia la URL.

En GitHub → repo → Settings → Secrets & variables → Actions, añade un nuevo secreto con la URL copiada: RENDER_DEPLOY_HOOK.

En Render → Settings → Environment, añade NODE_ENV=production (y si quieres, FAIL_HITO3=1 para simular un error en runtime).

Cómo probar el flujo (paso a paso)

En local: corre npm test, debería pasar.

Haz un commit con un cambio que provoque el fallo en producción (por ejemplo, un error que solo se active cuando process.env.FAIL_HITO3 === '1').

Haz Push a main: GitHub Actions ejecutará los tests, y si pasan, el job de deploy hará un POST al hook.

En Render → Activity / Deploys, monitoriza el deploy. Revisa los logs de Build, Deploy y Runtime.

Si el deploy falla en runtime, ve a Activity, selecciona el deploy anterior que salió bien y haz un Rollback o Manual Deploy para restaurarlo (toma capturas).

Evidencia / Checklist para entregar

Captura de la ejecución del workflow (cuando los tests pasan).

Capturas de los logs de Render (Build, Deploy, Runtime).

Captura del botón de rollback y del rollback que hiciste.

SHA del commit que se desplegó y verificación de que la versión en Render es la misma que ese commit.

README con la configuración y pasos (como en esta sección).

Plantilla rápida para el informe de incidente

Título: Rollback test - commit 3e8b391

Fecha/Hora: (pon el timestamp)

Causa: Error controlado en runtime (variable FAIL_HITO3)

Diagnóstico: Los tests pasaron; el deploy llegó a runtime y falló; los logs muestran Error: Fallo intencionado Hito 3.

Acción tomada: Hice un rollback al commit <SHA_OK> desde Activity → Deploys.

Resultado: El servicio se recuperó; tiempo de recuperación: X min. Adjuntar capturas y fragmentos de log.
