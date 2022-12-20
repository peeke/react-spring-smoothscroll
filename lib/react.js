import React from 'react'
import { SmooshScroll } from './core'

export function useSmooshScroll(initTransition) {
  React.useEffect(
    () => new SmooshScroll({ transition: initTransition() }), 
    []
  )
}
