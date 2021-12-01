import { sectionColorService } from '../services/SectionColorsService.js'
import BaseController from '../utils/BaseController.js'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class SectionColorsController extends BaseController {
  constructor() {
    super('api/sectioncolors')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const sectColors = await sectionColorService.getAll(req.query)
      res.send(sectColors)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const sectColor = await sectionColorService.getById(req.params.id)
      res.send(sectColor)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const sectColor = await sectionColorService.create(req.body)
      res.send(sectColor)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const sectColor = await sectionColorService.delete(req.params.id, req.userInfo.id)
      res.send(sectColor)
    } catch (error) {
      next(error)
    }
  }
}
