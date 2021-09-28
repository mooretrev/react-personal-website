import Recipe from '../recipe';

describe('Recipe Validation', () => {
  it('should need recipe name', async () => {
    await Recipe.validate({ recipe_name: 'cake' });
    expect(Recipe.validate({})).rejects.toThrow();
  });
});
