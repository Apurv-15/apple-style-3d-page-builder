import React from 'react';
import { useBuilderStore } from '../stores/use-builder-store';
import { ComponentProps } from '../../../types/builder';
import { Hero } from './elements/Hero';
import { BentoGrid } from './elements/BentoGrid';
import { Showcase3D } from './elements/Showcase3D';
import { Features } from './elements/Features';
import { Gallery } from './elements/Gallery';
import { Footer } from './elements/Footer';
import { cn } from '../../../lib/utils';
import { Trash2, MoveUp, MoveDown } from 'lucide-react';

export function BuilderCanvas() {
  const { pages, currentPageId, selectedComponentId, selectComponent, removeComponent, reorderComponents } = useBuilderStore();
  const currentPage = pages.find(p => p.id === currentPageId);

  if (!currentPage) return null;

  return (
    <div className="h-full overflow-y-auto scroll-smooth custom-scrollbar p-12 pb-32">
      <div className="max-w-5xl mx-auto space-y-12">
        {currentPage.components.length === 0 ? (
          <div className="h-[60vh] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-muted-foreground p-8 text-center bg-background/50">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6">
              <Plus size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Build your masterpiece</h3>
            <p className="max-w-xs">Drag and drop components from the sidebar to start creating your 3D experience.</p>
          </div>
        ) : (
          currentPage.components.map((component, index) => (
            <div
              key={component.id}
              onClick={(e) => {
                e.stopPropagation();
                selectComponent(component.id);
              }}
              className={cn(
                "relative group apple-transition rounded-3xl",
                selectedComponentId === component.id 
                  ? "ring-2 ring-primary ring-offset-4 ring-offset-background" 
                  : "hover:ring-1 hover:ring-border hover:ring-offset-2"
              )}
            >
              {/* Toolbar */}
              <div className={cn(
                "absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-background border shadow-lg rounded-full p-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto apple-transition z-40",
                selectedComponentId === component.id && "opacity-100 pointer-events-auto"
              )}>
                <button 
                  onClick={() => reorderComponents(index, index - 1)}
                  disabled={index === 0}
                  className="p-2 hover:bg-secondary rounded-full disabled:opacity-30 transition-colors"
                >
                  <MoveUp size={14} />
                </button>
                <button 
                  onClick={() => reorderComponents(index, index + 1)}
                  disabled={index === currentPage.components.length - 1}
                  className="p-2 hover:bg-secondary rounded-full disabled:opacity-30 transition-colors"
                >
                  <MoveDown size={14} />
                </button>
                <div className="w-px h-4 bg-border mx-1" />
                <button 
                  onClick={() => removeComponent(component.id)}
                  className="p-2 hover:bg-destructive hover:text-destructive-foreground rounded-full transition-colors text-destructive"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Render Component */}
              <ComponentRenderer component={component} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ComponentRenderer({ component }: { component: ComponentProps }) {
  switch (component.type) {
    case 'hero':
      return <Hero settings={component.settings} />;
    case 'bento':
      return <BentoGrid settings={component.settings} />;
    case '3d-showcase':
      return <Showcase3D settings={component.settings} />;
    case 'features':
      return <Features settings={component.settings} />;
    case 'gallery':
      return <Gallery settings={component.settings} />;
    case 'footer':
      return <Footer settings={component.settings} />;
    default:
      return (
        <div className="p-12 bg-card border rounded-3xl text-center">
          Component: {component.type}
        </div>
      );
  }
}

import { Plus } from 'lucide-react';
