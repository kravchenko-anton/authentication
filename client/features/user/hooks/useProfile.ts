import { useQuery } from '@tanstack/react-query'

import { userService } from '@/features/user/services'

export function useProfile() {
	const { data: user, isLoading, isError, error } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.findProfile(),
		staleTime: 30 * 1000
	})

	return {
		user,
		isLoading,
		isError,
		error
	}
}
