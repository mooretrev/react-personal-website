import path from 'path';

const decryptPromise = require('encrypt_strings').decrypt;

export default async function getAccountsJSON() {
  const accounts = await decryptPromise(path.join(__dirname, '../tokens/accounts.json.enc'), process.env.TD_API_PASSCODE);
  return JSON.parse(accounts);
}
