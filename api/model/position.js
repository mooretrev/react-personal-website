import mongoose from 'mongoose';

const { Schema } = mongoose;

const positionScheme = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ticker: {
    type: Number,
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
  optionData: {
    callPut: {
      type: String,
      required: [
        function validation() { return this.optionData; },
        'If the option value is true, the callPut field is required.',
      ],
    },
    expirationDate: {
      type: Date,
      required: [
        function validation() { return this.optionData; },
        'If the option value is true, the expirationDate field is required.',
      ],
    },
    strike: {
      type: Boolean,
      required: [
        function validation() { return this.optionData; },
        'If the option value is true, the callPut field is required.',
      ],
    },
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
