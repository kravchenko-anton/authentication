import { api } from '@/shared/api'
import { IUser } from '@/shared/types/auth'
import {
	TypeLoginSchema,
	TypeNewPasswordSchema,
	TypeRegisterSchema,
	TypeResetPasswordSchema,
	TypeSettingsSchema
} from '@/shared/schemas/auth'

class AuthService {
	private getHeaders(recaptcha?: string) {
		return recaptcha ? { recaptcha } : undefined
	}

	public register(body: TypeRegisterSchema, recaptcha?: string) {
		return api.post<{ message: string }>('auth/register', body, {
			headers: this.getHeaders(recaptcha)
		})
	}

	public login(body: TypeLoginSchema, recaptcha?: string) {
		return api.post<IUser & { message?: string }>('auth/login', body, {
			headers: this.getHeaders(recaptcha)
		})
	}

	public oauthGoogle() {
		return api.get<{ url: string }>('auth/oauth/connect/google')
	}

	public logout() {
		return api.post('auth/logout')
	}

	public resetPassword(body: TypeResetPasswordSchema, recaptcha?: string) {
		return api.post(
			'auth/password-recovery/reset',
			body,
			{ headers: this.getHeaders(recaptcha) }
		)
	}

	public updatePassword(
		body: TypeNewPasswordSchema,
		token: string | null,
		recaptcha?: string
	) {
		return api.post(
			`auth/password-recovery/new/${token}`,
			body,
			{ headers: this.getHeaders(recaptcha) }
		)
	}

	public verifyEmail(token: string | null) {
		return api.post('auth/email-confirmation', { token })
	}

	public fetchProfile() {
		return api.get<IUser>('users/profile')
	}

	public updateProfile(body: TypeSettingsSchema) {
		return api.patch<IUser>('users/profile', body)
	}
}

export const authService = new AuthService()
