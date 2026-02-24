"use client";
import {ReactNode} from "react";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";

export const ReCaptchaProvider = ({ children }: { children: ReactNode }) => {
	return  <GoogleReCaptchaProvider
		reCaptchaKey={process.env.GOOGLE_RECAPTCHA_SITE_KEY || ''}>
		{children}
	</GoogleReCaptchaProvider>
}