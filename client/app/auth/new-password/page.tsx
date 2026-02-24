import type { Metadata } from 'next'

import { ReCaptchaProvider } from '@/shared/providers/ReCaptchaProvider'
import { NewPasswordForm } from '@/app/auth/components/NewPasswordForm'

export const metadata: Metadata = {
	title: 'New password'
}

export default function NewPasswordPage() {
	return (
		<ReCaptchaProvider>
			<NewPasswordForm />
		</ReCaptchaProvider>
	)
}
