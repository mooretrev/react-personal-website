import React from 'react';
import { shallow } from 'enzyme';
import InputController from '../InputController.jsx';

describe('<InputController />', () => {
  it('should have the correct recipes in the input', () => {
    const handleRecipeChange = jest.fn();
    const recipes = ['Hot Chocolate', 'Recipe'];
    const wrapper = shallow(
      <InputController handleRecipeChange={handleRecipeChange} recipes={recipes} />,
    );
    const recipeInput = wrapper.find('#recipeInput');
    expect(recipeInput).toHaveLength(1);
    expect(recipeInput.props().options).toEqual(recipes);
  });
});
