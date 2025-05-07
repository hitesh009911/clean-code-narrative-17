import { create } from 'zustand';
import { persist, createJSONStorage, PersistStorage } from 'zustand/middleware';

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
  tags: string[];
};

type ProjectsState = {
  projects: Project[];
  nextId: number;
  getProjectById: (id: number) => Project | undefined;
  addProject: (project: Omit<Project, 'id'>) => Project;
  updateProject: (id: number, project: Partial<Omit<Project, 'id'>>) => void;
  deleteProject: (id: number) => void;
};

// Initial projects data (could come from an API in a real application)
const initialProjects = [
  {
    id: 1,
    title: "Personal Finance Dashboard",
    description: "An elegant financial tracking application with data visualization and budgeting tools.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    githubUrl: "https://github.com/hitesh009911/finance-dashboard",
    tags: ["React", "TypeScript", "D3.js"],
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A minimalist shopping experience with intuitive product browsing and checkout flow.",
    image: "https://images.unsplash.com/photo-1524055988636-436cfa46e59e?q=80&w=2035&auto=format&fit=crop",
    githubUrl: "https://github.com/hitesh009911/ecommerce-platform",
    tags: ["Next.js", "Tailwind CSS", "Stripe"],
  },
  {
    id: 3,
    title: "Content Management System",
    description: "A clean, user-friendly CMS built for writers and content creators with markdown support.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
    githubUrl: "https://github.com/hitesh009911/content-management-system",
    tags: ["Node.js", "MongoDB", "Express"],
  },
];

// Create a custom storage that works with both localStorage and sessionStorage
const createDualStorage = () => {
  return {
    getItem: (name: string) => {
      try {
        // Try to get from localStorage first, then sessionStorage
        const lsData = localStorage.getItem(name);
        if (lsData) {
          // Also sync to sessionStorage to ensure consistency
          sessionStorage.setItem(name, lsData);
          return Promise.resolve(JSON.parse(lsData));
        }
        
        const ssData = sessionStorage.getItem(name);
        if (ssData) {
          // Sync back to localStorage
          localStorage.setItem(name, ssData);
          return Promise.resolve(JSON.parse(ssData));
        }
        
        return Promise.resolve(null);
      } catch (e) {
        console.error('Error getting data from storage', e);
        return Promise.resolve(null);
      }
    },
    
    setItem: (name: string, value: unknown) => {
      try {
        const stringValue = JSON.stringify(value);
        // Store in both storage types for persistence
        localStorage.setItem(name, stringValue);
        sessionStorage.setItem(name, stringValue);
        return Promise.resolve();
      } catch (e) {
        console.error('Error setting data in storage', e);
        return Promise.resolve();
      }
    },
    
    removeItem: (name: string) => {
      try {
        localStorage.removeItem(name);
        sessionStorage.removeItem(name);
        return Promise.resolve();
      } catch (e) {
        console.error('Error removing data from storage', e);
        return Promise.resolve();
      }
    }
  };
};

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: initialProjects,
      nextId: initialProjects.length + 1,
      
      getProjectById: (id) => {
        return get().projects.find(project => project.id === id);
      },
      
      addProject: (projectData) => {
        const nextId = get().nextId;
        const newProject = { ...projectData, id: nextId };
        
        set(state => ({
          projects: [...state.projects, newProject],
          nextId: state.nextId + 1,
        }));
        
        return newProject;
      },
      
      updateProject: (id, projectData) => {
        set(state => ({
          projects: state.projects.map(project => 
            project.id === id 
              ? { ...project, ...projectData } 
              : project
          ),
        }));
      },
      
      deleteProject: (id) => {
        set(state => ({
          projects: state.projects.filter(project => project.id !== id),
        }));
      },
    }),
    {
      name: 'portfolio-projects-storage',
      storage: createJSONStorage(() => createDualStorage())
    }
  )
);
