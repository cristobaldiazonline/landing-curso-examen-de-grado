/**
 * Módulo de Consumo de API Externa (E2)
 * Consulta el catálogo de OpenLibrary para obtener manuales y obras de Derecho.
 */

// URL de la API pública de OpenLibrary (búsqueda de libros sobre Derecho / Law)
const API_URL = 'https://openlibrary.org/subjects/law.json?limit=6';

/**
 * Sanitiza texto para evitar inyecciones XSS al renderizar data externa.
 * @param {string} str 
 * @returns {string}
 */
export function escapeHTML(str) {
  if (!str) return 'No disponible';
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/**
 * Obtiene libros desde la API pública de OpenLibrary.
 * Maneja estados de respuesta HTTP y errores de red.
 * @returns {Promise<Array>} Lista de obras jurídicas
 */
export async function fetchLibrosJuridicos() {
  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP en la solicitud: ${respuesta.status}`);
    }

    const data = await respuesta.json();
    
    // Retorna el array de obras o un array vacío si no hay resultados
    return data.works || [];
  } catch (error) {
    console.error('Error al consultar OpenLibrary API:', error);
    throw error;
  }
}