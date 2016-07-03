import Moment from 'moment'
import {data as FlightData} from '../../../flightData.json'
import {SEARCH_RESULT} from './defaults.js'

const DATE_FORMAT = 'DD/MM/YYYY'

const searchResult = (state = SEARCH_RESULT, action) => {
  switch (action.type) {
    case 'SEARCH_FLIGHT':
      const searchResult = getSearchResult(action.query);
      return Object.assign({}, state, searchResult);

    default:
      return state  
  }
}

const getSearchResult = (query) => {
  return (query.isTwoWayTrip)? getTwoWayFlight(FlightData, query) : getOneWayFlight(FlightData, query); 
}

const getOneWayFlight = (data, query) => {
  const {from, to, depDay} = query;
  const depDayFmt = Moment(depDay, DATE_FORMAT).format(DATE_FORMAT);

  let res = []
    , minPrice = 0
    , maxPrice = 0;

  res = data.filter((obj) => {
    return (obj.from === from && obj.to === to && obj.date === depDayFmt);
  });

  //get max/min price among results
  res.forEach((o) => {
    let price = parseFloat(o.price);
    if (price < minPrice) {minPrice = price}
    if (price > maxPrice) {maxPrice = price}
  });

  return {flights:res, minPrice, maxPrice};
}

const getTwoWayFlight = (data, query) => {
  let res = []
    , depFlights = []
    , retFlights = []
    , minPrice = Number.POSITIVE_INFINITY
    , maxPrice = 0;

  const {from, to, depDay, retDay} = query;
  const depDayFmt = Moment(depDay, DATE_FORMAT).format(DATE_FORMAT);
  const retDayFmt = Moment(retDay, DATE_FORMAT).format(DATE_FORMAT);

  data.forEach((obj) => {
    if (obj.from === from && obj.to === to && obj.date === depDayFmt) {
      depFlights.push(obj);
    }

    if (obj.from === to && obj.to === from && obj.date === retDayFmt) {
      retFlights.push(obj);
    }        
  });

  // match depart and return flight if there's any
  for (let i = 0; i < depFlights.length; i++) {
    for (let j = 0; j < retFlights.length; j++) {
      res.push({
        departFlight: depFlights[i],
        returnFlight: retFlights[j]
      });

      //get max/min price among results
      let totalPrice = parseFloat(depFlights[i].price) + parseFloat(retFlights[j].price);
      if (totalPrice < minPrice) {minPrice = totalPrice}
      if (totalPrice > maxPrice) {maxPrice = totalPrice}
    }
  }
  return {flights:res, minPrice, maxPrice};
} 

export default searchResult;
