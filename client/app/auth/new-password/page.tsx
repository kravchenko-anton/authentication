import { Suspense } from 'react'

import {ReCaptchaProvider} from "@/shared/providers/ReCaptchaProvider";
import type { Metadata } from 'next'

import { NewPasswordForm } from '@/features/auth/components'
import { Loading } from '@/components/ui'

export const metadata: Metadata = {
	title: 'New password'
}

export default function NewPasswordPage() {
	return <Suspense fallback={<Loading />}>
		<ReCaptchaProvider>
			<NewPasswordForm />
		</ReCaptchaProvider>
	</Suspense>
}
