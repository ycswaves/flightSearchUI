import React from "react";
import ReactDOM from "react-dom";
import SearchPanel from "./components/SearchPanel.js";
import ResultPanel from "./components/ResultPanel.js";
import PriceSlider from "./components/PriceSlider.js";


require('react-datepicker/dist/react-datepicker.css');
require('rc-slider/assets/index.css');
require('../css/main.scss');


const app = document.getElementById('app');

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      result: [],
      minPrice: 0,
      maxPrice: 0
    };
  }

  updateResult(ret, dates) {
    this.setState({
      result: ret.flights,
      //for setting default price range based
      minPrice: ret.minPrice,
      maxPrice: ret.maxPrice,
      //for notifying result panel
      filterMin: ret.minPrice, 
      filterMax: ret.maxPrice,

      depDay: dates.depDay,
      retDay: dates.retDay
    });
  }

  refinePrice(min, max) {
    this.setState({
      filterMin: min, 
      filterMax: max
    });
  }
  
  render() {
    const {result, filterMin, filterMax, depDay, retDay, maxPrice, minPrice} = this.state;
    return (
      <div class="container">
        <div id="main" class="col-3">
          <SearchPanel resultHandler={this.updateResult.bind(this)} />
          <PriceSlider max={maxPrice} min={minPrice} priceRangeHandler={this.refinePrice.bind(this)}/>

        </div>
        <div class="col-9">
          <ResultPanel result={result} filter={{minPrice: filterMin, maxPrice: filterMax}} 
                       depDay={depDay} retDay={retDay}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Main />, app);