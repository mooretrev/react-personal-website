import getTransactionHistoryFull from './getTransactionHistoryFull';
import { PositionType, InstrumentType } from '../../model/stockPosition';

export interface MinTransactionHistory {
    positionType: PositionType;
    type: InstrumentType;
    transactionDate: string;
    accountId: number;
    instruction: 'BUY' | 'SELL';
    price: number;
    totalPrice: number;
    quantity: number;
    ticker: string;

}

export default async function getTransactionHistory(account: number):
Promise<MinTransactionHistory[]> {
  const history = await getTransactionHistoryFull(account);
  const res: MinTransactionHistory[] = history.data.map((transaction) => ({
    positionType: 'LONG',
    accountId: account,
    transactionDate: transaction.transactionDate,
    quantity: transaction.transactionItem.amount,
    price: transaction.transactionItem.price,
    totalPrice: Math.abs(transaction.transactionItem.cost),
    instruction: transaction.transactionItem.instruction,
    type: 'STOCK',
    ticker: transaction.transactionItem.instrument.symbol,
  }));
  return res;
}
