import React from 'react';
import { 
  Box, 
  Layout, 
  Layers, 
  Image as ImageIcon, 
  Type, 
  MousePointer2, 
  Plus,
  Monitor,
  Smartphone,
  ChevronRight
} from 'lucide-react';
import { useBuilderStore } from '../stores/use-builder-store';
import { ComponentType } from '../../../types/builder';
import { cn } from '../../../lib/utils';

const COMPONENT_TOOLS: { type: ComponentType; label: string; icon: any; description: string }[] = [
  { type: 'hero', label: '3D Hero', icon: Monitor, description: 'Immersive 3D headline section' },
  { type: 'bento', label: 'Bento Grid', icon: Layout, description: 'Apple-style grid layout' },
  { type: '3d-showcase', label: '3D Showcase', icon: Box, description: 'Interactive 3D model viewer' },
  { type: 'features', label: 'Features', icon: Layers, description: 'Detailed feature highlight' },
  { type: 'gallery', label: 'Gallery', icon: ImageIcon, description: 'Smooth scrolling media' },
  { type: 'footer', label: 'Footer', icon: Type, description: 'Clean contact and links' },
];

export function BuilderSidebar() {
  const { addComponent, selectedComponentId, selectComponent } = useBuilderStore();

  return (
    <aside className="w-72 border-r bg-background flex flex-col h-full overflow-hidden apple-transition">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">Library</h2>
        <div className="flex gap-2">
          <button className="p-1.5 hover:bg-secondary rounded-md transition-colors"><Monitor size={16} /></button>
          <button className="p-1.5 hover:bg-secondary rounded-md transition-colors"><Smartphone size={16} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <section>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">Components</h3>
          <div className="grid grid-cols-1 gap-2">
            {COMPONENT_TOOLS.map((tool) => (
              <button
                key={tool.type}
                onClick={() => addComponent(tool.type)}
                className="group flex items-start gap-4 p-3 rounded-xl hover:bg-secondary border border-transparent hover:border-border transition-all text-left"
              >
                <div className="p-2 bg-secondary group-hover:bg-background rounded-lg apple-transition">
                  <tool.icon size={20} className="text-muted-foreground group-hover:text-foreground" />
                </div>
                <div>
                  <div className="font-medium text-sm">{tool.label}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{tool.description}</div>
                </div>
                <Plus size={14} className="ml-auto mt-1 text-muted-foreground opacity-0 group-hover:opacity-100 apple-transition" />
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">Page Structure</h3>
          <div className="space-y-1">
            {/* Component hierarchy would go here */}
            <div className="text-sm text-muted-foreground px-2 italic">Add components to see structure</div>
          </div>
        </section>
      </div>

      <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border-t">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-background border shadow-sm">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <MousePointer2 size={16} className="text-primary" />
          </div>
          <div>
            <div className="text-xs font-medium italic">Pro Tip</div>
            <div className="text-[10px] text-muted-foreground leading-tight">Click components to edit properties.</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
