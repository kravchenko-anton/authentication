import { useMutation } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeNewPasswordSchema } from '../schemes'
import { passwordRecoveryService } from '@/features/auth/services'

export function useNewPasswordMutation() {
	const searchParams = useSearchParams()

	const token = searchParams.get('token')

	const { mutate: newPassword, isPending: isLoadingNew } = useMutation({
		mutationKey: ['new password'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeNewPasswordSchema
			recaptcha: string
		}) => passwordRecoveryService.new(values, token, recaptcha),
		onSuccess() {
			toast.success('Password successfully changed', {
				description: 'Now you can sign in with your new password'
			})
			window.location.href = '/auth/login'
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { newPassword, isLoadingNew }
}
