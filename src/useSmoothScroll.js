// https://stackoverflow.com/questions/47011055/smooth-vertical-scrolling-on-mouse-wheel-in-vanilla-javascript
import React from 'react'

export function useSmoothScroll({ stiffness = 300, friction = 0.3, mass = 1, constrain = clamp }) {
  React.useEffect(
    () => new SmoothScroll({ stiffness, friction, mass, constrain }),
    [stiffness, friction, mass]
  )
}

function SmoothScroll({ stiffness, friction, mass, constrain = clamp }) {
  const target = document.scrollingElement
  const frame = document.scrollingElement === document.body && document.documentElement 
    ? document.documentElement 
    : document.scrollingElement // safari is the new IE

  const spring = new Spring({ 
    position: document.scrollingElement.scrollTop, 
    stiffness, 
    friction, 
    mass
  })
  let frameLoopRunning = false
  
	target.addEventListener('wheel', handleWheel, { passive: false })
  return () => { target.removeEventListener('wheel', handleWheel) }

	function handleWheel(e) {
		e.preventDefault(); // disable default scrolling

    target.style.scrollBehavior = 'auto'
    target.scrollTop

    if (!frameLoopRunning) {
      spring.setImmediate(document.scrollingElement.scrollTop)
    }

    spring.set(constrain({
      left: 0, 
      right: target.scrollHeight - frame.clientHeight,
      input: spring.target + normalizeWheelDelta(e)
    }))
		
    if (!frameLoopRunning) requestFrame()
	}

	function normalizeWheelDelta(e){
		switch (e.deltaMode) {
      case e.DOM_DELTA_PIXEL: return e.deltaY
      case e.DOM_DELTA_LINE: return e.deltaY * 16
      case e.DOM_DELTA_PAGE: return e.deltaY * frame.clientHeight
    }
	}

	function requestFrame() {
    frameLoopRunning = true
		target.scrollTop = spring.get()
    
		if (spring.inRest) {
      target.style.scrollBehavior = ''
      frameLoopRunning = false
    } else requestAnimationFrame(requestFrame)
	}
}

function Spring({ position, stiffness = 1, friction = 0, mass = 1 }) {
  const state = {
    position,
    velocity: 0,
    mass,
    target: position,
    timestamp: performance.now()
  }

  return {
    set(target) {
      Object.assign(state, { target, timestamp: performance.now() - 16 })
    },
    setImmediate(target) {
      Object.assign(state, { position: target, target, velocity: 0 })
    },
    get() {
      if (this.inRest) return state.target

      const timestamp = performance.now()
      simulate((timestamp - state.timestamp) / 1000)
      state.timestamp = timestamp

      return state.position
    },
    get inRest() {
      return state.velocity < 0.1 && Math.abs(state.target - state.position) < 0.5
    },
    get target() {
      return state.target
    }
  }
  
  function simulate(dt) {
    const d = state.position - state.target
    const f = -stiffness * d // Hooke's law
    const a = f / state.mass
    const v = (state.velocity + a * dt) * (1 - friction)

    Object.assign(state, {
      position: state.position + v * dt,
      velocity: v,
    })
  }
}

function clamp({ left, right, input }) {
  const min = Math.min(left, right)
  const max = Math.max(left, right)
  return Math.min(max, Math.max(min, input))
}
