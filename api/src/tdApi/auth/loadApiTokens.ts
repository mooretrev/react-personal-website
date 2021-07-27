import StringCrypto from 'string-crypto';
import TDAuthToken, { TDAuthTokenInterface as APITokens } from '../../model/TDAuthToken';

const {
  decryptString,
} = new StringCrypto()

export default async function loadApiTokens(): Promise<APITokens> {
  const tokens = await TDAuthToken.findOne({})
  tokens.access_token = decryptString(tokens.access_token, process.env.TD_API_PASSCODE)
  tokens.refresh_token = decryptString(tokens.refresh_token, process.env.TD_API_PASSCODE)
  return tokens;
}