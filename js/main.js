/**
 * Punto de entrada principal (main.js)
 * Inicializa los módulos de la aplicación
 */
import { initValidacionContacto } from './validacion.js';
import { fetchLibrosJuridicos, escapeHTML } from './api.js';
import { filtrarLibros } from './filtro.js';
import { obtenerFavoritos, alternarFavorito, esFavorito } from './storage.js';

// Expresión regular estricta para email (requiere @ y punto con dominio)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Estado global en memoria para los libros obtenidos de la API
let catalogoLibros = [];

/**
 * Actualiza el contador de libros guardados en la interfaz.
 */
function actualizarContadorFavoritos() {
  const badgeFavoritos = document.getElementById('contadorFavoritosBadge');
  if (badgeFavoritos) {
    const total = obtenerFavoritos().length;
    badgeFavoritos.textContent = `${total} guardada${total === 1 ? '' : 's'}`;
  }
}

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
    const key = libro.key ? escapeHTML(libro.key) : escapeHTML(libro.title);
    const titulo = escapeHTML(libro.title);
    const autores = libro.authors && libro.authors.length > 0 
      ? escapeHTML(libro.authors.map(a => a.name).join(', ')) 
      : 'Autor de referencia';
    const anio = libro.first_publish_year ? escapeHTML(libro.first_publish_year) : 'Edición académica';
    const guardado = esFavorito(key);

    return `
      <div class="col-md-6 col-lg-4">
        <div class="card card-custom h-100 p-4 d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-secondary text-light small">${anio}</span>
              <button 
                class="btn btn-sm ${guardado ? 'btn-warning text-dark' : 'btn-outline-warning'} btn-favorito" 
                data-key="${key}"
                aria-label="Guardar obra para estudio"
                title="${guardado ? 'Remover de mis lecturas' : 'Guardar en mis lecturas'}"
              >
                ${guardado ? '★ Guardado' : '☆ Guardar'}
              </button>
            </div>
            <h3 class="h5 fw-bold text-light mb-2">${titulo}</h3>
            <p class="text-muted-light small mb-3"><strong>Autor(es):</strong> ${autores}</p>
          </div>
          <div class="mt-3 pt-3 border-top border-secondary-subtle d-flex justify-content-between align-items-center">
            <span class="badge bg-primary-subtle text-primary border border-primary-subtle small">Doctrina de Apoyo</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Vincular eventos click a los botones de favoritos (E4)
  const botonesFav = contenedor.querySelectorAll('.btn-favorito');
  botonesFav.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      const libroKey = e.currentTarget.getAttribute('data-key');
      alternarFavorito(libroKey);
      actualizarContadorFavoritos();
      const inputBuscador = document.getElementById('inputBuscadorLibros');
      const termino = inputBuscador ? inputBuscador.value : '';
      renderTarjetasLibros(filtrarLibros(catalogoLibros, termino));
    });
  });
}

/**
 * Inicializa la carga de la API, el buscador y el almacenamiento local (E2 + E3 + E4)
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
    actualizarContadorFavoritos();

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
  // Inicializar Validación Formulario Principal (E1)
  initValidacionContacto("formContacto");

  // Inicializar Biblioteca con Filtro y Persistencia (E2 + E3 + E4)
  initBiblioteca();

  // Control interactivo y validación del Modal de Inscripción
  const planTexto = document.getElementById("planSeleccionadoTexto");
  const botonesPlan = document.querySelectorAll("[data-plan]");
  const formModal = document.getElementById("formModalInscripcion");
  const modalEmail = document.getElementById("modalEmail");
  const modalTelefono = document.getElementById("modalTelefono");

  botonesPlan.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const nombrePlan = e.currentTarget.getAttribute("data-plan");
      if (planTexto && nombrePlan) {
        planTexto.textContent = nombrePlan;
      }
    });
  });

  // Limpiar estados de error al escribir en el modal
  if (modalEmail) {
    modalEmail.addEventListener("input", () => {
      modalEmail.classList.remove("is-invalid");
      const err = modalEmail.parentElement.querySelector(".invalid-feedback");
      if (err) err.remove();
    });
  }

  if (formModal) {
    formModal.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const emailValor = modalEmail ? modalEmail.value.trim() : "";
      const telValor = modalTelefono ? modalTelefono.value.trim() : "";
      let valido = true;

      // Validación estricta de Regex para correo en el modal
      if (!EMAIL_REGEX.test(emailValor)) {
        valido = false;
        modalEmail.classList.add("is-invalid");
        let err = modalEmail.parentElement.querySelector(".invalid-feedback");
        if (!err) {
          err = document.createElement("div");
          err.className = "invalid-feedback d-block";
          modalEmail.parentElement.appendChild(err);
        }
        err.textContent = "Concéntrate pues! Ingresa un correo electrónico válido (ej. usuario@dominio.cl).";
      }

      // Validación de teléfono
      if (telValor.length < 8) {
        valido = false;
        modalTelefono.classList.add("is-invalid");
        let err = modalTelefono.parentElement.querySelector(".invalid-feedback");
        if (!err) {
          err = document.createElement("div");
          err.className = "invalid-feedback d-block";
          modalTelefono.parentElement.appendChild(err);
        }
        err.textContent = "Ingresa un teléfono o WhatsApp de contacto válido.";
      }

      if (!valido) return;

      const planActual = planTexto ? planTexto.textContent : "Plan Grado";
      alert(`Postulación confirmada para: ${planActual}.\nCoordinaremos contigo al correo: ${emailValor}`);
      
      const modalElement = document.getElementById("modalInscripcion");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
      formModal.reset();
    });
  }
});