import TestUtils from 'react-addons-test-utils';
import searchResult from '../src/js/reducers/search';
import {SEARCH_RESULT} from '../src/js/reducers/defaults.js'

jest.unmock('../src/js/reducers/search');
jest.unmock('moment');
jest.unmock('../flightData.json')

describe('search reducer test', () => {
  it('should be able to return default state', () => {
    const defaultRes = searchResult(undefined, {});
    expect(defaultRes).toBe(SEARCH_RESULT);
  });

  it('should return relevant result', () => {
    const query = {
      from: 'PNQ',
      to: 'DEL', 
      depDay: '25/05/2016', 
      isTwoWayTrip: false
    };
    const res = searchResult(undefined, {type: 'SEARCH_FLIGHT', query: query});
    
    expect(res.flights.length).toBe(4);
  })
});


