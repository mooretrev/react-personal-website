import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import RecipeForm from '../RecipeForm.jsx';
import RecipeItem from '../../RecipeCreate/RecipeItem/RecipeItem.jsx';
import Ingredient from '../../RecipeCreate/Ingredient/Ingredient.jsx';

describe('<RecipeForm />', () => {
  it('should render correctly', () => {
    const recipeForm = (
      <RecipeForm
        id="-1"
        history={0}
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
  it('should render correctly', () => {
    const recipeForm = (
      <RecipeForm
        id="-1"
        history={0}
        edit={false}
        recipeItems={['Dough', 'Bread']}
        ingredients={[['Flour', 'Yeast'], ['Bread Flour', 'Water', 'Sugar']]}
        sizes={[['1', '2'], ['1', '1', '1']]}
        units={[['Cup', 'Cup'], ['Cup', 'Cup', 'Cup']]}
        recipeName=""
      />
    );
    const wrapper = shallow(recipeForm);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('recipe items should increment on recipe item change', () => {
    const recipeForm = (
      <RecipeForm
        id="-1"
        edit={false}
        recipeItems={['']}
        ingredients={[['']]}
        sizes={[['']]}
        units={[['']]}
        recipeName=""
      />
    );
    const wrapper = mount(recipeForm);
    expect(wrapper.find(RecipeItem)).toHaveLength(1);
    const recipeItemInput = wrapper.find('input').at(1);
    recipeItemInput.simulate('change', { target: { value: 'Hello' } });
    expect(wrapper.find(RecipeItem)).toHaveLength(2);
  });
  it('should add another ingredient when needed', () => {
    const recipeForm = (
      <RecipeForm
        id="-1"
        edit={false}
        recipeItems={['']}
        ingredients={[['']]}
        sizes={[['']]}
        units={[['']]}
        recipeName=""
      />
    );
    const wrapper = mount(recipeForm);
    expect(wrapper.find(Ingredient)).toHaveLength(1);
    const recipeItemInput = wrapper.find('input').at(2);
    recipeItemInput.simulate('change', { target: { value: 'Hello' } });
    expect(wrapper.find(Ingredient)).toHaveLength(2);
  });
});
