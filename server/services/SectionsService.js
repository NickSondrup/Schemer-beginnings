import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class SectionsService {
  async getSections(projectId) {
    const sections = await dbContext.Sections.find({ projectId }).populate('creator', 'name picture')
    return sections
  }

  async getById(sectionId) {
    const section = await dbContext.Sections.findById(sectionId).populate('creator', 'name picture')
    if (!section) {
      throw new BadRequest('Invalid Section Id')
    }
    return section
  }

  async createSection(data) {
    const section = await dbContext.Sections.create(data)
    await section.populate('creator', 'name picture')
    return section
  }

  async update(sectionId, userId, data) {
    const section = await this.getById(sectionId)
    if (userId !== section.creatorId.toString()) {
      throw new Forbidden('The dark fire will not avail you, flame of Udûn! You Shall not pass!')
    }
    section.description = data.description || section.description
    section.name = data.name || section.name
    await section.save()
    return section
  }
}

export const sectionsService = new SectionsService()
