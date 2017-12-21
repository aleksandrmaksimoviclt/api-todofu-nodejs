import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
  cards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  }],
  name : {
    type: String,
    required: true,
    trim: true
  }
});

export default mongoose.model('List', ListSchema);
