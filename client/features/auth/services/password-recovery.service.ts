import { api } from '@/shared/api'

import { TypeNewPasswordSchema, TypeResetPasswordSchema } from '../schemes'

class PasswordRecoveryService {
	public async reset(body: TypeResetPasswordSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		return await api.post(
			'auth/password-recovery/reset',
			body,
			{ headers }
		)
	}

	public async new(
		body: TypeNewPasswordSchema,
		token: string | null,
		recaptcha?: string
	) {
		const headers = recaptcha ? { recaptcha } : undefined

		return await api.post(
			`auth/password-recovery/new/${token}`,
			body,
			{ headers }
		)
	}
}

export const passwordRecoveryService = new PasswordRecoveryService()
