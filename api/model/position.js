import mongoose from 'mongoose';

const { Schema } = mongoose;

function optionDataRequired() {
  return this.option;
}

function callPutValidation(value) {
  if (this.option) {
    if (value === 'CALL') {
      return true;
    } if (value === 'PUT') {
      return true;
    }
    return false;
  }
  return false;
}

const positionScheme = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ticker: {
    type: String,
    required: [true, 'The ticker of the position is required.'],
  },
  averagePrice: {
    type: Number,
    required: [true, 'The average price of the position is required.'],
  },
  marketValue: {
    type: Number,
    required: [true, 'The market value of the position is required.'],
  },
  quantity: {
    type: Number,
    required: [true, 'The quantity of the position is required.'],
  },
  option: {
    type: Boolean,
    required: [true, 'The quantity of the position is required.'],
  },
  callPut: {
    type: String,
    required: [
      callPutValidation,
      'If the option value is true, the callPut field is required.',
    ],
  },
  expirationDate: {
    type: Date,
    required: [
      optionDataRequired,
      'If the option value is true, the expirationDate field is required.',
    ],
  },
  strike: {
    type: Number,
    required: [
      optionDataRequired,
      'If the option value is true, the callPut field is required.',
    ],
  },
  open: {
    type: Boolean,
    required: [true, 'Whether the position is open is required.'],
  },
  profitLoss: {
    type: Number,
    required: [
      function validation() { return !this.open; },
      'If the position is closed, there should be a profit and loss.',
    ],
  },
});

const Position = mongoose.model('Position', positionScheme);
export default Position;
