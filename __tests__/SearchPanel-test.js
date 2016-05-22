jest.unmock('../src/js/components/SearchPanel.js');
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import SearchPanel from '../src/js/components/SearchPanel.js';
import {data as FlightData} from "../flightData.json";
import Moment from "moment";

describe('SearchPanel Test', () => {
  let panel, panelDOM;

  beforeEach(() => {
    panel = TestUtils.renderIntoDocument(<SearchPanel />);
  });

  it('should exist', () => {
    expect(TestUtils.isCompositeComponent(panel)).toBe(true);    
  });

  it('should able to toggle b/t one-way and round-trip', () => {
    const toggleTabs = TestUtils.scryRenderedDOMComponentsWithTag(panel, 'span');
    expect(toggleTabs.length).toBe(2);

    const oneWayTab = toggleTabs[0]
        , twoWayTab = toggleTabs[1];

    TestUtils.Simulate.click(oneWayTab);
    expect(panel.state.isTwoWayTrip).toBe(false);

    TestUtils.Simulate.click(twoWayTab);
    expect(panel.state.isTwoWayTrip).toBe(true);
  });

});