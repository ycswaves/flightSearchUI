import React from "react";
import DatePicker from "react-datepicker";

export default class SearchPanel extends React.Component {

  handleChange(e) {
    const {value, name} = e.target;
    let obj = {};
    obj[name] = value.toUpperCase(); //use the input name as the state key name
    this.props.onInputChange(obj);
  }

  handleDepDateChange(date) {
    this.props.onInputChange({depDay: date});
  }

  handleRetDateChange(date) {
    this.props.onInputChange({retDay: date});
  }

  isOneWay() {
    this.props.onInputChange({isTwoWayTrip: false});
  }

  isTwoWay() {
    this.props.onInputChange({isTwoWayTrip: true});
  }

  searchFlight(e) {
    e.preventDefault();
    this.props.onSearch(this.props);
  }

  render() {
    const {from, to, depDay, retDay, passengerCount, isTwoWayTrip} = this.props;
    const dateFormat = 'DD/MM/YYYY';
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
            <DatePicker selected={depDay} dateFormat={dateFormat} class="calendar" onChange={this.handleDepDateChange.bind(this)}/>
          </label>

          <label class={returnDateClass}>Return Date
            <DatePicker selected={retDay} dateFormat={dateFormat} class="calendar" onChange={this.handleRetDateChange.bind(this)}/>
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