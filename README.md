# PokéRuta

Aplicación web desarrollada con Angular para buscar Pokémon,
consultar sus características y explorar sus evoluciones.

## Autora

Cristina Cauritongo

## Funcionalidades

- Búsqueda por nombre o número.
- Selección aleatoria entre los primeros 151 Pokémon.
- Ficha con imagen, tipos, medidas y estadísticas.
- Descripción y categoría en español cuando están disponibles.
- Exploración de cadenas evolutivas y sus ramificaciones.
- Selección de una evolución para consultar su ficha.
- Mensajes de carga, búsquedas vacías, resultados inexistentes
  y errores de conexión.
- Caché de consultas e imágenes alternativas.
- Interfaz adaptable a dispositivos móviles.

## Endpoints utilizados

| Endpoint | Función |
| --- | --- |
| /pokemon/{nombre_o_id}/ | Imagen, tipos, medidas y estadísticas. |
| /pokemon-species/{id}/ | Descripción, categoría y enlace evolutivo. |
| /evolution-chain/{id}/ | Especies y ramas de evolución. |

La consulta del Pokémon proporciona species.url. La consulta de
esa especie proporciona evolution_chain.url. Así se relacionan
los tres recursos en la ficha y la navegación entre evoluciones.

## Instalación y ejecución

Requiere Node.js y npm compatibles con Angular 21.

1. Clonar el repositorio.
2. Abrir una terminal dentro del proyecto.
3. Ejecutar: npm install
4. Ejecutar: npm start
5. Abrir: http://localhost:4200

## Compilación

Ejecutar: npm run build

La aplicación no requiere backend propio ni base de datos.

## Sitio publicado

[Visitar PokéRuta](https://pokeruta.vercel.app/)