import { colorsService } from '../services/ColorsService.js'
import BaseController from '../utils/BaseController.js'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class ColorsController extends BaseController {
  constructor() {
    super('api/colors')
    this.router
      .get('', this.getAll)
      .get('/:colorId', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createColor)
      .put('/:colorId', this.update)
      .delete('/:colorId', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const colors = await colorsService.getAll(req.query)
      res.send(colors)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const color = await colorsService.getById(req.params.colorId)
      res.send(color)
    } catch (error) {
      next(error)
    }
  }

  async createColor(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const color = await colorsService.createColor(req.body)
      res.send(color)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const color = await colorsService.update(req.params.colorId, req.userInfo.id, req.body)
      res.send(color)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const color = await colorsService.delete(req.params.colorId, req.userInfo.id)
      res.send(color)
    } catch (error) {
      next(error)
    }
  }
}
