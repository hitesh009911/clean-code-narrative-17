import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  github_url?: string;
  tags: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
};

type ProjectsState = {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  getProjectById: (id: string) => Project | undefined;
  addProject: (project: Omit<Project, 'id' | 'created_by' | 'created_at' | 'updated_at'>) => Promise<Project | null>;
  updateProject: (id: string, project: Partial<Omit<Project, 'id' | 'created_by' | 'created_at' | 'updated_at'>>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
};

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      set({ projects: data || [], isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      console.error('Error fetching projects:', error);
    }
  },

  getProjectById: (id: string) => {
    return get().projects.find(project => project.id === id);
  },

  addProject: async (projectData) => {
    set({ isLoading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('projects')
        .insert([{
          ...projectData,
          created_by: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        projects: [data, ...state.projects],
        isLoading: false
      }));

      return data;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      console.error('Error adding project:', error);
      return null;
    }
  },

  updateProject: async (id: string, projectData) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id);

      if (error) throw error;

      // Fetch updated project
      const { data: updatedProject } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (updatedProject) {
        set(state => ({
          projects: state.projects.map(p => p.id === id ? updatedProject : p),
          isLoading: false
        }));
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      console.error('Error updating project:', error);
    }
  },

  deleteProject: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        projects: state.projects.filter(p => p.id !== id),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      console.error('Error deleting project:', error);
    }
  }
}));
