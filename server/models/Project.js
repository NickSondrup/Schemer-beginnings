import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ProjectSchema = new Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 100 },
  description: { type: String, required: true, minlength: 1, maxlength: 300 },
  picture: { type: String, required: true, minlength: 1, maxlength: 500 },
  modelCount: { type: Number, required: true, min: 1, max: 100 },
  modelSize: { type: String, enum: ['Small', 'Medium', 'Large', 'X-Large'], required: true },
  closed: { type: Boolean, required: true, default: false },
  closedDate: { type: Date },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

ProjectSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
