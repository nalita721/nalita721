import { create } from 'zustand'

type AuthStatus = 'loading' | 'authenticated' | 'anonymous'

interface AuthState {
  email: string | null
  status: AuthStatus
  checkSession: () => Promise<void>
  requestLink: (email: string) => Promise<{ ok: boolean; error?: string }>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  email: null,
  status: 'loading',

  checkSession: async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' })
      const data = await res.json()
      set({ email: data.email ?? null, status: data.email ? 'authenticated' : 'anonymous' })
    } catch {
      set({ email: null, status: 'anonymous' })
    }
  },

  requestLink: async (email) => {
    try {
      const res = await fetch('/api/auth/request-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}) as { error?: string })
        return { ok: false, error: data.error ?? 'ส่งลิงก์ไม่สำเร็จ กรุณาลองใหม่' }
      }
      return { ok: true }
    } catch {
      return { ok: false, error: 'เกิดข้อผิดพลาด กรุณาลองใหม่' }
    }
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    } finally {
      set({ email: null, status: 'anonymous' })
    }
  },
}))
