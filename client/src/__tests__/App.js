import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import App from '../App';

// Mock the store. Should only be necessary for this component.
// See this guide for more info. https://hackernoon.com/unit-testing-redux-connected-components-692fa3c4441c
const initialState = {};
const mockStore = configureMockStore();

describe('<App/>', () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should load properly', () => {
    const wrapper = shallow(<App store={store}/>);

    expect(wrapper).toMatchSnapshot();
  });
});
