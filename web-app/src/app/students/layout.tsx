import type { Metadata } from 'next'
import { metadataFor } from '@/lib/next-metadata'

export const metadata: Metadata = metadataFor('students', '/students')

export default function StudentsLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement
}
