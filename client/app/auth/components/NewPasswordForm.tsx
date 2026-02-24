'use client'

import { useNewPasswordMutation } from '@/shared/hooks/auth'
import { NewPasswordSchema, TypeNewPasswordSchema } from '@/shared/schemas/auth'
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


export function NewPasswordForm() {
	const requiresRecaptcha = Boolean(process.env.GOOGLE_RECAPTCHA_SITE_KEY)
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
	const form = useForm<TypeNewPasswordSchema>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: ''
		}
	})

	const { newPassword, isLoadingNew } = useNewPasswordMutation()
	
	const onSubmit = (values: TypeNewPasswordSchema) => {
		if (!requiresRecaptcha || recaptchaValue) {
			newPassword({ values, recaptcha: recaptchaValue ?? '' })
		} else {
			toast.error('Please complete reCAPTCHA')
		}
	}

	return (
		<Card>
			<CardHeader className='space-y-2'>
				<CardTitle>New Password</CardTitle>
				<CardDescription>Create a new password for your account</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid gap-2 space-y-2'
					>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder='******'
											disabled={isLoadingNew}
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
						<Button type='submit' disabled={isLoadingNew}>
							Continue
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
