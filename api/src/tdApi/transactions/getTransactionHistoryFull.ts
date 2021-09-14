import axios, { AxiosResponse } from 'axios';
import createHeadersPromise from '../auth/headers';

export default async function getTransactionHistoryFull(
  account: number,
  startDateInput?: Date,
  endDateInput?: Date,
):
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Promise<AxiosResponse<Record<string, any>[]>> {
  let endDateString: string;
  let startDateString: string;

  if (startDateInput === undefined || endDateInput === undefined) {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 30);
    [endDateString] = today.toISOString().split('T');
    [startDateString] = startDate.toISOString().split('T');
  } else {
    [endDateString] = endDateInput.toISOString().split('T');
    [startDateString] = startDateInput.toISOString().split('T');
  }
  // eslint-disable-next-line max-len
  const url = `https://api.tdameritrade.com/v1/accounts/${account}/transactions?type=TRADE&startDate=${startDateString}&endDate=${endDateString}`;
  const headers = await createHeadersPromise();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return await axios.get<Record<string, any>[]>(url, headers);
}
