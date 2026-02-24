import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeRegisterSchema } from '../schemes'
import { authService } from '../services'

export function useRegisterMutation() {
	const [isSuccess, setIsSuccess] = useState(false)

	const { mutate: register, isPending: isLoadingRegister } = useMutation({
		mutationKey: ['register user'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeRegisterSchema
			recaptcha: string
		}) => authService.register(values, recaptcha),
		onSuccess(data) {
			setIsSuccess(true)
			toast.success(data?.message || 'Registration successful. Please check your email to verify your account.', {
				duration: 10000
			})
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { register, isLoadingRegister, isSuccess }
}
