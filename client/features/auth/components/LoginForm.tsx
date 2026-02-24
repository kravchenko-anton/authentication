'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/components/ui'
import { useLoginMutation } from '@/features/auth/hooks'
import { LoginSchema, TypeLoginSchema } from '@/features/auth/schemes'

import { AuthSocial } from './AuthSocial'

export function LoginForm() {
	const [isShowTwoFactor, setIsShowFactor] = useState(false)
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { login, isLoadingLogin } = useLoginMutation(setIsShowFactor)

	const onSubmit = (values: TypeLoginSchema) => {
		if (recaptchaValue) {
			login({ values, recaptcha: recaptchaValue })
		} else {
			toast.error('Please complete reCAPTCHA')
		}
	}

	return (
		<Card>
			<CardHeader className='space-y-2'>
				<CardTitle>Sign In</CardTitle>
				<CardDescription>
					Welcome back! Please enter your details to sign in to your account.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid gap-2 space-y-2'
					>
						{isShowTwoFactor && (
							<FormField
								control={form.control}
								name='code'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Code</FormLabel>
										<FormControl>
											<Input
												placeholder='123456'
												disabled={isLoadingLogin}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{!isShowTwoFactor && (
							<>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													placeholder='john@example.com'
													disabled={isLoadingLogin}
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
									name='password'
									render={({ field }) => (
										<FormItem>
											<div className='flex items-center justify-between'>
												<FormLabel>Password</FormLabel>
												<Link
													href='/auth/reset-password'
													className='ml-auto inline-block text-sm underline'
												>
													Forgot your password?
												</Link>
											</div>
											<FormControl>
												<Input
													placeholder='******'
													disabled={isLoadingLogin}
													type='password'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
						<div className='flex justify-center'>
							<GoogleReCaptcha
								onVerify={setRecaptchaValue} />
						</div>
						<Button type='submit' disabled={isLoadingLogin}>
							Sign in to account
						</Button>
					</form>
				</Form>
				<AuthSocial />
			</CardContent>

			<CardFooter>
				<Button variant='link' className='w-full font-normal text-muted-foreground'>
					<Link href='/auth/register'>
						Don&apos;t have an account? Sign up
					</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
