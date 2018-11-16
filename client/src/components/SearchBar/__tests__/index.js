import React from 'react';
import { shallow } from 'enzyme';

import SearchBar from '../index';

describe('<SearchBar/>', () => {
  it('should load properly', () => {
    const wrapper = shallow(<SearchBar onSubmit={jest.fn()}/>);

    expect(wrapper).toMatchSnapshot();
  });

  // it('should call onSubmit on submit', () => {
  //   const wrapper = mount(<SearchBar onSubmit={jest.fn()}/>);
  // const input = wrapper.find('input');
  // input.simulate('change', { target: { value: 'Hello' } });
  // console.log(wrapper.find('input').value);
  // wrapper.find('.searchbar__field').at(1).props().formik.)
  // console.log(wrapper.find('.searchbar__field').at(1).props().formik);
  // const input = wrapper.find('.searchbar__field').at(1);
  // const form = wrapper.querySelector('searchbar')
  // console.log(input);
  // input.simulate('change', { target: { name: 'search', values: { search: 'abc' } } });
  // console.log(input.props());
  //
  // expect(wrapper).toMatchSnapshot();
//   });
});


// describe('MyForm', () => {
//   test('should update an input when it is changed', () => {
//     const spy = jest.fn();
//     const tree = shallow(<SearchBar onSubmit={spy} />);
//
//     const form = tree.find('.searchbar__field');
//
//     console.log('form');
//     console.log(form);
//     // console.log(form.instance());
//
//     expect(false).toBe(tree.find('.searchbar__submit').find('button').simulate('press'));
//
//     form.simulate('change', {
//       // you must add this next line as (Formik calls e.persist() internally)
//       persist: () => {},
//       // simulate changing e.target.name and e.target.value
//       target: {
//         name: 'search',
//         value: 'ian',
//       },
//     });
//
//     tree.find('.searchbar').simulate('onSubmit', {
//       preventDefault: () => {},
//     });
//
//     expect(false).toBe(spy.mock.calls);
//   });
// });
