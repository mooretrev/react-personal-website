import axios from 'axios';

const GetRecipes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios(`${process.env.REACT_APP_BASE_URL}/api/recipes`, config);
  return res.data;
};

export default GetRecipes;
