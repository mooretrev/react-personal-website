import axois from 'axios';

const GetRecipe = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const url = `${process.env.REACT_APP_BASE_URL}/api/recipes/${id}`;
  const res = await axois.get(url, config);
  return res.data;
};

export default GetRecipe;
