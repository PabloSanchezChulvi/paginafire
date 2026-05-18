'use client'
import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

interface Props {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal'
  className?: string
}

// Sustituye ca-pub-XXXXXXXXXXXXXXXX por tu Publisher ID de AdSense
const ADSENSE_CLIENT = 'ca-pub-3507033817568785'

export function AdSenseSlot({ slot, format = 'auto', className = '' }: Props) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
      }
    } catch {
      // AdSense not yet loaded
    }
  }, [])

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  )
}
