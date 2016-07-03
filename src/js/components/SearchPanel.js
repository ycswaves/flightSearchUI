import React from "react";
import DatePicker from "react-datepicker";

const SearchPanel = ({from, to, depDay, retDay, passengerCount, isTwoWayTrip, onInputChange, onSearch}) => {

  const handleChange = (e) => {
    const {value, name} = e.target;
    let obj = {};
    obj[name] = value.toUpperCase(); //use the input name as the state key name
    onInputChange(obj);
  }

  const handleDepDateChange = (date) => {
    onInputChange({depDay: date});
  }

  const handleRetDateChange = (date) => {
    onInputChange({retDay: date});
  }

  // const isOneWay = () => {
  //   onInputChange({isTwoWayTrip: false});
  // }

  // const isTwoWay() {
  //   onInputChange({isTwoWayTrip: true});
  // }

  const setIsTwoWay = (isTwoWayTrip) => {
    console.log(isTwoWayTrip);
    onInputChange({isTwoWayTrip});
  }

  const searchFlight = (e) => {
    e.preventDefault();
    onSearch({from, to, depDay, retDay, passengerCount, isTwoWayTrip});
  }

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
        <span onClick={ () => setIsTwoWay(false) } class={oneWayActiveClass}>One Way</span>
        <span onClick={ () => setIsTwoWay(true) } class={twoWayActiveClass}>Return</span>
      </div>
      <div id="searchForm" class="panel">
        <label>From
          <input name="from" value={from} onChange={(e)=>handleChange(e)}
           type="text"/>
        </label>

        <label>Destination
          <input name="to" value={to} onChange={(e)=>handleChange(e)}
           type="text"/>
        </label>

        <label>Departure Date
          <DatePicker selected={depDay} dateFormat={dateFormat} class="calendar" onChange={(date)=>handleDepDateChange(date)}/>
        </label>

        <label class={returnDateClass}>Return Date
          <DatePicker selected={retDay} dateFormat={dateFormat} class="calendar" onChange={(date)=>handleRetDateChange(date)}/>
        </label>

        <label>Passengers
          <select name="passengerCount">
            {passengerCountOpts}
          </select>
        </label>

        <button id="searchBtn" class="btn primary" onClick={(e)=>searchFlight(e)}>Search</button>
      </div>

      
    </form>
  )
  
}

export default SearchPanel;