'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import {GoogleReCaptcha} from "react-google-recaptcha-v3";
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

import { useResetPasswordMutation } from '../hooks'
import { ResetPasswordSchema, TypeResetPasswordSchema } from '../schemes'

export function ResetPasswordForm() {
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const form = useForm<TypeResetPasswordSchema>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: ''
		}
	})

	const { reset, isLoadingReset } = useResetPasswordMutation()

	const onSubmit = (values: TypeResetPasswordSchema) => {
		if (recaptchaValue) {
			reset({ values, recaptcha: recaptchaValue })
		} else {
			toast.error('Please complete reCAPTCHA')
		}
	}

	return (
		<Card>
			<CardHeader className='space-y-2'>
				<CardTitle>Reset Password</CardTitle>
				<CardDescription>Enter your email to reset your password</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid gap-1.5'
					>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder='john@example.com'
											disabled={isLoadingReset}
											type='email'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex justify-center'>
							<GoogleReCaptcha
								onVerify={setRecaptchaValue}
							/>
						</div>
						<Button type='submit' disabled={isLoadingReset}>
							Reset password
						</Button>
					</form>
				</Form>
			</CardContent>

			<CardFooter>
				<Button variant='link' className='w-full font-normal'>
					<Link href='/auth/login'>Back to sign in</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
