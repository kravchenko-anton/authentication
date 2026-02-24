"use client";
import { ReactNode } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export const ReCaptchaProvider = ({ children }: { children: ReactNode }) => {
	const siteKey = process.env.GOOGLE_RECAPTCHA_SITE_KEY

	if (!siteKey) {
		return <>{children}</>
	}

	return (
		<GoogleReCaptchaProvider reCaptchaKey={siteKey}>
			{children}
		</GoogleReCaptchaProvider>
	)
}

