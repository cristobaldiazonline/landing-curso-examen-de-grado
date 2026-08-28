/**
 * Módulo de Validación de Formularios (E1)
 * Validación robusta en Vanilla JS sin dependencias externas.
 */

// Expresión regular estándar para validación estricta de formato email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Muestra el mensaje de error inline debajo del campo correspondiente.
 * @param {HTMLElement} input - Elemento input a validar
 * @param {string} mensaje - Mensaje de error a desplegar
 */
function mostrarError(input, mensaje) {
  limpiarError(input);
  input.classList.add('is-invalid');
  input.classList.remove('is-valid');

  const errorDiv = document.createElement('div');
  errorDiv.className = 'invalid-feedback d-block text-danger small mt-1';
  errorDiv.textContent = mensaje;
  input.parentNode.appendChild(errorDiv);
}

/**
 * Marca el campo como válido y retira mensajes de error previos.
 * @param {HTMLElement} input - Elemento input validado
 */
function marcarValido(input) {
  limpiarError(input);
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
}

/**
 * Limpia el estado de error de un input.
 * @param {HTMLElement} input 
 */
function limpiarError(input) {
  const errorExistente = input.parentNode.querySelector('.invalid-feedback');
  if (errorExistente) {
    errorExistente.remove();
  }
}

/**
 * Inicializa la validación sobre el formulario de contacto principal.
 * @param {string} formId 
 */
export function initValidacionContacto(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const nombre = document.getElementById('nombreContacto');
  const email = document.getElementById('emailContacto');
  const universidad = document.getElementById('universidadContacto');

  // Validación en tiempo real (evento 'input') para feedback inmediato
  if (nombre) {
    nombre.addEventListener('input', () => {
      if (nombre.value.trim().length >= 3) {
        marcarValido(nombre);
      } else {
        limpiarError(nombre);
        nombre.classList.remove('is-valid');
      }
    });
  }

  if (email) {
    email.addEventListener('input', () => {
      if (EMAIL_REGEX.test(email.value.trim())) {
        marcarValido(email);
      } else {
        limpiarError(email);
        email.classList.remove('is-valid');
      }
    });
  }

  if (universidad) {
    universidad.addEventListener('input', () => {
      if (universidad.value.trim().length >= 3) {
        marcarValido(universidad);
      } else {
        limpiarError(universidad);
        universidad.classList.remove('is-valid');
      }
    });
  }

  // Validación integral al disparar el evento submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let esValido = true;

    // 1. Validar Nombre
    if (!nombre || nombre.value.trim().length < 3) {
      mostrarError(nombre, 'El nombre debe contener al menos 3 caracteres.');
      esValido = false;
    } else {
      marcarValido(nombre);
    }

    // 2. Validar Email
    if (!email || !EMAIL_REGEX.test(email.value.trim())) {
      mostrarError(email, 'ponle más bebida ¿ve profe que hice la tarea?');
      esValido = false;
    } else {
      marcarValido(email);
    }

    // 3. Validar Universidad / Fecha
    if (!universidad || universidad.value.trim().length < 3) {
      mostrarError(universidad, 'Por favor indica tu universidad de egreso o fecha estimada.');
      esValido = false;
    } else {
      marcarValido(universidad);
    }

    // Si todos los campos son válidos, procesar el envío
    if (esValido) {
      const alertaExito = document.createElement('div');
      alertaExito.className = 'alert alert-success mt-3 py-2 px-3 small border border-success';
      alertaExito.textContent = `¡Solicitud recibida con éxito, ${nombre.value.trim()}! Te contactaremos a ${email.value.trim()} para coordinar tu diagnóstico.`;
      
      form.appendChild(alertaExito);
      form.reset();

      // Limpiar clases de validación tras 4 segundos
      setTimeout(() => {
        alertaExito.remove();
        [nombre, email, universidad].forEach(el => el.classList.remove('is-valid'));
      }, 5000);
    }
  });
}