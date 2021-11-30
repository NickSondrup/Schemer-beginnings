import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ColorSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  name: { type: String, required: true, minlength: 1, maxlength: 200 },
  type: { type: String, enum: ['Base', 'Layer', 'Shade', 'Dry Brush', 'Technical'], required: true },
  hexcode: { type: String, minlength: 1, maxlength: 20 }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

ColorSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
