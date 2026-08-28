/**
 * Módulo de Consumo de API Externa (E2)
 * Consulta el catálogo de OpenLibrary para obtener manuales y obras de Derecho en español.
 */

// URL de la API de OpenLibrary filtrando por temática jurídica en idioma español
const API_URL = 'https://openlibrary.org/search.json?q=derecho+civil+procesal&language=spa&limit=6';

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
 * Obtiene libros jurídicos en español desde OpenLibrary.
 * @returns {Promise<Array>} Lista de obras
 */
export async function fetchLibrosJuridicos() {
  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP en la solicitud: ${respuesta.status}`);
    }

    const data = await respuesta.json();
    
    // Mapea la estructura del endpoint search.json
    const docs = data.docs || [];
    return docs.map((doc) => ({
      key: doc.key,
      title: doc.title,
      authors: (doc.author_name || []).map((name) => ({ name })),
      first_publish_year: doc.first_publish_year
    }));
  } catch (error) {
    console.error('Error al consultar OpenLibrary API:', error);
    throw error;
  }
}