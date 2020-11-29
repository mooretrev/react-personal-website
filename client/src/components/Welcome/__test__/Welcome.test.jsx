import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import toJson from 'enzyme-to-json';
import Welcome from '../Welcome.jsx';

describe('<Welcome />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Welcome />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have the about me header', () => {
    const wrapper = shallow(<Welcome />);
    const header = (
      <Typography id="header" gutterBottom variant="h5" component="h2">
        About Me
      </Typography>
    );
    expect(wrapper.contains(header)).toBe(true);
  });
});
