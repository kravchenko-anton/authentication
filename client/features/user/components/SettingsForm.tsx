'use client'

import {useProfile} from "@/features/user/hooks/useProfile";
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Loading,
	Switch
} from '@/components/ui'

import { useUpdateProfileMutation } from '../hooks/useUpdateProfileMutation'
import { SettingsSchema, TypeSettingsSchema } from '../schemes'

import { UserButton, UserButtonLoading } from './UserButton'

export function SettingsForm() {
	const { user, isLoading, isError } = useProfile()

	useEffect(() => {
		if (!isLoading && isError) {
			window.location.href = '/auth/login'
		}
	}, [isLoading, isError])

	const form = useForm<TypeSettingsSchema>({
		resolver: zodResolver(SettingsSchema),
		values: {
			name: user?.displayName ?? '',
			email: user?.email ?? '',
			isTwoFactorEnabled: user?.isTwoFactorEnabled ?? false
		}
	})

	const { update, isLoadingUpdate } = useUpdateProfileMutation()

	const onSubmit = (values: TypeSettingsSchema) => {
		update(values)
	}

	return (
		<Card className='w-100'>
			<CardHeader className='flex flex-row items-center justify-between'>
				<CardTitle>Profile Settings</CardTitle>
				{isLoading ? <UserButtonLoading /> : user && <UserButton user={user} />}
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<Loading />
				) : (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='grid gap-2 space-y-2'
						>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder='John'
												disabled={isLoadingUpdate}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder='john@example.com'
												disabled={isLoadingUpdate}
												type='email'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='isTwoFactorEnabled'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
										<div className='space-y-0.5'>
											<FormLabel>
												Two-Factor Authentication
											</FormLabel>
											<FormDescription>
												Enable two-factor authentication for your account
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button type='submit' disabled={isLoadingUpdate || isLoading}>
								Save
							</Button>
						</form>
					</Form>
				)}
			</CardContent>
		</Card>
	)
}
