# Instrucciones de Despliegue - Sistema de Distribuidora

## 📋 Checklist Pre-Despliegue

✅ **Build exitoso** - El proyecto compila sin errores
✅ **Export estático** - Configurado para `output: 'export'`
✅ **Imágenes optimizadas** - Deshabilitadas para compatibilidad
✅ **Lint clean** - Código sin errores de linting
✅ **TypeScript strict** - Tipado completo y correcto
✅ **Todas las páginas funcionando** - Dashboard, productos, empleados, movimientos, clientes, órdenes

## 🚀 Opciones de Despliegue

### 1. Netlify (Recomendado)

#### Despliegue Manual
1. Ejecutar `npm run build` localmente
2. Subir la carpeta `out` a Netlify Drop
3. ¡Listo! La aplicación estará disponible

#### Despliegue Automático (Git)
1. Subir código a GitHub/GitLab
2. Conectar repositorio en Netlify
3. Configurar build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: 18 o superior
4. Deploy automático en cada push

### 2. Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```
**Nota**: Cambiar `output: 'export'` por `output: 'standalone'` en `next.config.js`

### 3. GitHub Pages
```bash
# Build
npm run build

# Deploy (requiere configuración adicional)
# Agregar `assetPrefix` y `basePath` en next.config.js si está en subdirectorio
```

### 4. Servidor Tradicional
```bash
# Build
npm run build

# Subir carpeta 'out' al servidor web
# Configurar servidor para SPAs
```

## ⚙️ Configuración de Netlify

### netlify.toml (Opcional)
```toml
[build]
  publish = "out"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Variables de Entorno
No se requieren variables de entorno para el despliegue básico.

## 🔧 Comandos de Desarrollo

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Preview del build
npm run start

# Linting
npm run lint

# Análisis de bundle (opcional)
npx @next/bundle-analyzer
```

## 📱 Testing en Diferentes Dispositivos

### Desktop
- ✅ Chrome/Edge/Firefox
- ✅ Safari (macOS)
- ✅ Resoluciones 1920x1080 y superiores

### Mobile
- ✅ iOS Safari
- ✅ Android Chrome
- ✅ Responsive breakpoints

### Tablet
- ✅ iPad (768px y superiores)
- ✅ Android tablets

## 🎯 Métricas de Rendimiento

### Bundle Sizes
- **Dashboard**: ~4.26 KB
- **Productos**: ~4.55 KB  
- **Empleados**: ~4.51 KB
- **Movimientos**: ~3.59 KB
- **Clientes**: ~5.54 KB
- **Órdenes**: ~5.79 KB

### First Load JS
- **Compartido**: ~101 KB
- **Por página**: ~140-143 KB total

### Lighthouse Scores (Estimados)
- **Performance**: 95+
- **Accessibility**: 90+
- **Best Practices**: 95+
- **SEO**: 90+

## 🛡️ Seguridad

### Consideraciones
- ✅ No hay datos sensibles en el frontend
- ✅ Mock data solamente
- ✅ No hay variables de entorno críticas
- ✅ HTTPS habilitado en Netlify por defecto

### Headers de Seguridad (Netlify)
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

## 📊 Monitoreo Post-Despliegue

### Netlify Analytics (Incluido)
- Páginas más visitadas
- Fuentes de tráfico
- Performance básico

### Google Analytics (Opcional)
```javascript
// Agregar en layout.tsx si se requiere
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
```

## 🔄 Updates y Mantenimiento

### Para Actualizaciones
1. Modificar código localmente
2. Probar con `npm run dev`
3. Hacer build con `npm run build`
4. Subir cambios al repositorio
5. Deploy automático en Netlify

### Dependencias
```bash
# Verificar actualizaciones
npm outdated

# Actualizar (cuidado con breaking changes)
npm update
```

## 🎓 Para Uso Educativo

### Demostración en Clase
1. Mostrar código en VS Code
2. Explicar estructura de archivos
3. Demostrar responsive design
4. Mostrar proceso de build
5. Deploy en vivo a Netlify

### Ejercicios para Estudiantes
- Agregar nuevos campos a productos
- Crear nueva página de proveedores
- Implementar modo oscuro
- Agregar gráficos con Chart.js
- Conectar a base de datos real

### Extensiones Recomendadas
- Sistema de autenticación (NextAuth.js)
- Base de datos (Prisma + PostgreSQL)
- API endpoints (tRPC/REST)
- Testing (Jest + Testing Library)
- CI/CD (GitHub Actions)

## 🚨 Troubleshooting

### Error en Build
```bash
# Limpiar cache
rm -rf .next
npm run build
```

### Error en Deploy
- Verificar `next.config.js`
- Revisar logs en Netlify
- Validar que todas las dependencias estén en `package.json`

### Error 404 en Rutas
- Verificar que `output: 'export'` esté configurado
- Confirmar que las páginas existan en `src/app/`

### Problemas de Performance
- Verificar tamaño de imágenes
- Revisar imports innecesarios
- Usar `next/dynamic` para lazy loading

## 📞 Soporte

### Recursos
- [Documentación Next.js](https://nextjs.org/docs)
- [Guías de Netlify](https://docs.netlify.com)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://framer.com/motion)

### Contacto
Para dudas específicas del proyecto, revisar:
1. Comentarios en el código
2. README.md principal
3. Issues en el repositorio

---

**¡El sistema está listo para producción y optimizado para enseñanza!**

*Todas las funcionalidades implementadas y probadas ✅*
