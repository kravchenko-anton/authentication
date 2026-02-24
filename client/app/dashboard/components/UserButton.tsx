import {useLogoutMutation} from "@/shared/hooks/auth";
import {IUser} from "@/shared/types/auth";
import { UserCheck } from 'lucide-react'


import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Skeleton
} from '@/components/ui'


interface UserButtonProps {
	user: IUser
}

export function UserButton({ user }: UserButtonProps) {
	const { logout, isLoadingLogout } = useLogoutMutation()

	if (!user) return null

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={user.picture} />
					<AvatarFallback>
						{user.displayName.slice(0, 1)}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-40' align='end'>
				<DropdownMenuItem
					disabled={isLoadingLogout}
					onClick={() => logout()}
				>
					<UserCheck className='mr-2 size-4' />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export function UserButtonLoading() {
	return <Skeleton className='h-10 w-10 rounded-full' />
}
