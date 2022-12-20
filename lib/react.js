import React from 'react'
import { SmooshScroll } from './core'

export function useSmooshScroll(initTransition) {
  const [transition] = React.useState(initTransition)
  React.useEffect(() => new SmooshScroll({ transition }), [transition])
}
