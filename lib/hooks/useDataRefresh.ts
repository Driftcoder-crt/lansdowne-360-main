"use client"

import { useEffect, useRef } from 'react'

/**
 * Custom hook for automatic data refresh
 * Provides real-time data synchronization between admin and frontend
 */
export function useDataRefresh(
  refreshFunction: () => void,
  intervalMs: number = 30000, // Default 30 seconds
  dependencies: any[] = []
) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isActiveRef = useRef(true)

  useEffect(() => {
    // Initial fetch
    refreshFunction()

    // Set up interval for periodic refresh
    intervalRef.current = setInterval(() => {
      if (isActiveRef.current) {
        console.log('Auto-refreshing data...')
        refreshFunction()
      }
    }, intervalMs)

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, dependencies)

  // Pause/resume functionality
  const pauseRefresh = () => {
    isActiveRef.current = false
  }

  const resumeRefresh = () => {
    isActiveRef.current = true
  }

  // Manual refresh
  const manualRefresh = () => {
    console.log('Manual data refresh triggered')
    refreshFunction()
  }

  return {
    pauseRefresh,
    resumeRefresh,
    manualRefresh
  }
}

/**
 * Hook for handling visibility change to pause/resume refresh
 */
export function useVisibilityRefresh(
  refreshFunction: () => void,
  intervalMs: number = 30000
) {
  const { pauseRefresh, resumeRefresh, manualRefresh } = useDataRefresh(
    refreshFunction,
    intervalMs
  )

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseRefresh()
      } else {
        resumeRefresh()
        // Refresh immediately when tab becomes visible
        manualRefresh()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return { manualRefresh }
}