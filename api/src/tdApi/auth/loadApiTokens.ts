import path from 'path';
import { APITokens } from './APITokens';
const decrypt = require('encrypt_strings').decrypt

export default async function loadApiTokens(): Promise<APITokens> {
  const data = await decrypt(path.join(__dirname, '../tokens/data.json.enc'), process.env.TD_API_PASSCODE)
  return JSON.parse(data);
}