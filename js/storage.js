/**
 * Módulo de Persistencia con LocalStorage (E4)
 * Gestiona el almacenamiento de obras jurídicas guardadas por el estudiante.
 */

const STORAGE_KEY = 'distincion_maxima_favoritos';

/**
 * Obtiene la lista de IDs de libros guardados en localStorage.
 * @returns {Array<string>} Array de claves/IDs
 */
export function obtenerFavoritos() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al leer de localStorage:', error);
    return [];
  }
}

/**
 * Agrega o elimina un libro de la lista de favoritos y persiste el cambio.
 * @param {string} libroKey - Identificador único de la obra
 * @returns {boolean} true si fue agregado, false si fue removido
 */
export function alternarFavorito(libroKey) {
  try {
    let favoritos = obtenerFavoritos();
    let agregado = false;

    if (favoritos.includes(libroKey)) {
      favoritos = favoritos.filter((key) => key !== libroKey);
      agregado = false;
    } else {
      favoritos.push(libroKey);
      agregado = true;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos));
    return agregado;
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
    return false;
  }
}

/**
 * Comprueba si un libro específico está marcado como favorito.
 * @param {string} libroKey 
 * @returns {boolean}
 */
export function esFavorito(libroKey) {
  const favoritos = obtenerFavoritos();
  return favoritos.includes(libroKey);
}