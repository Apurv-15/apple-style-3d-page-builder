import React from 'react';
import { useBuilderStore } from '../stores/use-builder-store';
import { Settings, Sliders, Palette, Smartphone, Globe } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';

export function PropertyPanel() {
  const { pages, currentPageId, selectedComponentId, updateComponent } = useBuilderStore();
  const currentPage = pages.find(p => p.id === currentPageId);
  const selectedComponent = currentPage?.components.find(c => c.id === selectedComponentId);

  if (!selectedComponent) {
    return (
      <aside className="w-80 border-l bg-background flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
          <Settings className="text-muted-foreground" size={32} />
        </div>
        <h3 className="font-semibold mb-2">Properties</h3>
        <p className="text-sm text-muted-foreground">Select a component on the canvas to edit its properties.</p>
      </aside>
    );
  }

  return (
    <aside className="w-80 border-l bg-background flex flex-col h-full overflow-hidden apple-transition">
      <div className="p-6 border-b flex items-center gap-3">
        <div className="p-2 bg-primary/10 text-primary rounded-lg">
          <Sliders size={18} />
        </div>
        <h2 className="font-semibold text-lg capitalize">{selectedComponent.type} Props</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {selectedComponent.type === 'hero' && (
          <>
            <div className="space-y-4">
              <Label>Headline</Label>
              <Input 
                value={selectedComponent.settings.title} 
                onChange={(e) => updateComponent(selectedComponent.id, { title: e.target.value })}
              />
            </div>
            <div className="space-y-4">
              <Label>Sub-headline</Label>
              <Textarea 
                value={selectedComponent.settings.subtitle} 
                onChange={(e) => updateComponent(selectedComponent.id, { subtitle: e.target.value })}
              />
            </div>
            <div className="space-y-4">
              <Label>Theme</Label>
              <div className="grid grid-cols-2 gap-2">
                {['light', 'dark'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => updateComponent(selectedComponent.id, { theme })}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      selectedComponent.settings.theme === theme 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-secondary/50 border-transparent hover:border-border"
                    }`}
                  >
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {selectedComponent.type === '3d-showcase' && (
          <>
            <div className="space-y-4">
              <Label>Auto Rotate</Label>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-secondary/20">
                <span className="text-sm font-medium">Rotation</span>
                <input 
                  type="checkbox"
                  checked={selectedComponent.settings.autoRotate}
                  onChange={(e) => updateComponent(selectedComponent.id, { autoRotate: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
            </div>
          </>
        )}

        {selectedComponent.type === 'bento' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold">Grid Items</h3>
            {selectedComponent.settings.items.map((item: any, i: number) => (
              <div key={i} className="p-4 rounded-xl border bg-secondary/20 space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs">Title</Label>
                  <Input 
                    value={item.title} 
                    onChange={(e) => {
                      const newItems = [...selectedComponent.settings.items];
                      newItems[i] = { ...item, title: e.target.value };
                      updateComponent(selectedComponent.id, { items: newItems });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Size</Label>
                  <select 
                    value={item.size}
                    onChange={(e) => {
                      const newItems = [...selectedComponent.settings.items];
                      newItems[i] = { ...item, size: e.target.value };
                      updateComponent(selectedComponent.id, { items: newItems });
                    }}
                    className="w-full bg-background border rounded-md px-3 py-1.5 text-sm"
                  >
                    <option value="small">Small</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <section className="pt-8 border-t space-y-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Appearance</h3>
          
          <div className="space-y-4">
            <Label className="flex justify-between items-center">
              Radius
              <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">24px</span>
            </Label>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Animation Intensity</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <button key={i} className={`flex-1 h-8 rounded-md border ${i === 2 ? 'bg-primary border-primary' : 'bg-secondary/50 border-transparent'}`} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="p-6 border-t bg-zinc-50 dark:bg-zinc-900/50">
        <button className="w-full py-3 bg-secondary text-foreground rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-border transition-colors">
          <Globe size={16} />
          SEO Settings
        </button>
      </div>
    </aside>
  );
}
