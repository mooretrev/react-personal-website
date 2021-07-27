import getTransactionHistory from "../getTransactionHistory";
import getTransactionHistoryFull from "../getTransactionHistoryFull";
import sampleTransactionData from "./SampleTransactionHistory.json"

jest.mock('../getTransactionHistoryFull')

const mockGetTransactionHistory = getTransactionHistoryFull as jest.MockedFunction<typeof getTransactionHistoryFull>;
// @ts-ignore
mockGetTransactionHistory.mockResolvedValue({ data: sampleTransactionData })

test('should get minify transaction history', async () => {
    const res = await getTransactionHistory(23423)
    console.log(res)
})
