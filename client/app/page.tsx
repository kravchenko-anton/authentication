
import Link from 'next/link'

import { buttonVariants } from '@/components/ui'

export default function HomePage() {
  return (
    <div className='space-y-5 text-center h-screen flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold'>Home Page</h1>
      <Link href='/auth/login' className={buttonVariants()}>
        Sign in to account
      </Link>
    </div>
  )
}
