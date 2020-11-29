import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RecipeForm from '../RecipeForm.jsx';

describe('<RecipeForm />', () => {
  it('should render correctly', () => {
    const recipeForm = (
      <RecipeForm
        edit={false}
        recipeItems={['']}
        ingredients={[['']]}
        sizes={[['']]}
        units={[['']]}
        recipeName=""
      />
    );
    const wrapper = shallow(recipeForm);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  // it('should react to states correctly', () =>{
  //   const recipeForm = (
  //     <RecipeForm
  //       edit={false}
  //       recipeItems={['']}
  //       ingredients={[['']]}
  //       sizes={[['']]}
  //       units={[['']]}
  //       recipeName={'Temp'}
  //     />
  //   );
  //   const wrapper = mount(recipeForm);
  //   expect(wrapper.contains('Temp')).toBe(true);

  // })
});
