import axios, { AxiosResponse } from 'axios';
import createHeadersPromise from '../auth/headers';

export default async function getTransactionHistoryFull(account: number):
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Promise<AxiosResponse<Record<string, any>[]>> {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 300);
  const endDateString = today.toISOString().split('T')[0];
  const startDateString = startDate.toISOString().split('T')[0];
  const url = `https://api.tdameritrade.com/v1/accounts/${account}/transactions?type=TRADE&startDate=${startDateString}&endDate=${endDateString}`;
  const headers = await createHeadersPromise();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return await axios.get<Record<string, any>[]>(url, headers);
}
