import React from "react";
import Moment from "moment";
import FlightColumn from "./FlightColumn.js";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class ResultPanel extends React.Component {
  constructor() {
    super();
  }

  formatPrice(price) {
    let priceCompound = price.toFixed(2).split('.')
      , pWhole = priceCompound[0]
      , pDec = priceCompound[1];
      return {pWhole, pDec};
  }

  render() {
    let {result, filter, depDay, retDay} = this.props;
    let cards, searchDate, isTwoWay = false;
    depDay = Moment(depDay).format('Do MMMM YYYY');

    if (result.length > 0 && result[0].returnFlight !== undefined) {
      isTwoWay = true;
      retDay = Moment(retDay).format('Do MMMM YYYY');
      searchDate = (
        <div class="small pull-right">
          Depart:  {depDay}<br />
          Return:  {retDay}
        </div>
      );
    } else {
      searchDate = (
        <div class="small pull-right">
          Depart: {depDay}<br />
        </div>
      )
    }

    console.log(filter);

    if(filter.minPrice !== undefined) {
      result = result.filter((obj) => { // filter out non-qualified flights
        let price;
        if (obj['returnFlight'] !== undefined) {
          price = parseFloat(obj.returnFlight.price) + parseFloat(obj.departFlight.price);
        } else {
          price = parseFloat(obj.price);
        }
        return (price >= filter.minPrice && price <= filter.maxPrice);
      });
    }

    if (result.length <= 0) {
      cards = <div class="card container" style={{padding: '20px'}}>No result found</div>
    } else {      
      cards = result.map((obj, i) => {
        if (isTwoWay) {
          let totalPrice = parseFloat(obj.departFlight.price) + parseFloat(obj.returnFlight.price);
          const colSpan = 3
              , {pWhole, pDec} = this.formatPrice(totalPrice);
          return (
            <div class="card container" key={i}>
              <div class={"cover col-"+colSpan} style={{backgroundImage: "url("+obj.returnFlight.img+")"}}></div>
              <FlightColumn infoObj={obj.departFlight} colSpan={colSpan} />
              <FlightColumn infoObj={obj.returnFlight} colSpan={colSpan} />
              <div class={"price col-"+colSpan}>
                <i class="fa fa-gbp small" aria-hidden="true"></i>
                {pWhole}<span class="small">.{pDec}</span>
                <br />
                <button class="btn primary select">Select</button>
              </div>
            </div>
          );
        } else {
          const colSpan = 4
              , {pWhole, pDec} = this.formatPrice(parseFloat(obj.price));
          return (
            <div class="card container" key={i}>
              <div class={"cover col-"+colSpan} style={{backgroundImage: "url("+obj.img+")"}}></div>
              <FlightColumn infoObj={obj} colSpan={colSpan} />
              <div class={"price col-"+colSpan}>
                <i class="fa fa-gbp small" aria-hidden="true"></i>
                {pWhole}<span class="small">.{pDec}</span>
                <br />
                <button class="btn primary select">Select</button>
              </div>
            </div>
          );
        }        
      });
    }
  
    return (
      <div id="resultPanel">
        <h2 class="card">Your Results {searchDate}</h2>
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {cards}
        </ReactCSSTransitionGroup>  
      </div>
    )
  }
}