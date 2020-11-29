import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NavBar from '../NavBar.jsx';

describe('<NavBar />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<NavBar window={0} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
