import {ReCaptchaProvider} from "@/shared/providers/ReCaptchaProvider";
import type { Metadata } from 'next'

import { RegisterForm } from '@/features/auth/components'

export const metadata: Metadata = {
	title: 'Create an account'
}

export default function RegisterPage() {
	return <ReCaptchaProvider>
		<RegisterForm />
	</ReCaptchaProvider>
}
