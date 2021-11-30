import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class ColorsService {
  async getAll(query) {
    const colors = dbContext.Colors.find(query).populate('creator', 'name picture')
    return colors
  }

  async getById(colorId) {
    const color = dbContext.Colors.findById(colorId).populate('creator', 'name picture')
    if (!color) {
      throw new BadRequest('no color by that id')
    }
    return color
  }

  async createColor(data) {
    const color = await dbContext.Colors.create(data)
    await color.populate('creator', 'name picture')
    return color
  }

  async update(colorId, userId, data) {
    const color = await this.getById(colorId)
    if (color.creatorId.toString() !== userId) {
      throw new Forbidden('The dark fire will not avail you, flame of Udûn! You Shall not pass!')
    }
    color.name = data.name || color.name
    color.type = data.type || color.type
    color.hexcode = data.hexcode || color.hexcode
    await color.save()
    return color
  }

  async delete(colorId, userId) {
    const color = await this.getById(colorId)
    if (color.creatorId.toString() !== userId) {
      throw new Forbidden('The dark fire will not avail you, flame of Udûn! You Shall not pass!')
    }
    await color.remove()
    return color
  }
}

export const colorsService = new ColorsService()
