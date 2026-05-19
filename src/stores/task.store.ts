import { create } from 'zustand';
import { Task, UserTaskProgress } from '../types';

interface TaskStore {
  tasks: Task[];
  progress: Record<string, UserTaskProgress>;
  isLoading: boolean;
  setTasks: (tasks: Task[]) => void;
  setProgress: (progress: Record<string, UserTaskProgress>) => void;
  updateTaskStatus: (taskId: string, status: UserTaskProgress['status']) => void;
  setLoading: (loading: boolean) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  progress: {},
  isLoading: true,
  setTasks: (tasks) => set({ tasks, isLoading: false }),
  setProgress: (progress) => set({ progress }),
  updateTaskStatus: (taskId, status) => set((state) => ({
    progress: {
      ...state.progress,
      [taskId]: { ...state.progress[taskId], taskId, status }
    }
  })),
  setLoading: (loading) => set({ isLoading: loading }),
}));
  
