/**
 * Punto de entrada principal (main.js)
 * Inicializa los módulos de la aplicación
 */
import { initValidacionContacto } from './validacion.js';
import { fetchLibrosJuridicos, escapeHTML } from './api.js';

/**
 * Renderiza la biblioteca jurídica con estados de carga, éxito y error (E2)
 */
async function renderBiblioteca() {
  const contenedor = document.getElementById('contenedor-libros');
  if (!contenedor) return;

  // 1. Estado Loading (Spinner de carga)
  contenedor.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="text-muted-light mt-3 small">Consultando catálogo en OpenLibrary API...</p>
    </div>
  `;

  try {
    const libros = await fetchLibrosJuridicos();

    // 2. Estado Vacío (Sin resultados)
    if (libros.length === 0) {
      contenedor.innerHTML = `
        <div class="col-12 text-center py-4">
          <p class="text-muted-light">No se encontraron libros disponibles en este momento.</p>
        </div>
      `;
      return;
    }

    // 3. Estado Success (Renderizado dinámico sanitizado con escapeHTML)
    contenedor.innerHTML = libros.map((libro) => {
      const titulo = escapeHTML(libro.title);
      const autores = libro.authors && libro.authors.length > 0 
        ? escapeHTML(libro.authors.map(a => a.name).join(', ')) 
        : 'Autor de referencia';
      const anio = libro.first_publish_year ? escapeHTML(libro.first_publish_year) : 'Edición académica';

      return `
        <div class="col-md-6 col-lg-4">
          <div class="card card-custom h-100 p-4 d-flex flex-column justify-content-between">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-secondary text-light small">${anio}</span>
                <span class="text-primary small">📖 Manual</span>
              </div>
              <h3 class="h5 fw-bold text-light mb-2">${titulo}</h3>
              <p class="text-muted-light small mb-3"><strong>Autor(es):</strong> ${autores}</p>
            </div>
            <div class="mt-3 pt-3 border-top border-secondary-subtle">
              <span class="badge bg-primary-subtle text-primary border border-primary-subtle small">Doctrina de Apoyo</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

  } catch (error) {
    // 4. Estado Error (Mensaje accesible si falla la red o la API)
    contenedor.innerHTML = `
      <div class="col-12 text-center py-4">
        <div class="alert alert-danger bg-dark border-danger text-light d-inline-block px-4">
          ⚠️ Ocurrió un error al conectar con la API de OpenLibrary. Por favor, intenta de nuevo más tarde.
        </div>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar Validación de Formulario (E1)
  initValidacionContacto("formContacto");

  // Inicializar Consumo de API Externa (E2)
  renderBiblioteca();

  // Captura dinámica del plan en el Modal de Inscripción
  const planTexto = document.getElementById("planSeleccionadoTexto");
  const botonesPlan = document.querySelectorAll("[data-plan]");
  const formModal = document.getElementById("formModalInscripcion");

  botonesPlan.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const nombrePlan = e.currentTarget.getAttribute("data-plan");
      if (planTexto && nombrePlan) {
        planTexto.textContent = nombrePlan;
      }
    });
  });

  if (formModal) {
    formModal.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailModal = document.getElementById("modalEmail").value.trim();
      const planActual = planTexto ? planTexto.textContent : "Plan Grado";

      alert(`Postulación confirmada para: ${planActual}.\nCoordinaremos contigo al correo: ${emailModal}`);
      
      const modalElement = document.getElementById("modalInscripcion");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
      formModal.reset();
    });
  }
});