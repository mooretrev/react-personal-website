import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import DayCard from '../DayCard.jsx';

describe('<DayCard />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<DayCard
      key="key"
      day="Monday"
      index={0}
      onRecipeInput={jest.fn()}
      onRecipeDeletion={jest.fn()}
      dataRecipes={[]}
      recipes={[]}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
