import { z } from 'zod'

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
	.refine(data => data.password === data.passwordRepeat, {
		message: 'Passwords do not match',
		path: ['passwordRepeat']
	})

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>
