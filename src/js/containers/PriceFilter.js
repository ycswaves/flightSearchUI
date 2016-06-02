import { connect } from 'react-redux'
import { applyPriceFilter } from '../actions'
import PriceSlider from '../components/PriceSlider.js'
import DEFAULT_STATE from '../reducers/defaults.js'

const mapStateToProps = (state) => {
  console.log(state)
  return {
    min: state.searchResult.minPrice,
    max: state.searchResult.maxPrice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSlide: (filter) => {
      dispatch(applyPriceFilter(filter))
    }
  }
}

const PriceFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceSlider)

export default PriceFilter;