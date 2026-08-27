/**
 * Punto de entrada principal (main.js)
 * Inicializa los módulos de la aplicación
 */
import { initValidacionContacto } from './validacion.js';
import { fetchLibrosJuridicos, escapeHTML } from './api.js';
import { filtrarLibros } from './filtro.js';

// Estado global en memoria para los libros obtenidos de la API
let catalogoLibros = [];

/**
 * Renderiza una lista de libros en el DOM de forma segura (XSS-safe).
 * @param {Array} libros 
 */
function renderTarjetasLibros(libros) {
  const contenedor = document.getElementById('contenedor-libros');
  const contador = document.getElementById('contadorResultados');
  if (!contenedor) return;

  if (contador) {
    contador.textContent = `Mostrando ${libros.length} de ${catalogoLibros.length} obras disponibles`;
  }

  if (libros.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12 text-center py-4">
        <div class="alert alert-dark border-secondary text-muted-light d-inline-block px-4">
          No se encontraron obras que coincidan con la búsqueda.
        </div>
      </div>
    `;
    return;
  }

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
}

/**
 * Inicializa la carga de la API y el buscador interactivo (E2 + E3)
 */
async function initBiblioteca() {
  const contenedor = document.getElementById('contenedor-libros');
  const inputBuscador = document.getElementById('inputBuscadorLibros');
  if (!contenedor) return;

  contenedor.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="text-muted-light mt-3 small">Consultando catálogo en OpenLibrary API...</p>
    </div>
  `;

  try {
    catalogoLibros = await fetchLibrosJuridicos();
    renderTarjetasLibros(catalogoLibros);

    // Event listener en tiempo real para el filtro dinámico (E3)
    if (inputBuscador) {
      inputBuscador.addEventListener('input', (e) => {
        const termino = e.target.value;
        const librosFiltrados = filtrarLibros(catalogoLibros, termino);
        renderTarjetasLibros(librosFiltrados);
      });
    }

  } catch (error) {
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
  // Inicializar Validación (E1)
  initValidacionContacto("formContacto");

  // Inicializar Biblioteca con Filtro en Tiempo Real (E2 + E3)
  initBiblioteca();

  // Modal interactivo
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