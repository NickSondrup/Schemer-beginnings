import BaseController from '../utils/BaseController.js'
import { projectsService } from '../services/ProjectsService.js'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('', this.getAll)
      .get('/:projectId', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createProject)
  }

  async getAll(req, res, next) {
    try {
      const projects = await projectsService.getAll(req.query)
      res.send(projects)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const project = await projectsService.getById(req.params.projectId)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async createProject(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const project = await projectsService.createProject(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }
}
