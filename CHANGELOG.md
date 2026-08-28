# Changelog

Todos los cambios notables realizados en este proyecto están documentados en este archivo.

## [v2.0] - 2026-05-28

### Agregado
- **E1 (Validación de Formularios):** Validación en tiempo real y en submit con expresiones regulares para email, prevención de recarga y mensajes de error accesibles inline.
- **E2 (Consumo de API Externa):** Integración asíncrona con OpenLibrary API para listar obras de Derecho, con manejo de estados de carga (spinner), error y respuesta vacía.
- **E3 (Filtro Dinámico):** Búsqueda reactiva en tiempo real sobre el catálogo de obras por título y autor mediante manipulación del DOM sin peticiones redundantes[cite: 1].
- **E4 (Persistencia LocalStorage):** Sistema de guardado de manuales y lecturas con persistencia en el navegador (`localStorage`) y contador dinámico[cite: 1].

### Mejorado
- Arquitectura modular desacoplada basada en ES Modules (`js/main.js`, `js/validacion.js`, `js/api.js`, `js/filtro.js`, `js/storage.js`)[cite: 1].
- Sanitización estricta de variables externas mediante función `escapeHTML()` para mitigación de vulnerabilidades XSS[cite: 1].
- Cero errores o advertencias en la consola del navegador[cite: 1].

## [v1.0] - 2026-05-21

### Entrega Inicial
- Maquetación responsiva con HTML5 semántico y Bootstrap 5[cite: 1].
- Sistema de diseño oscuro (*Dark Theme*) y variables en CSS3 custom.
- Modal interactivo para selección dinámica de planes de estudio.