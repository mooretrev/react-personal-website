import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MealPlanForm from '../MealPlanForm.jsx';

describe('<MealPlanForm />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<MealPlanForm numDays={1} offset={0} startDay="Sunday" inputRecipes={[[]]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
