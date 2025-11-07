# 🚀 INSTRUCCIONES DE DESPLIEGUE

## Paso 1: Crear repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre: `thedatawithjose.github.io`
3. Público
4. NO marcar "Initialize with README"

## Paso 2: Conectar y subir código
Ejecuta estos comandos en tu terminal:

```bash
# Cambiar el remote origin
git remote remove origin
git remote add origin https://github.com/thedatawithjose/thedatawithjose.github.io.git

# Subir código
git push -u origin main
```

## Paso 3: Configurar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: "GitHub Actions"
4. El workflow se ejecutará automáticamente

## Paso 4: Configurar dominio personalizado
1. En Settings → Pages
2. Custom domain: `datawithjose.tech`
3. Marcar "Enforce HTTPS"

## Paso 5: Configurar DNS en Cloudflare
Asegúrate de tener estos registros DNS:

```
Tipo: A
Nombre: @
Valor: 185.199.108.153

Tipo: A  
Nombre: @
Valor: 185.199.109.153

Tipo: A
Nombre: @
Valor: 185.199.110.153

Tipo: A
Nombre: @
Valor: 185.199.111.153

Tipo: CNAME
Nombre: www
Valor: datawithjose.tech
```

## ✅ Verificación
- El sitio debería estar disponible en https://datawithjose.tech
- Puede tardar hasta 24 horas en propagarse completamente