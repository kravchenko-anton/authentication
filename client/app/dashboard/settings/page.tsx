import {SettingsForm} from "@/app/dashboard/components/SettingsForm";
import { type Metadata } from 'next'


export const metadata: Metadata = {
	title: 'Profile Settings'
}

export default function SettingsPage() {
	return <SettingsForm />
}
