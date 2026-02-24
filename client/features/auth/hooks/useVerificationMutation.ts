import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { verificationService } from '../services'

export function useVerificationMutation() {
	const { mutate: verification } = useMutation({
		mutationKey: ['new verification'],
		mutationFn: (token: string | null) =>
			verificationService.newVerification(token),
		onSuccess() {
			toast.success('Verification was successful')
			window.location.href = '/dashboard/settings'
		},
		onError() {
			window.location.href = '/auth/login'
		}
	})

	return { verification }
}
