import { TDAuthTokenModal } from '../../model/TDAuthToken';

export default function isRefreshTokenNeeded(tokens: TDAuthTokenModal) {
  const currentTime = Math.floor(new Date().getTime() / 1000);
  const timeDiff = currentTime - tokens.refresh_time_stamp;
  return timeDiff > 3888000; // 45 days
}
