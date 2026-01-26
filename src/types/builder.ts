export type ComponentType = 'hero' | 'bento' | 'features' | 'gallery' | 'footer' | '3d-showcase';

export interface ComponentProps {
  id: string;
  type: ComponentType;
  settings: Record<string, any>;
}

export interface PageData {
  id: string;
  name: string;
  path: string;
  components: ComponentProps[];
}

export interface ProjectData {
  id: string;
  name: string;
  pages: PageData[];
}
