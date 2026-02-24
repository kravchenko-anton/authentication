import { Suspense } from 'react'
import type { Metadata } from 'next'

import { Loading } from '@/components/ui'
import { NewVerificationForm } from '@/app/auth/components/NewVerificationForm'

export const metadata: Metadata = {
	title: 'Confirm your email',
}

export default function NewVerificationPage() {
	return <Suspense fallback={<Loading />}>
		<NewVerificationForm />
	</Suspense>
}
