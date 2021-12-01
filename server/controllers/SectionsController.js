import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController.js'
import { sectionsService } from '../services/SectionsService.js'
import { sectionColorService } from '../services/SectionColorsService.js'

export class SectionsController extends BaseController {
  constructor() {
    super('api/sections')
    this.router
      .get('/:sectionId', this.getById)
      .get('/:sectionId/colors', this.getSectionColors)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createSection)
      .put('/:sectionId', this.update)
      .delete('/:sectionId', this.delete)
  }

  async getById(req, res, next) {
    try {
      const section = await sectionsService.getById(req.params.sectionId)
      res.send(section)
    } catch (error) {
      next(error)
    }
  }

  async getSectionColors(req, res, next) {
    try {
      const sectColors = await sectionColorService.getSectionColors(req.params.sectionId)
      res.send(sectColors)
    } catch (error) {
      next(error)
    }
  }

  async createSection(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const section = await sectionsService.createSection(req.body)
      res.send(section)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const section = await sectionsService.update(req.params.sectionId, req.userInfo.id, req.body)
      res.send(section)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const section = await sectionsService.delete(req.params.sectionId, req.userInfo.id)
      res.send(section)
    } catch (error) {
      next(error)
    }
  }
}
