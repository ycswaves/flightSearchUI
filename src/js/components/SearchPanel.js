import React from "react";
import DatePicker from "react-datepicker";
import Moment from "moment";
import {data as FlightData} from "../../../flightData.json";

export default class SearchPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      isTwoWayTrip: true,
      depDay: Moment('2016-05-25'),
      retDay: Moment('2016-05-29'),
      from: 'PNQ',
      to: 'DEL'
    };
    this.dateFormat = 'DD/MM/YYYY';
  }

  handleChange(e) {
    const {value, name} = e.target;
    let obj = {};
    obj[name] = value.toUpperCase(); //use the input name as the state key name
    this.setState(obj);
  }

  handleDepDateChange(date) {
    this.setState({depDay: date});
  }

  handleRetDateChange(date) {
    this.setState({retDay: date});
  }

  isOneWay() {
    this.setState({isTwoWayTrip: false});
  }

  isTwoWay() {
    this.setState({isTwoWayTrip: true});
  }

  searchFlight(e) {
    e.preventDefault();
    const ret = this.applyFilter(FlightData);
    let searchDate;
    if (this.state.isTwoWayTrip) {
      searchDate = {
        depDay: this.state.depDay,
        retDay: this.state.retDay
      }
    } else {
      searchDate = {depDay: this.state.depDay}
    }
    this.props.resultHandler(ret, searchDate);
  }

  getTwoWayFlight(data) {
    let res = []
      , depFlights = []
      , retFlights = []
      , minPrice = Number.POSITIVE_INFINITY
      , maxPrice = 0;

    const {from, to, depDay, retDay} = this.state;
    const depDayFmt = Moment(depDay).format(this.dateFormat);
    const retDayFmt = Moment(retDay).format(this.dateFormat);

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

  getOneWayFlight(data) {
    const {from, to, depDay} = this.state;
    const depDayFmt = Moment(depDay).format(this.dateFormat);

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

  applyFilter(data) {    
    return (this.state.isTwoWayTrip)? this.getTwoWayFlight(data) : this.getOneWayFlight(data);         
  }

  render() {
    const {from, to, depDay, retDay, passengerCount, isTwoWayTrip} = this.state;
    let oneWayActiveClass, twoWayActiveClass, returnDateClass = '';

    if (isTwoWayTrip) {
      oneWayActiveClass = '';
      twoWayActiveClass = 'active';
    } else {
      twoWayActiveClass = '';
      oneWayActiveClass = 'active'; 
      returnDateClass = 'hidden';
    }

    const maxPassenger = 9;
    let passengerCountOpts = [];
    for (let i = 1; i <= maxPassenger; i++) {
      passengerCountOpts.push(<option key={i} value={i}>{i}</option>)
    }

    return (
      <form>
        <div id="searchTab">
          <span onClick={this.isOneWay.bind(this)} class={oneWayActiveClass}>One Way</span>
          <span onClick={this.isTwoWay.bind(this)} class={twoWayActiveClass}>Return</span>
        </div>
        <div id="searchForm" class="panel">
          <label>From
            <input name="from" value={from} onChange={this.handleChange.bind(this)}
             type="text"/>
          </label>

          <label>Destination
            <input name="to" value={to} onChange={this.handleChange.bind(this)}
             type="text"/>
          </label>

          <label>Departure Date
            <DatePicker selected={depDay} dateFormat={this.dateFormat} class="calendar" onChange={this.handleDepDateChange.bind(this)}/>
          </label>

          <label class={returnDateClass}>Return Date
            <DatePicker selected={retDay} dateFormat={this.dateFormat} class="calendar" onChange={this.handleRetDateChange.bind(this)}/>
          </label>

          <label>Passengers
            <select name="passengerCount">
              {passengerCountOpts}
            </select>
          </label>

          <button id="searchBtn" class="btn primary" onClick={this.searchFlight.bind(this)}>Search</button>
        </div>

        
      </form>
    )
  }
}