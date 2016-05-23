import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Moment from "moment";
import ResultPanel from '../src/js/components/ResultPanel.js';
jest.unmock('../src/js/components/ResultPanel.js');
jest.unmock('moment');


describe('ResultPanel Test', () => {
  let panel;

  it('should display result correctly', () => {
    const result = [
      {
        "img": "./assets/placeholder.png",
        "flightNo": "AI-202",
        "date": "25/05/2016",
        "from": "PNQ",
        "to": "DEL",
        "depart": "10:00 AM",
        "arrive": "12:00 PM",
        "price": "125.00"
      }
    ];

    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ResultPanel result={result} filter={{minPrice: 0, maxPrice: 126}} 
                       depDay="2016-05-25" />);
    const component = shallowRenderer.getRenderOutput();
    expect(component.props.children.length).toBe(2);

    const innerDiv = component.props.children[1].props.children[0];
    expect(innerDiv.props.children.length).toBe(3);

    const priceCol = innerDiv.props.children[2];
    expect(priceCol.props.children[1]).toBe('125');

  });
});