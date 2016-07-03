import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import SearchPanel from '../src/js/components/SearchPanel.js';
import Moment from "moment";
jest.unmock('../src/js/components/SearchPanel.js');
jest.unmock('moment');

describe('SearchPanel Test', () => {
  let panel, resHandle;


  it('should exist', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<SearchPanel from='a' to='b' depDay='25/05/2016'
     passengerCount={1} isTwoWayTrip={true} onInputChange={resHandle} onSearch={resHandle} />);

    const component = shallowRenderer.getRenderOutput();
    console.log(component);
    //expect(TestUtils.isCompositeComponent(panel)).toBe(true);
  });

  // it('should able to toggle b/t one-way and round-trip', () => {
  //   const toggleTabs = TestUtils.scryRenderedDOMComponentsWithTag(panel, 'span');
  //   expect(toggleTabs.length).toBe(2);

  //   const oneWayTab = toggleTabs[0]
  //       , twoWayTab = toggleTabs[1];

  //   TestUtils.Simulate.click(oneWayTab);
  //   expect(panel.props.isTwoWayTrip).toBe(false);

  //   TestUtils.Simulate.click(twoWayTab);
  //   expect(panel.props.isTwoWayTrip).toBe(true);
  // });

  // it('should able to search', () => {
  //   const submit = TestUtils.scryRenderedDOMComponentsWithTag(panel, 'button');
  //   TestUtils.Simulate.click(submit[0]);
  //   expect(resHandle).toBeCalled();
  // });

});