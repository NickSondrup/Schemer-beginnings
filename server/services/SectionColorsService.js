import { dbContext } from '../db/DbContext.js'
import { Forbidden } from '../utils/Errors.js'
class SectionColorService {
  async getAll(query) {
    const sectColors = dbContext.SectionColors.find(query).populate('color').populate('section')
    return sectColors
  }

  async getById(id) {
    const sectColor = dbContext.SectionColors.findById(id).populate('color').populate('section')
    return sectColor
  }

  async getSectionColors(sectionId) {
    const sectColors = dbContext.SectionColors.find({ sectionId }).populate('color').populate('section')
    return sectColors
  }

  async create(data) {
    const sectColor = await dbContext.SectionColors.create(data)
    await sectColor.populate('color')
    await sectColor.populate('section')
    return sectColor
  }

  async delete(id, userId) {
    const sectColor = await this.getById(id)
    if (sectColor.creatorId.toString() !== userId) {
      throw new Forbidden('The dark fire will not avail you, flame of Udûn! You Shall not pass!')
    }
    await sectColor.remove()
    return sectColor
  }
}

export const sectionColorService = new SectionColorService()
