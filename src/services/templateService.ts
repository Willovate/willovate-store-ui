import { apiClient } from './apiClient'
import type {
  SelectTemplatePayload,
  SelectTemplateResponse,
  Template,
  TemplateFilters,
} from '../types'

export const templateService = {
  getTemplates: async (
    filters: TemplateFilters = {},
    signal?: AbortSignal,
  ): Promise<Template[]> => {
    try {
      return await apiClient.get<Template[]>('/api/templates', {
        params: {
          businessType: filters.businessType ?? 'clothing-store',
          tag: filters.tag,
          search: filters.search,
          sortBy: filters.sortBy ?? 'popular',
        },
        signal,
      })
    } catch {
      // Graceful offline fallback: return empty list or allow local registry to handle
      return []
    }
  },

  selectTemplate: async (
    payload: SelectTemplatePayload,
    signal?: AbortSignal,
  ): Promise<SelectTemplateResponse> => {
    try {
      return await apiClient.post<SelectTemplateResponse>(
        '/api/onboarding/select-template',
        payload,
        { signal },
      )
    } catch {
      // Offline fallback: simulate successful local selection
      return {
        success: true,
        projectId: `proj_${payload.sessionId}_${Date.now()}`,
        nextStepUrl: '/workspace',
        message: 'Template selected locally.',
      }
    }
  },
}

