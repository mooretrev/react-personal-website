import axios from 'axios';

const DeleteRecipe = async (recipeId) => {
  await axios.delete(`api/recipes/${recipeId}`);
};

export default DeleteRecipe;
