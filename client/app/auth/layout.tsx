import React from 'react'
export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='min-h-screen flex items-center justify-center'>
					<div className='max-w-[520px] lg:max-w-115'>{children}</div>
		</div>
	)
}
