import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class ProjectsService {
  async getAll(query) {
    const projects = await dbContext.Projects.find(query).populate('creator', 'name picture')
    return projects
  }

  async getById(projectId) {
    const project = await dbContext.Projects.findById(projectId).populate('creator', 'name picture')
    if (!project) {
      throw new BadRequest('Invalid project Id')
    }
    return project
  }

  async createProject(projectData) {
    const project = await dbContext.Projects.create(projectData)
    await project.populate('creator', 'name picture')
  }
}

export const projectsService = new ProjectsService()
