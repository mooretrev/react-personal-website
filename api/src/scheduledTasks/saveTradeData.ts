import StockPosition, { StockPositionModel } from '../model/stockPosition';
import { findOneOpenPosition } from '../model/stockPositionQueries';
import getTransationHistory from '../tdApi/transactions/getTransactionHistory';
import getAccountsJSON from '../tdApi/accounts/getAccountJSON';
import stockTransaction, { StockTransactionModel } from '../model/stockTransaction';

export default async function saveTradeData(): Promise<void> {
  const accounts = await getAccountsJSON();
  const history = await getTransationHistory(accounts.mooretrev);
  history.sort((t1, t2) => {
    if (t1.transactionDate < t2.transactionDate) {
      return -1;
    }
    if (t1.transactionDate > t2.transactionDate) {
      return 1;
    }
    return 0;
  });
  for (let i = 0; i < history.length; i += 1) {
    const transaction = history[i];
    const query: StockTransactionModel = {
      ticker: transaction.ticker,
      date: new Date(transaction.transactionDate),
      totalPrice: transaction.totalPrice,
    };
    const transactionRecord = await stockTransaction.findOne(query);
    if (transactionRecord === null) {
      await stockTransaction.create(query);
      if (transaction.type === 'STOCK') {
        if (transaction.positionType === 'LONG') {
          if (transaction.instruction === 'BUY') {
            const position = await findOneOpenPosition(transaction.ticker);
            if (position === null) {
              const positionDoc: StockPositionModel = {
                entryDate: new Date(transaction.transactionDate),
                totalEntryPrice: transaction.totalPrice,
                instrumentType: 'STOCK',
                positionType: 'LONG',
                quantity: transaction.quantity,
                quantityClosed: 0,
                ticker: transaction.ticker,
              };
              await StockPosition.create(positionDoc);
            } else {
              position.quantity += transaction.quantity;
              position.totalEntryPrice += transaction.totalPrice;
              await position.save();
            }
          } else if (transaction.instruction === 'SELL') {
            const position = await findOneOpenPosition(transaction.ticker);
            if (position !== null) {
              position.totalExitPrice = position.totalExitPrice
                ? position.totalExitPrice + transaction.totalPrice : transaction.totalPrice;
              position.exitDate = new Date(transaction.transactionDate);
              position.quantityClosed += transaction.quantity;
              await position.save();
            }
          }
        }
      }
    }
  }
}
