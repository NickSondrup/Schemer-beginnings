import BaseController from '../utils/BaseController.js'
import { projectsService } from '../services/ProjectsService.js'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { sectionsService } from '../services/SectionsService.js'

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('', this.getAll)
      .get('/:projectId', this.getById)
      .get('/:projectId/sections', this.getSections)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createProject)
      .delete('/:projectId', this.deleteProject)
      .put('/:projectId', this.update)
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

  async getSections(req, res, next) {
    try {
      const sections = await sectionsService.getSections(req.params.projectId)
      res.send(sections)
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

  async deleteProject(req, res, next) {
    try {
      const project = await projectsService.deleteProject(req.params.projectId, req.userInfo.id)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const project = await projectsService.update(req.params.projectId, req.userInfo.id, req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }
}
