import { blink } from '../lib/blink';
import { ProjectData, PageData } from '../types/builder';

export const projectService = {
  async listProjects() {
    return await blink.db.projects.list({
      orderBy: { updatedAt: 'desc' }
    });
  },

  async getProject(id: string): Promise<ProjectData | null> {
    const project = await blink.db.projects.get(id);
    if (!project) return null;

    const pages = await blink.db.pages.list({
      where: { project_id: id },
      orderBy: { order: 'asc' }
    });

    return {
      id: project.id,
      name: project.name,
      pages: pages.map(p => ({
        id: p.id,
        name: p.name,
        path: p.path,
        components: JSON.parse(p.content || '[]')
      }))
    };
  },

  async savePage(projectId: string, page: PageData) {
    const { user } = await blink.auth.me();
    if (!user) return;

    await blink.db.pages.upsert({
      id: page.id,
      project_id: projectId,
      name: page.name,
      path: page.path,
      content: JSON.stringify(page.components),
      user_id: user.id
    });
  },

  async createProject(name: string) {
    const { user } = await blink.auth.me();
    if (!user) return null;

    const project = await blink.db.projects.create({
      name,
      user_id: user.id
    });

    // Create default home page
    const pageId = `page_${Math.random().toString(36).substr(2, 9)}`;
    await blink.db.pages.create({
      id: pageId,
      project_id: project.id,
      name: 'Home',
      path: '/',
      content: '[]',
      user_id: user.id
    });

    return project;
  }
};
