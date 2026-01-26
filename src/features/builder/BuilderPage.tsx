import React from 'react';
import { BuilderSidebar } from './components/BuilderSidebar';
import { BuilderCanvas } from './components/BuilderCanvas';
import { BuilderNavbar } from './components/BuilderNavbar';
import { PropertyPanel } from './components/PropertyPanel';
import { useBuilderStore } from './stores/use-builder-store';
import { useAuth } from '../../hooks/use-auth';
import { useNavigate, useParams } from 'react-router-dom';
import { projectService } from '../../lib/project-service';
import { toast } from 'react-hot-toast';

export default function BuilderPage() {
  const { isAuthenticated, isLoading: authLoading, login } = useAuth();
  const { projectId: routeProjectId } = useParams();
  const { projectId, setProjectId, currentPageId, pages, setPages } = useBuilderStore();
  const navigate = useNavigate();

  // Load project
  React.useEffect(() => {
    if (!isAuthenticated || !routeProjectId) return;

    const loadProject = async () => {
      try {
        const project = await projectService.getProject(routeProjectId);
        if (project) {
          setProjectId(project.id);
          setPages(project.pages);
        } else {
          toast.error('Project not found');
          navigate('/builder');
        }
      } catch (error) {
        console.error('Failed to load project:', error);
        toast.error('Error loading project');
      }
    };

    loadProject();
  }, [isAuthenticated, routeProjectId, setProjectId, setPages, navigate]);

  // Create project if none in route
  React.useEffect(() => {
    if (!isAuthenticated || routeProjectId || projectId) return;

    const createInitialProject = async () => {
      try {
        const project = await projectService.createProject('Untitled Project');
        if (project) {
          navigate(`/builder/${project.id}`, { replace: true });
        }
      } catch (error) {
        console.error('Failed to create project:', error);
      }
    };

    createInitialProject();
  }, [isAuthenticated, routeProjectId, projectId, navigate]);

  // Auto-save
  React.useEffect(() => {
    if (!projectId || pages.length === 0) return;

    const currentPage = pages.find(p => p.id === currentPageId);
    if (!currentPage) return;

    const timer = setTimeout(async () => {
      try {
        await projectService.savePage(projectId, currentPage);
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [pages, projectId, currentPageId]);

  if (authLoading) return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background p-8">
        <h1 className="text-4xl font-bold mb-4">Apple-Style 3D Builder</h1>
        <p className="text-muted-foreground mb-8">Sign in to start designing your immersive experience.</p>
        <button 
          onClick={() => login()}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:scale-105 transition-transform"
        >
          Sign In with Blink
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <BuilderNavbar />
      <div className="flex flex-1 overflow-hidden">
        <BuilderSidebar />
        <main className="flex-1 relative overflow-hidden bg-zinc-50 dark:bg-zinc-950/50">
          <BuilderCanvas />
        </main>
        <PropertyPanel />
      </div>
    </div>
  );
}