import { useMutation, useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils/toast-message-handler'
import { authService } from '@/shared/services/auth'
import {
	TypeLoginSchema,
	TypeNewPasswordSchema,
	TypeRegisterSchema,
	TypeResetPasswordSchema,
	TypeSettingsSchema
} from '@/shared/schemas/auth'

export function useLoginMutation(setIsShowFactor: Dispatch<SetStateAction<boolean>>) {
	const { mutate: login, isPending: isLoadingLogin } = useMutation({
		mutationKey: ['login user'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeLoginSchema
			recaptcha: string
		}) => authService.login(values, recaptcha),
		onSuccess(data) {
			if (data.message) {
				toast.info(data.message)
				setIsShowFactor(true)
			} else {
				toast.success('Successfully logged in')
				window.location.href = '/dashboard/settings'
			}
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { login, isLoadingLogin }
}

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
			toast.success(
				data?.message ||
					'Registration successful. Please check your email to verify your account.',
				{
					duration: 10000
				}
			)
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { register, isLoadingRegister, isSuccess }
}

export function useResetPasswordMutation() {
	const { mutate: reset, isPending: isLoadingReset } = useMutation({
		mutationKey: ['reset password'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeResetPasswordSchema
			recaptcha: string
		}) => authService.resetPassword(values, recaptcha),
		onSuccess() {
			toast.success('Password reset instructions sent', {
				description:
					"We've sent you instructions to reset your password. Please check your inbox and follow the instructions to create a new password."
			})
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { reset, isLoadingReset }
}

export function useNewPasswordMutation() {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	const { mutate: newPassword, isPending: isLoadingNew } = useMutation({
		mutationKey: ['new password', token],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeNewPasswordSchema
			recaptcha: string
		}) => authService.updatePassword(values, token, recaptcha),
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

export function useVerificationMutation() {
	const { mutate: verification } = useMutation({
		mutationKey: ['new verification'],
		mutationFn: (token: string | null) => authService.verifyEmail(token),
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

export function useProfile() {
	const { data: user, isLoading, isError, error } = useQuery({
		queryKey: ['profile'],
		queryFn: () => authService.fetchProfile(),
		staleTime: 30 * 1000
	})

	return {
		user,
		isLoading,
		isError,
		error
	}
}

export function useUpdateProfileMutation() {
	const { mutate: update, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: TypeSettingsSchema) => authService.updateProfile(data),
		onSuccess() {
			toast.success('Profile was successfully updated')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { update, isLoadingUpdate }
}
