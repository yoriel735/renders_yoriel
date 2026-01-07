# renders_yoriel

## CI/CD (Hito 4)
Este repo implementa un pipeline básico que cubre: tests en Push/PR, deploy automático desde `main` si los tests pasan, y rollback manual en Render.

### Qué hace el workflow
- Push/PR a `main` ejecuta los tests (GitHub Actions).  
- Si los tests de `main` pasan, la job `deploy` hace POST al **Render Deploy Hook** (debe añadirse como secreto `RENDER_DEPLOY_HOOK`) para lanzar el deploy en Render.

### Cómo configurarlo (rápido)
1. En Render → tu Service → **Deploy Hooks** crea un *Deploy Hook* y copia la URL.  
2. En GitHub → repo → Settings → **Secrets & variables** → **Actions** añade `RENDER_DEPLOY_HOOK` con la URL.  
3. En Render → Settings → **Environment** añade `NODE_ENV=production` (y opcionalmente `FAIL_HITO3=1` para probar fallo en runtime).  

### Cómo probar el flujo (paso a paso)
1. Local: `npm test` debe pasar.  
2. Hacer commit con el cambio que provoca el fallo en producción (por ejemplo, error lanzado solo cuando `process.env.FAIL_HITO3 === '1'`).  
3. Push a `main`: GitHub Actions ejecutará tests; si pasan, la job `deploy` POST al hook.  
4. En Render → **Activity / Deploys** monitoriza el deploy: revisa logs de Build, Deploy y Runtime.  
5. Si el deploy falla en runtime, en **Activity** selecciona el deploy exitoso anterior y usa **Rollback** o **Manual Deploy** para restaurar (tomar capturas).  

### Evidencia / Checklist para entregar
- Captura de la ejecución del workflow (tests passing).  
- Capturas de logs de Render (Build, Deploy, Runtime).  
- Captura del botón/acción de rollback y del rollback efectuado.  
- SHA del commit desplegado y verificación de que la versión en Render coincide con ese commit.  
- README con la configuración y pasos (esta sección).

### Plantilla breve de informe de incidente
- **Título:** Rollback test - commit `3e8b391`  
- **Fecha/Hora:** (poner timestamp)  
- **Causa:** Error intencionado en runtime (variable `FAIL_HITO3`)  
- **Diagnóstico:** Tests pasaron; deploy alcanzó runtime y falló; logs muestran `Error: Fallo intencionado Hito 3`  
- **Acción tomada:** Rollback a commit `<SHA_OK>` desde Activity → Deploys  
- **Resultado:** Servicio recuperado; tiempo de recuperación X min; adjuntar capturas y fragmentos de log.
