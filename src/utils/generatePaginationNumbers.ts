

export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {

  // Si el numero total de paginas es 7 o menos
  // mostramos todas las páginas sin puntos

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // Si la página actual esta entre las primeras tres paginas
  // mostrar las primeras 3, puntos suspensivos y las ultimas 2

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // Si la pagina actual esta entre las ultimas 3 páginas
  // mostramos las primeras 2, puntos y luego las ultimas 3 páginas

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }


  // Si la página actual esta en otro lugar medio 
  // mostramos la primera página puntos suspensivos, pagina actual y siguentes

  return [
    1, '...', currentPage - 1, currentPage - 1, currentPage, currentPage + 1, '...', totalPages
  ]

}