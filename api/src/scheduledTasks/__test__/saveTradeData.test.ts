import saveTradeData from "../saveTradeData";
import getTransactionHistory from "../../tdApi/transactions/getTransactionHistory"
import getAccountsJSON from "../../tdApi/accounts/getAccountJSON";
import sampleTransactionHisory from "./SampleTransactionHistory.json"

jest.mock("../../tdApi/accounts/getAccountJSON")
jest.mock("../../tdApi/transactions/getTransactionHistory")

const mockGetTransactionHistory = getTransactionHistory as jest.MockedFunction<typeof getTransactionHistory>;
const mockGetAccountsJSON = getAccountsJSON as jest.MockedFunction<typeof getAccountsJSON>;

test('should save trade data', async () => {
    mockGetAccountsJSON.mockResolvedValue({
        mooretrev: 2389432
    })
    mockGetTransactionHistory.mockResolvedValue(sampleTransactionHisory)
    const res = await saveTradeData()
})