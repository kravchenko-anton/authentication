import { LoginForm } from '@/app/auth/components/LoginForm'
import { ReCaptchaProvider } from '@/shared/providers/ReCaptchaProvider'

export default function LoginPage() {
	return (
		<ReCaptchaProvider>
			<LoginForm />
		</ReCaptchaProvider>
	)
}
