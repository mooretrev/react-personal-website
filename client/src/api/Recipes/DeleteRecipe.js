import axios from 'axios';

const DeleteRecipe = async (token, recipeId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/recipes/${recipeId}`, config);
};

export default DeleteRecipe;
