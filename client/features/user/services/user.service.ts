import { IUser } from '@/features/auth/types'

import { api } from '@/shared/api'

import { TypeSettingsSchema } from '../schemes'

class UserService {
	public async findProfile() {
		return await api.get<IUser>('users/profile')
	}

	public async updateProfile(body: TypeSettingsSchema) {
		return await api.patch<IUser>('users/profile', body)
	}
}

export const userService = new UserService()
