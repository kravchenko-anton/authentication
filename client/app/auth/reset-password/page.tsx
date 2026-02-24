import type { Metadata } from 'next'

import { ReCaptchaProvider } from '@/shared/providers/ReCaptchaProvider'
import { ResetPasswordForm } from '@/app/auth/components/ResetPasswordForm'

export const metadata: Metadata = {
	title: 'Reset password'
}

export default function ResetPasswordPage() {
	return (
		<ReCaptchaProvider>
			<ResetPasswordForm />
		</ReCaptchaProvider>
	)
}
