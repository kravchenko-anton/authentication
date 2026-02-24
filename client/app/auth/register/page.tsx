import { ReCaptchaProvider } from '@/shared/providers/ReCaptchaProvider'
import type { Metadata } from 'next'

import { RegisterForm } from '@/app/auth/components/RegisterForm'

export const metadata: Metadata = {
	title: 'Create an account'
}

export default function RegisterPage() {
	return (
		<ReCaptchaProvider>
			<RegisterForm />
		</ReCaptchaProvider>
	)
}
