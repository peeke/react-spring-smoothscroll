import React from 'react'
import { SmooshScroll } from './core'

export function useSmooshScroll(initializeTransition) {
  const cleanupRef = React.useRef(null)

  return React.useCallback(node => {
    if (node) {
      cleanupRef.current = new SmooshScroll({ target: node, transition: initializeTransition() })
    } else if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }
  })
}

export function useSmooshScrollDocument(initializeTransition) {
  React.useEffect(
    () => new SmooshScroll({ transition: initializeTransition() }), 
    []
  )
}
