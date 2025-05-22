// app/providers.tsx

'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST

export default function PostHogClientProvider({ children, isProduction }: { children: React.ReactNode, isProduction: boolean }) {
  useEffect(() => {
    if (isProduction && POSTHOG_KEY && POSTHOG_HOST) {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: 'identified_only',
        capture_pageview: false,
        capture_pageleave: true,
      })
    }
  }, [isProduction])

  if (!isProduction) return children
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}