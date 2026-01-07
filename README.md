Renders_Yoriel – CI/CD (Hito 4)

1. Descripción del Repo

Este repositorio contiene un pipeline básico que cubre:

Ejecución de tests en Push/PR.

Deploy automático desde main si los tests pasan.

Rollback manual en Render en caso de fallos en producción.

2. Funcionamiento del Workflow

Cada vez que se hace un Push o PR a main, se ejecutan los tests usando GitHub Actions.

Si los tests pasan, el job de deploy realiza un POST al Render Deploy Hook (debes agregarlo como secreto RENDER_DEPLOY_HOOK) para desplegar en Render automáticamente.

3. Configuración Rápida

En Render → tu Service → Deploy Hooks, crea un Deploy Hook y copia la URL.

En GitHub → Repo → Settings → Secrets & Variables → Actions, añade un nuevo secreto con la URL copiada: RENDER_DEPLOY_HOOK.

En Render → Settings → Environment, añade:

NODE_ENV=production

Opcional: FAIL_HITO3=1 (para simular un error en runtime)

4. Cómo Probar el Flujo

En local: ejecutar npm test (debe pasar).

Crear un commit con un cambio que provoque fallo en producción (por ejemplo, un error activo cuando process.env.FAIL_HITO3 === '1').

Hacer Push a main → GitHub Actions ejecutará los tests y, si pasan, el deploy hará POST al hook.

En Render → Activity / Deploys, monitorizar el deploy. Revisar los logs de Build, Deploy y Runtime.

Si el deploy falla en runtime:

Ir a Activity

Seleccionar el deploy anterior que salió bien

Hacer Rollback o Manual Deploy para restaurarlo (tomar capturas).

5. Evidencia / Checklist para Entregar

Captura de la ejecución del workflow (tests pasados).

Capturas de logs de Render (Build, Deploy, Runtime).

Captura del botón de rollback y del rollback realizado.

SHA del commit desplegado y verificación de versión en Render.

README con configuración y pasos.

6. Plantilla de Informe de Incidente

Título: Rollback test – commit 3e8b391
Fecha/Hora: (poner timestamp)
Causa: Error controlado en runtime (FAIL_HITO3)
Diagnóstico: Tests pasaron; deploy llegó a runtime y falló; logs muestran Error: Fallo intencionado Hito 3.
Acción tomada: Rollback al commit <SHA_OK> desde Activity → Deploys.
Resultado: Servicio recuperado; tiempo de recuperación: X min. Adjuntar capturas y logs.
