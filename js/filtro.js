/**
 * Módulo de Filtro y Búsqueda Dinámica (E3)
 * Filtra colecciones de datos en memoria en tiempo real sin recargar la página.
 */

/**
 * Filtra un array de obras jurídicas según el término de búsqueda.
 * @param {Array} libros - Lista completa de libros
 * @param {string} termino - Texto ingresado por el usuario
 * @returns {Array} Libros que coinciden con el título o autores
 */
export function filtrarLibros(libros, termino) {
  if (!termino || termino.trim() === '') {
    return libros;
  }

  const query = termino.trim().toLowerCase();

  return libros.filter((libro) => {
    const titulo = (libro.title || '').toLowerCase();
    const autores = (libro.authors || [])
      .map((a) => (a.name || '').toLowerCase())
      .join(' ');

    return titulo.includes(query) || autores.includes(query);
  });
}