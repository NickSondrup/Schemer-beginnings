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
    return project
  }

  async deleteProject(projectId, userId) {
    const project = await this.getById(projectId)
    if (userId !== project.creatorId.toString()) {
      throw new Forbidden('The dark fire will not avail you, flame of Udûn! You Shall not pass!')
    }
    await project.remove()
    return project
  }

  async update(projectId, userId, data) {
    const project = await this.getById(projectId)
    if (userId !== project.creatorId.toString()) {
      throw new Forbidden('The dark fire will not avail you, flame of Udûn! You Shall not pass!')
    }
    project.closed = data.closed || project.closed
    project.closedDate = data.closedDate || project.closedDate
    project.picture = data.picture || project.picture
    project.name = data.name || project.name
    project.modelCount = data.modelCount || project.modelCount
    project.modelSize = data.modelSize || project.modelSize
    project.description = data.description || project.description
    await project.save()
    return project
  }
}

export const projectsService = new ProjectsService()
