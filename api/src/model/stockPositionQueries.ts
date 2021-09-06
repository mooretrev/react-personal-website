import StockPosition, { StockPositionInterface, StockPositionModel } from './stockPosition';

// eslint-disable-next-line import/prefer-default-export
export async function findOneOpenPosition(ticker: string): Promise<StockPositionInterface | null> {
  const query = StockPosition.find({ ticker });

  const result: StockPositionInterface[] = await query.$where(function q(this: StockPositionModel) {
    return this.quantity !== this.quantityClosed;
  });
  if (result.length === 0) {
    return null;
  } if (result.length === 1) {
    return result[0];
  }
  throw new Error('Mulitple differnt open positions.');
}

// TODO i have no clue how to keep track of switch transaction have been loogged
export async function isStockTransaction() {

}
