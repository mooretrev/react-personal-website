import StockPosition from "../model/StockPosition";
import getTransationHistory from "../tdApi/transactions/getTransactionHistory";
import getAccountsJSON from "../tdApi/accounts/getAccountJSON";

export default async function saveTradeData() {
    const accounts = await getAccountsJSON();
    const history = await getTransationHistory(accounts.mooretrev)
    history.data.map((transation) => {
        transation.
    })
}