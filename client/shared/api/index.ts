import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
	baseURL: process.env.SERVER_URL as string,
	withCredentials: true,
})

const getCookie = (name: string) => {
	if (typeof document === 'undefined') return null
	const match = document.cookie.match(
		new RegExp('(^| )' + name + '=([^;]+)'),
	)
	return match ? decodeURIComponent(match[2]) : null
}

instance.interceptors.request.use((config) => {
	if (typeof window !== 'undefined') {
		const method = (config.method || 'get').toLowerCase()
		if (!['get', 'head', 'options'].includes(method)) {
			const token = getCookie('csrf_token')
			if (token) {
				config.headers = config.headers ?? {}
				config.headers['X-CSRF-Token'] = token
			}
		}
	}
	return config
})

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		const message =
			error?.response?.data?.message ||
			error?.message ||
			'Request failed'
		return Promise.reject(new Error(message))
	},
)

export const api = {
	get: async <T>(endpoint: string, config?: AxiosRequestConfig) =>
		(await instance.get<T>(endpoint, config)).data,
	post: async <T>(
		endpoint: string,
		data?: Record<string, any>,
		config?: AxiosRequestConfig,
	) => (await instance.post<T>(endpoint, data, config)).data,
	patch: async <T>(
		endpoint: string,
		data?: Record<string, any>,
		config?: AxiosRequestConfig,
	) => (await instance.patch<T>(endpoint, data, config)).data,
	delete: async <T>(endpoint: string, config?: AxiosRequestConfig) =>
		(await instance.delete<T>(endpoint, config)).data,
}
