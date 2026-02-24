'use client';

import { type PropsWithChildren } from 'react'
import {Toaster} from "sonner";

import { TanstackQueryProvider } from './index'

export function MainProvider({ children }: PropsWithChildren<unknown>) {
	return (
			<TanstackQueryProvider>
				<Toaster position='bottom-right' />
				{children}
			</TanstackQueryProvider>
	)
}
