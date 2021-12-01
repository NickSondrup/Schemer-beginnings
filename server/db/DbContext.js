import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ColorSchema } from '../models/Color.js'
import { ProjectSchema } from '../models/Project.js'
import { SectionSchema } from '../models/Section.js'
import { SectionColorSchema } from '../models/SectionColor.js'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Projects = mongoose.model('Project', ProjectSchema);
  Sections = mongoose.model('Section', SectionSchema);
  Colors = mongoose.model('Color', ColorSchema);
  SectionColors = mongoose.model('SectionColor', SectionColorSchema);
}

export const dbContext = new DbContext()
