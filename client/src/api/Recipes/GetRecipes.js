import axios from 'axios';

const GetRecipes = async () => {
  const res = await axios('/api/recipes');
  return res.data;
};

export default GetRecipes;
