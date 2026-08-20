document.addEventListener("DOMContentLoaded", () => {
  // Referencias a elementos del DOM
  const formContacto = document.getElementById("formContacto");
  const formModalInscripcion = document.getElementById("formModalInscripcion");
  const planTexto = document.getElementById("planSeleccionadoTexto");
  const botonesPlan = document.querySelectorAll("[data-plan]");

  // ==========================================================================
  // EVENTO 1: Inyección dinámica del plan seleccionado en el Modal
  // ==========================================================================
  botonesPlan.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const nombrePlan = e.currentTarget.getAttribute("data-plan");
      if (planTexto && nombrePlan) {
        planTexto.textContent = nombrePlan;
      }
    });
  });

  // ==========================================================================
  // EVENTO 2: Procesamiento del Formulario de Contacto (Auditoría Gratuita)
  // ==========================================================================
  if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
      e.preventDefault(); // Evita recargar la página

      const nombre = document.getElementById("nombreContacto").value.trim();
      const email = document.getElementById("emailContacto").value.trim();

      if (!nombre || !email) {
        alert("Por favor completa los campos obligatorios.");
        return;
      }

      alert(`¡Gracias ${nombre}! Hemos recibido tu solicitud para el diagnóstico estratégico. Te contactaremos a ${email} a la brevedad.`);
      formContacto.reset();
    });
  }

  // ==========================================================================
  // EVENTO 3: Procesamiento del Modal de Inscripción
  // ==========================================================================
  if (formModalInscripcion) {
    formModalInscripcion.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailModal = document.getElementById("modalEmail").value.trim();
      const planActual = planTexto ? planTexto.textContent : "Plan Grado";

      alert(`Postulación confirmada para: ${planActual}.\nEnviaremos el link de pago y coordinación inicial a: ${emailModal}`);
      
      // Cerrar el modal mediante la API de Bootstrap
      const modalElement = document.getElementById("modalInscripcion");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
      formModalInscripcion.reset();
    });
  }
});