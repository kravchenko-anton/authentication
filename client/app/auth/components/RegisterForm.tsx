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

import { useRegisterMutation } from '@/shared/hooks/auth'
import { RegisterSchema, TypeRegisterSchema } from '@/shared/schemas/auth'

import { AuthSocial } from './AuthSocial'

export function RegisterForm() {
	const requiresRecaptcha = Boolean(process.env.GOOGLE_RECAPTCHA_SITE_KEY)
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const form = useForm<TypeRegisterSchema>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: ''
		}
	})

	const { register, isLoadingRegister, isSuccess } = useRegisterMutation()

	const onSubmit = (values: TypeRegisterSchema) => {
		if (!requiresRecaptcha || recaptchaValue) {
			register({ values, recaptcha: recaptchaValue ?? '' })
		} else {
			toast.error('Please complete reCAPTCHA')
		}
	}

	if (isSuccess) {
		return (
			<Card>
				<CardHeader className='space-y-2'>
					<CardTitle>Check your email</CardTitle>
					<CardDescription>
						We&apos;ve sent a verification link to your email address.
						Please check your inbox and click the link to verify your account.
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<Button variant='link' className='w-full font-normal'>
						<Link href='/auth/login'>Back to sign in</Link>
					</Button>
				</CardFooter>
			</Card>
		)
	}

	return (
		<Card>
			<CardHeader className='space-y-2'>
				<CardTitle>Sign Up</CardTitle>
				<CardDescription>Create an account to get started</CardDescription>
			</CardHeader>
			<CardContent>
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
											disabled={isLoadingRegister}
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
											disabled={isLoadingRegister}
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
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder='******'
											disabled={isLoadingRegister}
											type='password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='passwordRepeat'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											placeholder='******'
											disabled={isLoadingRegister}
											type='password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{requiresRecaptcha && (
							<GoogleReCaptcha onVerify={setRecaptchaValue} />
						)}
						<Button type='submit' disabled={isLoadingRegister}>
							Create account
						</Button>
					</form>
				</Form>
				<AuthSocial />
			</CardContent>

			<CardFooter>
				<Button variant='link' className='w-full font-normal'>
					<Link href='/auth/login'>Already have an account? Sign in</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
