import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const SectionColorSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  colorId: { type: Schema.Types.ObjectId, ref: 'Color', required: true },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

SectionColorSchema.virtual('color', {
  localField: 'colorId',
  foreignField: '_id',
  ref: 'Color',
  justOne: true
})

SectionColorSchema.virtual('section', {
  localField: 'sectionId',
  foreignField: '_id',
  ref: 'Section',
  justOne: true
})
