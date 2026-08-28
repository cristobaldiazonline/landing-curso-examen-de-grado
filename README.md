# Distinción Máxima - Plataforma de Preparación Jurídica (v2.0)

Plataforma web modular de alto rendimiento desarrollada para el programa intensivo de preparación del examen de grado en Derecho: **Distinción Máxima**[cite: 1].

---

## 🚀 Evolutivos Implementados (Evaluación 2)

1. **E1 - Validación de Formularios en JS:** Validación en el evento `submit` y en tiempo real (`input`) sobre el formulario de diagnóstico sin dependencias externas[cite: 1]. Despliega errores inline y valida formato de correo electrónico[cite: 1].
2. **E2 - Consumo de API Pública con Fetch:** Integración con la API pública de **OpenLibrary** (`https://openlibrary.org/subjects/law.json`) para renderizar un catálogo de doctrina y manuales jurídicos[cite: 1]. Manejo de estados *Loading*, *Success* y *Error*[cite: 1].
3. **E3 - Filtro / Búsqueda Dinámica:** Búsqueda en tiempo real mediante evento `input` que filtra el catálogo por título o autor sin recargar la página[cite: 1].
4. **E4 - Persistencia con LocalStorage:** Sistema de marcado de lecturas recomendadas con persistencia local en el navegador del usuario[cite: 1].

---

## 🛠️ Decisiones Técnicas y Arquitectura

* **Modularidad ES6 (Vanilla JS):** El código JavaScript se estructuró en módulos independientes por responsabilidad (`validacion.js`, `api.js`, `filtro.js`, `storage.js`), orquestados desde `main.js`[cite: 1].
* **Seguridad y Prevención XSS:** Todos los datos recibidos de la API externa son sanitizados con la función de escape de entidades HTML (`escapeHTML()`) antes de ser inyectados al DOM[cite: 1].
* **Manejo Asíncrono Robusto:** Implementación de promesas con `async/await` y bloques `try/catch` para garantizar que fallos en la red no rompan la ejecución del sitio[cite: 1].
* **UX y Accesibilidad:** Estados de carga mediante spinners de Bootstrap, atributos ARIA en inputs de búsqueda y feedback visual inmediato[cite: 1].

---

## 🌳 Flujo de Trabajo Git

* **v1.0:** Commit base correspondiente a la entrega estática inicial[cite: 1].
* **v2.0:** Integración de los 4 evolutivos JS mediante ramas de funcionalidad y Pull Requests con Code Reviews[cite: 1].