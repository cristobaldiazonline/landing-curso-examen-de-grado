# Distinción Máxima - Landing Page Oficial

Landing page estática de alto rendimiento desarrollada para el programa de preparación integral del examen de grado en Derecho: **Distinción Máxima**.

---

## 📌 Arquitectura y Decisiones Técnicas

* **Semántica HTML5:** Estructura modular construida con landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), grilla responsive y accesibilidad en formularios y modales.
* **Diseño Visual (Dark Theme):** Paleta oscura profunda (`#060913`), contrastes optimizados, tipografía *Inter* y efectos de iluminación (*glow*) inspirados en plataformas de tecnología moderna.
* **Componentes Bootstrap 5:** Implementación de Navbar responsive con blur, cards interactivas y modal dinámico de inscripción.
* **Interactividad con JavaScript Vanilla:**
  * Detección de planes seleccionados mediante atributos `data-plan` e inyección reactiva en el modal.
  * Control y validación asíncrona de formularios con `preventDefault()`.
  * Integración con la API de Bootstrap para el cierre controlado de modales.

---

## 🚀 Flujo de Trabajo Git (0 Commits Directos a Main)

El proyecto fue desarrollado siguiendo el estándar profesional de ramas de funcionalidad y revisiones de código:

1. `feature/estructura-html` (PR #1): Maquetación de las 6 secciones requeridas (Hero, Metodología, Testimonios, Planes, Contacto, Footer) y modal.
2. `feature/estilos-custom` (PR #2): Sistema de variables en `:root`, efectos hover, microinteracciones y media queries responsive.
3. `feature/interaccion-js` (PR #3): Lógica del DOM para captura de planes y procesamiento de formularios.

---

## 🛠️ Tecnologías Empleadas

* HTML5 Semántico
* CSS3 (Variables, Flexbox, Media Queries, Transiciones)
* Bootstrap 5.3.0 (CDN)
* JavaScript Vanilla (ES6+)
* Git & GitHub (Branching Strategy, PRs, Code Reviews)