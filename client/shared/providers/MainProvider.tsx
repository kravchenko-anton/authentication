'use client';

import { type PropsWithChildren } from 'react'
import {Toaster} from "sonner";

import { TanstackQueryProvider, ThemeProvider } from './index'

export function MainProvider({ children }: PropsWithChildren<unknown>) {
	return (
		<ThemeProvider>
			<TanstackQueryProvider>
				<Toaster position='bottom-right' />
				{children}
			</TanstackQueryProvider>
		</ThemeProvider>
	)
}
