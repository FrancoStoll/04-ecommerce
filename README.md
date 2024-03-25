# Descripción

## Instalación

1. Clonar el repositorio
2. Crear una copia del `.env.template` y renombrarlo a `env` y cambiar las variables de entorno
3. Instalar dependecias ```npm install```
4. Levantar la bas de datos ```docker-compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed```
7. Iniciar el proyecto ```npm run dev```

## Producción
