import { connect } from 'react-redux'
import { searchFlight, updateQuery } from '../actions'
import SearchPanel from '../components/SearchPanel.js';
import {QUERY_STATE} from '../reducers/defaults.js'

const mapStateToProps = (state) => {
  return state.searchQuery
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (query) => {
      dispatch(searchFlight(query))
    },

    onInputChange: (inputObj) => {
      dispatch(updateQuery(inputObj))
    }
  }
}

const Search = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPanel)

export default Search;