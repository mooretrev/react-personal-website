import axios from 'axios';

export default async function isAuthenticated() {
  try {
    await axios.get('/api/auth/authenicated');
    return true;
  } catch (err) {
    return false;
  }
}
