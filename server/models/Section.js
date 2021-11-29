import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const SectionSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  description: { type: String, required: true, minlength: 1, maxlength: 200 },
  name: { type: String, required: true, minlength: 1, maxlength: 100 }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

SectionSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
