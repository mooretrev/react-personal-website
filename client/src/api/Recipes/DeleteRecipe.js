import axios from 'axios';

const DeleteRecipe = async (token, recipeId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(`api/recipes/${recipeId}`, config);
};

export default DeleteRecipe;
