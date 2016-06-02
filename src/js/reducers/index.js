import searchResult from './search'
import {combineReducers} from 'redux'
import {PRICE_FILTER, QUERY_STATE} from './defaults.js'


const priceFilter = (state = {}, action) => {
  switch (action.type) {
    case 'FILTER_PRICE':
      return Object.assign({}, state, action.filter)

    default:
      return state
  }
}

const searchQuery = (state = QUERY_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_QUERY':
      let querySegment = action.inputObj;
      return Object.assign({}, state, querySegment);

    default:
      return state  
  }
}

const flightSearch = combineReducers({
  searchResult,
  priceFilter,
  searchQuery
})

export default flightSearch;
