import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import flightSearch from './reducers';
import Search from './containers/Search.js';
import Result from './containers/Result.js';
import PriceFilter from './containers/PriceFilter.js';


require('react-datepicker/dist/react-datepicker.css');
require('rc-slider/assets/index.css');
require('../css/main.scss');

let store = createStore(flightSearch);

const app = document.getElementById('app');

class Main extends React.Component {
  
  render() {
    return (
      <Provider store={store}>
        <div class="container">
          <div id="main" class="col-3">
            <Search />
            <PriceFilter />
          </div>
          <div class="col-9">
            <Result />
          </div>
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<Main />, app);