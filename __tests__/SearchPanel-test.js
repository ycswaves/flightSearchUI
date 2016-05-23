import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import SearchPanel from '../src/js/components/SearchPanel.js';
import Moment from "moment";
jest.unmock('../src/js/components/SearchPanel.js');
jest.unmock('moment');

describe('SearchPanel Test', () => {
  let panel, resHandle;

  beforeEach(() => {
    resHandle = jest.genMockFunction();
    panel = TestUtils.renderIntoDocument(<SearchPanel resultHandler={resHandle}/>);
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

  it('should able to search', () => {
    const submit = TestUtils.scryRenderedDOMComponentsWithTag(panel, 'button');
    TestUtils.Simulate.click(submit[0]);
    expect(resHandle).toBeCalled();
  });

});