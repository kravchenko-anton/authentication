'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Loading
} from '@/components/ui'

import { useVerificationMutation } from '../hooks'

export function NewVerificationForm() {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	const hasRun = useRef(false)

	const { verification } = useVerificationMutation()

	useEffect(() => {
		if (token && !hasRun.current) {
			hasRun.current = true
			verification(token)
		}
	}, [token, verification])

	return (
		<Card>
			<CardHeader className='space-y-2'>
				<CardTitle>Email Verification</CardTitle>
				<CardDescription>
					Verifying your email address...
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex justify-center'>
					<Loading />
				</div>
			</CardContent>
		</Card>
	)
}
