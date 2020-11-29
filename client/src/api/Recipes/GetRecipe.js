import axois from 'axios';

const GetRecipe = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const url = `/api/recipes/${id}`;
  const res = await axois.get(url, config);
  return res.data;
};

export default GetRecipe;
