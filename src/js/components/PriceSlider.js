import React from "react";
import Rcslider from "rc-slider";

export default class priceSlider extends React.Component {
  constructor(props) {
    super();
    this.state = {
      max: props.max,
      min: props.min
    };
  }

  filterPrice(rangeArr) {
    this.props.onSlide({
      minPrice: rangeArr[0], 
      maxPrice: rangeArr[1]
    });

    this.setState({
      min: rangeArr[0],
      max: rangeArr[1]
    })
  }

  render() {
    const {min, max} = this.props;
    return (
      <div id="priceFilter" class="panel">
        <label>Refine Flight Search</label>
          <Rcslider range min={min} max={max} defaultValue={[min, max]} onAfterChange={this.filterPrice.bind(this)} />
          <div class="clearfix">
            <span class="pull-left"><i class="fa fa-gbp" aria-hidden="true"></i>{this.state.min}</span>
            <span class="pull-right"><i class="fa fa-gbp" aria-hidden="true"></i>{this.state.max}</span>
          </div>
      </div>
    )
  }
 }