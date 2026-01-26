import React from 'react';
import { Save, Eye, Share2, Plus, ChevronDown, Rocket, LayoutGrid } from 'lucide-react';
import { useBuilderStore } from '../stores/use-builder-store';
import { cn } from '../../../lib/utils';
import { useNavigate } from 'react-router-dom';

export function BuilderNavbar() {
  const navigate = useNavigate();
  const { pages, setPages, currentPageId, setCurrentPage, projectId } = useBuilderStore();
  const currentPage = pages.find(p => p.id === currentPageId);

  const handleAddPage = () => {
    const name = prompt('Page name:', 'New Page');
    if (!name) return;
    
    const id = `page_${Math.random().toString(36).substr(2, 9)}`;
    const newPage = { id, name, path: `/${name.toLowerCase().replace(/\s+/g, '-')}`, components: [] };
    setPages([...pages, newPage]);
    setCurrentPage(id);
  };

  return (
    <header className="h-16 border-b glass flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-8">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate('/dashboard')}
        >
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center overflow-hidden">
            <div className="w-4 h-4 bg-white dark:bg-black rounded-sm rotate-45" />
          </div>
          <span className="font-bold tracking-tight">Studio 3D</span>
        </div>

        <div className="h-8 w-px bg-border hidden md:block" />

        <div className="hidden md:flex items-center gap-1 bg-secondary/50 p-1 rounded-full">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setCurrentPage(page.id)}
              className={cn(
                "px-4 py-1.5 text-sm rounded-full transition-all font-medium",
                currentPageId === page.id 
                  ? "bg-background shadow-sm text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {page.name}
            </button>
          ))}
          <button 
            onClick={handleAddPage}
            className="p-1.5 hover:bg-background rounded-full transition-colors text-muted-foreground"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center mr-4 px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse" />
          Live Saving
        </div>

        <button className="flex items-center gap-2 px-4 py-2 hover:bg-secondary rounded-full text-sm font-medium transition-colors">
          <Eye size={16} />
          Preview
        </button>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:scale-105 active:scale-95 transition-all shadow-elegant">
          <Rocket size={16} />
          Publish
        </button>
      </div>
    </header>
  );
}
