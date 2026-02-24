import { Suspense } from 'react'
import type { Metadata } from 'next'

import { NewVerificationForm } from '@/features/auth/components'
import { Loading } from '@/components/ui'

export const metadata: Metadata = {
	title: 'Confirm your email',
}

export default function NewVerificationPage() {
	return <Suspense fallback={<Loading />}>
		<NewVerificationForm />
	</Suspense>
}
