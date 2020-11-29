import axios from 'axios';

const GetRecipes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios('/api/recipes', config);
  return res.data;
};

export default GetRecipes;
