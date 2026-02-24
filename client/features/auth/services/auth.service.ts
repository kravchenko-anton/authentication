import {api} from '@/shared/api'

import {TypeLoginSchema, TypeRegisterSchema} from '../schemes'
import {IUser} from '../types'

class AuthService {
	public async register(body: TypeRegisterSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined
		
		return   api.post<{ message: string }>('auth/register', body, {
			headers
		})
	}

	public async login(body: TypeLoginSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		return await api.post<IUser & { message?: string }>('auth/login', body, {
			headers
		})
	}

	public async oauthGoogle() {
		return await api.get<{ url: string }>('auth/oauth/connect/google')
	}

	public async logout() {
		return await api.post('auth/logout')
	}
}

export const authService = new AuthService()
