import StockPosition, { StockPositionInterface } from '../model/stockPosition';
import getTransationHistory from '../tdApi/transactions/getTransactionHistory';
import getAccountsJSON from '../tdApi/accounts/getAccountJSON';

// TODO finish function
export default async function saveTradeData() {
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
  })
  for(const transaction of history) {
    const query = {
      ticker: transaction.ticker,
      quantity: transaction.quantity
    }
    const position: StockPositionInterface = await StockPosition.findOne(query)
    if(position !== null) {
      if(transaction.type === "STOCK") {
        if (transaction.positionType === "LONG") {
         if(transaction.instruction === 'SELL') {
           position.exitDate = transaction.transactionDate
           position.exitPrice = transaction.price
           await position.save()
         } 
        }
      }
    } else {
      if (transaction.type === "STOCK") {
        if (transaction.positionType === "LONG") {
          if(transaction.instruction === "BUY") {
            const positionDoc = {
              entryDate: new Date(transaction.transactionDate),
              entryPrice: transaction.price,
              instrumentType: "STOCK",
              positionType: "LONG",
              quantity: transaction.quantity,
              ticker: transaction.ticker,
            }
            await StockPosition.create(positionDoc)
          }
        }
      }
    }

  };
}
