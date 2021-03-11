import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import RecipeForm from '../RecipeForm.jsx';
import RecipeItem from '../../RecipeCreate/RecipeItem/RecipeItem.jsx';
import Ingredient from '../../RecipeCreate/Ingredient/Ingredient.jsx';
import CreateRecipe from '../../../api/Recipes/CreateRecipe.js';

jest.mock('../../../api/Recipes/CreateRecipe.js');

const inputDataIntoForm = (wrapper) => {
  // recipe name
  let recipeNameComp = wrapper.find('#recipe_name input');
  recipeNameComp.simulate('change', { target: { value: 'Custer' } });
  recipeNameComp = wrapper.find('#recipe_name input');
  expect(recipeNameComp.props().value).toBe('Custer');

  let recipeItemComp = wrapper.find('#recipe_item_0 input');
  recipeItemComp.simulate('change', { target: { value: 'Sugary Bit' } });
  recipeItemComp = wrapper.find('#recipe_item_0 input');
  expect(recipeItemComp.props().value).toBe('Sugary Bit');

  let ingredientComp = wrapper.find('#ingredient_0_0 input');
  ingredientComp.simulate('change', { target: { value: 'Sugar' } });
  ingredientComp = wrapper.find('#ingredient_0_0 input');
  expect(ingredientComp.props().value).toBe('Sugar');

  let sizeComp = wrapper.find('#size_0_0 input');
  sizeComp.simulate('change', { target: { value: '1' } });
  sizeComp = wrapper.find('#size_0_0 input');
  expect(sizeComp.props().value).toBe('1');

  let unitComp = wrapper.find('#unit_0_0 input');
  unitComp.simulate('change', { target: { value: 'Cup' } });
  unitComp = wrapper.find('#unit_0_0 input');
  expect(unitComp.props().value).toBe('Cup');

  ingredientComp = wrapper.find('#ingredient_0_1 input');
  ingredientComp.simulate('change', { target: { value: 'Salt' } });
  ingredientComp = wrapper.find('#ingredient_0_1 input');
  expect(ingredientComp.props().value).toBe('Salt');

  sizeComp = wrapper.find('#size_0_1 input');
  sizeComp.simulate('change', { target: { value: '2' } });
  sizeComp = wrapper.find('#size_0_1 input');
  expect(sizeComp.props().value).toBe('2');

  unitComp = wrapper.find('#unit_0_1 input');
  unitComp.simulate('change', { target: { value: 'Tbsp' } });
  unitComp = wrapper.find('#unit_0_1 input');
  expect(unitComp.props().value).toBe('Tbsp');

  recipeItemComp = wrapper.find('#recipe_item_1 input');
  recipeItemComp.simulate('change', { target: { value: 'Creamy Bit' } });
  recipeItemComp = wrapper.find('#recipe_item_1 input');
  expect(recipeItemComp.props().value).toBe('Creamy Bit');

  ingredientComp = wrapper.find('#ingredient_1_0 input');
  ingredientComp.simulate('change', { target: { value: 'Cream' } });
  ingredientComp = wrapper.find('#ingredient_1_0 input');
  expect(ingredientComp.props().value).toBe('Cream');

  sizeComp = wrapper.find('#size_1_0 input');
  sizeComp.simulate('change', { target: { value: '3' } });
  sizeComp = wrapper.find('#size_1_0 input');
  expect(sizeComp.props().value).toBe('3');

  unitComp = wrapper.find('#unit_1_0 input');
  unitComp.simulate('change', { target: { value: 'Tsp' } });
  unitComp = wrapper.find('#unit_1_0 input');
  expect(unitComp.props().value).toBe('Tsp');
};

const sumbitForm = (wrapper) => {
  const sumbitButton = wrapper.find('#submit_btn button');
  expect(sumbitButton).toHaveLength(1);
  sumbitButton.simulate('click');
};

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
  it('should be able to take input and submit that input', async () => {
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
    const mockApiCreate = jest.fn(() => { Promise.resolve(0); });
    CreateRecipe.mockImplementation(mockApiCreate);
    const wrapper = mount(recipeForm);

    inputDataIntoForm(wrapper);
    sumbitForm(wrapper);

    await act(
      () => new Promise((resolve) => {
        setImmediate(() => {
          wrapper.update();
          resolve();
        });
      }),
    );

    expect(await mockApiCreate).toHaveBeenCalled();
    const recipeNameComp = wrapper.find('#recipe_name input');
    expect(recipeNameComp.props().value).toBe('');
    const recipeItemComp = wrapper.find('#recipe_item_0 input');
    expect(recipeItemComp.props().value).toBe('');
  });
  it('should duplicate recipes correctly', () => {
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
  it('should dupilcate recipe item', () => {
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
    const duplicateButton = wrapper.find('#dup_button_0 button');
    expect(duplicateButton).toHaveLength(1);
    duplicateButton.simulate('click');
    expect(wrapper.find(RecipeItem)).toHaveLength(3);
    const recipeItem1Input = wrapper.find(RecipeItem).at(0).find('input');
    const recipeItem2Input = wrapper.find(RecipeItem).at(1).find('input');
    const recipeItem3Input = wrapper.find(RecipeItem).at(2).find('input');
    expect(recipeItem1Input.props().value).toEqual('Hello');
    expect(recipeItem2Input.props().value).toEqual('Hello');
    expect(recipeItem3Input.props().value).toEqual('');
  });
});
