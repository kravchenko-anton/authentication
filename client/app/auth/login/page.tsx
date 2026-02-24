import { LoginForm } from '@/features/auth/components'
import {ReCaptchaProvider} from "@/shared/providers/ReCaptchaProvider";



export default function LoginPage() {
	return <ReCaptchaProvider><LoginForm /></ReCaptchaProvider>
}
