import React from 'react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../../lib/project-service';
import { useAuth } from '../../hooks/use-auth';
import { Plus, Folder, Clock, ChevronRight, Layout } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [projects, setProjects] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const loadProjects = async () => {
      try {
        const list = await projectService.listProjects();
        setProjects(list);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  const handleCreateProject = async () => {
    const name = prompt('Enter project name:', 'New Immersive Site');
    if (!name) return;

    try {
      const project = await projectService.createProject(name);
      if (project) {
        toast.success('Project created!');
        navigate(`/builder/${project.id}`);
      }
    } catch (error) {
      toast.error('Failed to create project');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <nav className="h-16 border-b glass flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
            <Layout size={18} className="text-white dark:text-black" />
          </div>
          <span className="font-bold text-xl tracking-tight">Studio 3D</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">{user?.email}</span>
          <button 
            onClick={logout}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-12 px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">My Projects</h1>
            <p className="text-muted-foreground font-medium">Design and manage your immersive 3D experiences.</p>
          </div>
          <button 
            onClick={handleCreateProject}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-elegant"
          >
            <Plus size={20} />
            New Project
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 rounded-3xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="py-24 text-center border-2 border-dashed rounded-[3rem] bg-background/50">
            <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Folder size={40} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No projects yet</h2>
            <p className="text-muted-foreground mb-8">Start your journey by creating your first 3D project.</p>
            <button 
              onClick={handleCreateProject}
              className="px-8 py-3 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                onClick={() => navigate(`/builder/${project.id}`)}
                className="group relative bg-background rounded-[2.5rem] border hover:border-primary/50 transition-all p-8 cursor-pointer shadow-sm hover:shadow-elegant overflow-hidden"
              >
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 apple-transition">
                    <Folder size={24} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{project.name}</h3>
                  <div className="mt-auto flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <Clock size={14} />
                    <span>Last edited {new Date(project.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="absolute top-8 right-8 p-2 rounded-full bg-secondary opacity-0 group-hover:opacity-100 apple-transition">
                  <ChevronRight size={20} />
                </div>

                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 apple-transition" />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
