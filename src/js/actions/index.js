export const searchFlight = (query) => {
  return {
    type: 'SEARCH_FLIGHT',
    query
  }
}

export const applyPriceFilter = (filter) => {
  return {
    type: 'FILTER_PRICE',
    filter
  }
}

// export const toggleTrip = (isTwoWayTrip) => {
//   return {
//     type: 'TOGGLE_TRIP'
//   }
// }

export const updateQuery = (inputObj) => {
  return {
    type: 'UPDATE_QUERY',
    inputObj
  }
}