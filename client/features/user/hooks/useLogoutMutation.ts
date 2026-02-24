import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { authService } from '@/features/auth/services'

import { toastMessageHandler } from '@/shared/utils'

export function useLogoutMutation() {
	const { mutate: logout, isPending: isLoadingLogout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			toast.success('You have successfully logged out')
			window.location.href = '/auth/login'
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { logout, isLoadingLogout }
}
