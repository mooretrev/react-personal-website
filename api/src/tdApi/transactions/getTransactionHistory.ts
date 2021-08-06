import getTransactionHistoryFull from './getTransactionHistoryFull';

export interface MinTransactionHistory {
    positionType: 'LONG' | 'SHORT' | 'LONG CALL' | 'LONG PUT' | 'SHORT CALL' | 'SHORT PUT';
    type: 'STOCK' | 'OPTION';
    transactionDate: Date;
    accountId: number;
    instruction: 'BUY' | 'SELL';
    price: number;
    totalPrice: number;
    quantity: number;

}
// @ts-ignore
export default async function getTransactionHistory(account: number): Promise<MinTransactionHistory[]> {
  const history = await getTransactionHistoryFull(account);
  const res: MinTransactionHistory[] = history.data.map((transaction) => ({
    positionType: 'LONG',
    accountId: account,
    transactionDate: new Date(transaction.transactionDate),
    quantity: transaction.transactionItem.amount,
    price: transaction.transactionItem.price,
    totalPrice: Math.abs(transaction.transactionItem.cost),
    instruction: transaction.transactionItem.instruction,
    type: 'STOCK',
  }));
  return res;
}
