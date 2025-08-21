"use client"

import React from 'react'
import dynamic from 'next/dynamic'

// Lazy import shared UI only on client
const DemoButton = dynamic(() => import('../../components/DemoSharedButton'), { ssr: false })

export default function DemoSharedPage() {
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Shared UI Demo</h1>
			<DemoButton />
		</div>
	)
}
