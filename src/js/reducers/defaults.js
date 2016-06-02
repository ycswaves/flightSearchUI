import Moment from 'moment'

export const QUERY_STATE = {
  isTwoWayTrip: true,
  depDay: Moment('2016-05-25'),
  retDay: Moment('2016-05-29'),
  from: 'PNQ',
  to: 'DEL'
}

export const PRICE_FILTER = {
  minPrice: 0,
  maxPrice: 0
}

export const SEARCH_RESULT = {
  flights: [], 
  minPrice: 0, 
  maxPrice: 0
}
