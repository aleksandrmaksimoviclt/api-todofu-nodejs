import mongoose from 'mongoose';

import List from './list';

export const CardSchema = new mongoose.Schema({
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  },
  title: {
    type: String,
    required: true,
    trim: true
  }
});

CardSchema.post('save', function(card, next) {
  if(card.list){
    List
      .findById(card.list)
      .exec()
      .then((list) => {
        mongoose.model('Card', CardSchema)
          .find({list: list._id})
          .exec()
          .then((cards) => {
            list.cards = cards;
            list.save()
            next()
          });
      });
  }
});

export default mongoose.model('Card', CardSchema);
