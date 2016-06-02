import { connect } from 'react-redux'
import ResultPanel from '../components/ResultPanel.js'
// import DEFAULT_STATE from '../reducers/defaults.js'


const mapStateToProps = (state) => {
  const {searchResult, priceFilter, searchQuery} = state;
  return {
    result: searchResult.flights,
    filter: priceFilter,
    depDay: searchQuery.depDay, 
    retDay: searchQuery.retDay
  }
}

const Result = connect(
  mapStateToProps
)(ResultPanel)

export default Result;