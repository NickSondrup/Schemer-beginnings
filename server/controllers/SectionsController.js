import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController.js'
import { sectionsService } from '../services/SectionsService.js'

export class SectionsController extends BaseController {
  constructor() {
    super('api/sections')
    this.router
      .get('/:sectionId', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createSection)
      .put('/:sectionId', this.update)
  }

  async getById(req, res, next) {
    try {
      const section = await sectionsService.getById(req.params.sectionId)
      res.send(section)
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
}
