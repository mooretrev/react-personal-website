import path from 'path';

// eslint-disable-next-line
const decryptPromise = require('encrypt_strings').decrypt;

export default async function getAccountsJSON(): Promise<{[name:string]: number}> {
  const accounts = await decryptPromise(path.join(__dirname, '../tokens/accounts.json.enc'), process.env.TD_API_PASSCODE);
  return JSON.parse(accounts);
}
