import { create } from 'zustand';
import { PageData, ComponentProps, ComponentType } from '../types/builder';
import { v4 as uuidv4 } from 'uuid';

interface BuilderState {
  projectId: string | null;
  currentPageId: string | null;
  pages: PageData[];
  selectedComponentId: string | null;
  
  // Actions
  setProjectId: (id: string | null) => void;
  setPages: (pages: PageData[]) => void;
  setCurrentPage: (id: string) => void;
  addComponent: (type: ComponentType) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, settings: Record<string, any>) => void;
  selectComponent: (id: string | null) => void;
  reorderComponents: (startIndex: number, endIndex: number) => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  projectId: null,
  currentPageId: null,
  pages: [],
  selectedComponentId: null,

  setProjectId: (id) => set({ projectId: id }),
  setPages: (pages) => set({ pages, currentPageId: pages[0]?.id || null }),
  setCurrentPage: (id) => set({ currentPageId: id, selectedComponentId: null }),
  
  addComponent: (type) => set((state) => {
    const currentPage = state.pages.find(p => p.id === state.currentPageId);
    if (!currentPage) return state;

    const newComponent: ComponentProps = {
      id: uuidv4(),
      type,
      settings: getDefaultSettings(type),
    };

    return {
      pages: state.pages.map(p => 
        p.id === state.currentPageId 
          ? { ...p, components: [...p.components, newComponent] }
          : p
      ),
      selectedComponentId: newComponent.id
    };
  }),

  removeComponent: (id) => set((state) => ({
    pages: state.pages.map(p => 
      p.id === state.currentPageId 
        ? { ...p, components: p.components.filter(c => c.id !== id) }
        : p
    ),
    selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId
  })),

  updateComponent: (id, settings) => set((state) => ({
    pages: state.pages.map(p => 
      p.id === state.currentPageId 
        ? { ...p, components: p.components.map(c => c.id === id ? { ...c, settings: { ...c.settings, ...settings } } : c) }
        : p
    )
  })),

  selectComponent: (id) => set({ selectedComponentId: id }),

  reorderComponents: (startIndex, endIndex) => set((state) => {
    const currentPage = state.pages.find(p => p.id === state.currentPageId);
    if (!currentPage) return state;

    const newComponents = Array.from(currentPage.components);
    const [removed] = newComponents.splice(startIndex, 1);
    newComponents.splice(endIndex, 0, removed);

    return {
      pages: state.pages.map(p => 
        p.id === state.currentPageId 
          ? { ...p, components: newComponents }
          : p
      )
    };
  })
}));

function getDefaultSettings(type: ComponentType) {
  switch (type) {
    case 'hero':
      return { title: 'Elevate Your Design', subtitle: 'Immersive 3D experiences at your fingertips.', theme: 'dark' };
    case 'bento':
      return { items: [
        { title: 'Performance', description: 'Blazing fast speeds.', size: 'large' },
        { title: 'Security', description: 'Private by design.', size: 'small' },
        { title: 'Design', description: 'Pixel perfect.', size: 'small' }
      ]};
    case '3d-showcase':
      return { model: 'abstract', autoRotate: true };
    default:
      return {};
  }
}