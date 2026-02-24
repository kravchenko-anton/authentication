'use client'

import { Button, Separator } from '@/components/ui'

export function AuthSocial() {
	const onClick = () => {
		const serverUrl = process.env.SERVER_URL
		if (!serverUrl) {
			console.error('SERVER_URL is not configured')
			return
		}
		
		window.location.href = `${serverUrl}/auth/oauth/connect/google`
	}
	
	return (
		<>
			<div className='relative my-6'>
				<div className='absolute inset-0 flex items-center'>
					<Separator />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-card px-2 text-muted-foreground font-medium'>
						Or
					</span>
				</div>
			</div>
			
			<div className='flex w-full flex-col space-y-4'>
				<Button onClick={onClick} variant='outline'>
					<div className='mr-2 size-4'>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google"
						     viewBox="0 0 16 16">
							<path
								d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
						</svg>
					</div>
					Google
				</Button>
			</div>
		</>
	)
}
