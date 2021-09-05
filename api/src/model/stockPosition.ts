import mongoose, { Schema, Document } from 'mongoose';

export type PositionType = 'LONG' | 'SHORT' | 'LONG CALL' | 'LONG PUT' | 'SHORT CALL' | 'SHORT PUT';

export type InstrumentType = 'STOCK' | 'OPTION';

export interface StockPositionModel {
    positionType: PositionType;
    ticker: string;
    instrumentType: InstrumentType;
    quantity: number;
    quantityClosed: number;
    entryDate: Date;
    exitDate?: Date;
    entryPrice?: number;
    totalEntryPrice: number;
    exitPrice?: number;
    totalExitPrice?: number;
    comments?: string;
    initialPositionSize?: number;
    gainOrLoss?: number;
    finalPositionSize?: number;
    closed?: boolean;
}

export interface StockPositionInterface extends StockPositionModel, Document {}

const StockPositionSchema = new Schema<StockPositionInterface>({
  positionType: { type: String, required: true },
  ticker: { type: String, required: true },
  instrumentType: { type: String, required: true },
  quantity: { type: Number, required: true },
  quantityClosed: Number,
  entryDate: { type: Date, required: true },
  exitDate: Date,
  totalEntryPrice: { type: Number, required: true },
  totalExitPrice: Number,
  comments: String,
});

StockPositionSchema.virtual('closed')
  .get(function closed(this: StockPositionInterface) {
    if (this.quantityClosed) {
      return this.quantity === this.quantityClosed;
    }
    return false;
  });

StockPositionSchema.virtual('entryPrice')
  .get(function initPosition(this: StockPositionInterface) {
    return this.totalEntryPrice / this.quantity;
  });

StockPositionSchema.virtual('exitPrice')
  .get(function gainOrLost(this: StockPositionInterface) {
    if (this.totalEntryPrice !== undefined && this.closed) {
      return this.totalExitPrice as number / this.quantity;
    }
    return null;
  });

StockPositionSchema.virtual('gainOrLoss')
  .get(function gainOrLost(this: StockPositionInterface) {
    if (this.totalExitPrice !== undefined && this.closed) {
      return (this.totalExitPrice - this.totalEntryPrice);
    }
    return null;
  });

StockPositionSchema.set('toObject', { virtuals: true });
StockPositionSchema.set('toJSON', { virtuals: true });

export default mongoose.model('StockPosition', StockPositionSchema);
