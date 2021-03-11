import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactRouter from 'react-router-dom';
import NavBar from '../NavBar.jsx';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/example/path',
  }),
}));

describe('<NavBar />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<NavBar authenicated={false} setAuthenicated={jest.fn()} window={0} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
