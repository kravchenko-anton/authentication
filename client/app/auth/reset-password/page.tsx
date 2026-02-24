import type { Metadata } from 'next'

import { ResetPasswordForm } from '@/app/auth/components/ResetPasswordForm'

export const metadata: Metadata = {
	title: 'Reset password'
}

export default function ResetPasswordPage() {
	return <ResetPasswordForm />
}
