import getTransactionHistoryFull from './getTransactionHistoryFull'
export interface TransactionHistory {
    type: "STOCK" | "OPTION";
    transactionDate: Date;
    accountId: number;
    instruction: "BUY" | "SELL";
    purchasePrice: number;
    totalPurchasePrice: number;
    sellPrice?: number;
    totalSellPrice?: number;
    quantity: number;

}
// @ts-ignore
export default async function getTransactionHistory(account: number): Promise<TransactionHistory> {
    const history = await getTransactionHistoryFull(account)
    console.log(history)
}