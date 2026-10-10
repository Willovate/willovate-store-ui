export interface WorkspaceState {
  projectId: string
  templateName: string
  lastSavedAt: string
}

const STORAGE_KEY = 'willovate_workspace_state'

export const workspaceService = {
  getWorkspaceState: (projectId: string): WorkspaceState | null => {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY}_${projectId}`)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  },

  saveWorkspaceState: (state: WorkspaceState): void => {
    try {
      localStorage.setItem(
        `${STORAGE_KEY}_${state.projectId}`,
        JSON.stringify(state),
      )
    } catch {
      // Ignore localStorage restrictions
    }
  },
}

