import { toast } from 'sonner'

export function toastMessageHandler(error: unknown) {
	let message = 'Server error'

	 if (error instanceof Error) {
		message = error.message
	}

	const firstDotIndex = message.indexOf('.')

	if (firstDotIndex !== -1) {
		toast.error(message.slice(0, firstDotIndex), {
			description: message.slice(firstDotIndex + 1).trim()
		})
	} else {
		toast.error(message)
	}
}
