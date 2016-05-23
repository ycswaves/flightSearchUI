import React from "react";

export default class FlightColumn extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {flightNo, from, to, depart, arrive} = this.props.infoObj;
    const colSpan = this.props.colSpan;
    return (
      <div class={"flight col-"+colSpan}>
        <span class="label flightNo">{flightNo}</span>
        <span class="label route">
          {from} 
          <i class="fa fa-plane to small" aria-hidden="true"></i>
          {to}
         </span>
        <span class="label clock" title="Depart">{depart}</span>
        <span class="label clock" title="Arrive">{arrive}</span>
      </div>
    );
  }
}