"use client";

import { GoogleReCaptchaProvider } from "@google-recaptcha/react";

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
	return (
		<GoogleReCaptchaProvider
			type="v2-invisible"
			siteKey="6LfH9HssAAAAAOCkC4Gcl-Vu2vtfTIJTUKuH4VrA"
			explicit={{ container: "recaptcha-container" }}
		>
			{children}
			<div id="recaptcha-container" />
		</GoogleReCaptchaProvider>
	);
}
