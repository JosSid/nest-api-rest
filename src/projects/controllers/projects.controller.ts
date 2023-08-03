import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}
  @Post('register')
  public async createProject(@Body() body: ProjectDTO) {
    return this.projectService.createProject(body);
  }
  @Get('all')
  public async findAllProjects() {
    return this.projectService.findProjects();
  }

  @Get(':id')
  public async findProjectById(@Param('id') id: string) {
    return this.projectService.findProjectById(id);
  }

  @Put('edit/:id')
  public async updateProject(
    @Body() body: ProjectUpdateDTO,
    @Param('id') id: string,
  ) {
    return this.projectService.updateProject(body, id);
  }

  @Delete('delete/:id')
  public async deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
