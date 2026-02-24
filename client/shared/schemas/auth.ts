import { z } from 'zod'

/* ----------------- login ----------------- */
export const LoginSchema = z.object({
	email: z.string().email({
		message: 'Invalid email'
	}),
	password: z.string().min(6, {
		message: 'Password must be at least 6 characters'
	}),
	code: z.optional(z.string())
})

export type TypeLoginSchema = z.infer<typeof LoginSchema>

/* ----------------- register ----------------- */
export const RegisterSchema = z
	.object({
		name: z.string().min(1, {
			message: 'Please enter your name'
		}),
		email: z.string().email({
			message: 'Invalid email'
		}),
		password: z.string().min(6, {
			message: 'Password must be at least 6 characters'
		}),
		passwordRepeat: z.string().min(6, {
			message: 'Confirm password must be at least 6 characters'
		})
	})
	.refine((data) => data.password === data.passwordRepeat, {
		message: 'Passwords do not match',
		path: ['passwordRepeat']
	})

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>

/* ----------------- reset password ----------------- */
export const ResetPasswordSchema = z.object({
	email: z.string().email({
		message: 'Invalid email'
	})
})

export type TypeResetPasswordSchema = z.infer<typeof ResetPasswordSchema>

/* ----------------- set new password ----------------- */
export const NewPasswordSchema = z.object({
	password: z.string().min(6, {
		message: 'Password must be at least 6 characters'
	})
})

export type TypeNewPasswordSchema = z.infer<typeof NewPasswordSchema>

/* ----------------- profile settings ----------------- */
export const SettingsSchema = z.object({
	name: z.string().min(1, {
		message: 'Please enter your name'
	}),
	email: z.string().email({
		message: 'Invalid email'
	}),
	isTwoFactorEnabled: z.boolean()
})

export type TypeSettingsSchema = z.infer<typeof SettingsSchema>
