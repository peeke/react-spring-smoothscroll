// Based on: https://stackoverflow.com/questions/47011055/smooth-vertical-scrolling-on-mouse-wheel-in-vanilla-javascript

export function SmooshScroll({ target = document.scrollingElement, transition }) {
  transition.setImmediate(target.scrollTop)
  
  let frameLoopRunning = false
  
	target.addEventListener('wheel', handleWheel, { passive: false })
  return () => { target.removeEventListener('wheel', handleWheel) }

	function handleWheel(e) {
		e.preventDefault() // disable default scrolling

    const wheelDelta = normalizeWheelDelta(e)
    const overscrolling = (
      (wheelDelta <= 0 && transition.target === 0) || 
      (wheelDelta >= 0 && transition.target === target.scrollHeight - scrollingWindowHeight())
    )
    
    if (!overscrolling) e.stopPropagation()

    // Ensure scrollbehavior is auto when scrolling
    target.style.scrollBehavior = 'auto'
    target.scrollTop

    if (!frameLoopRunning) {
      transition.setImmediate(target.scrollTop)
    }

    transition.set(clamp({
      left: 0, 
      right: target.scrollHeight - scrollingWindowHeight(),
      input: transition.target + wheelDelta
    }))
		
    if (!frameLoopRunning) requestFrame(performance.now())
	}

	function normalizeWheelDelta(e){
		switch (e.deltaMode) {
      case e.DOM_DELTA_PIXEL: return e.deltaY
      case e.DOM_DELTA_LINE: return e.deltaY * 16
      case e.DOM_DELTA_PAGE: return e.deltaY * scrollingWindowHeight()
    }
	}

	function requestFrame(t) {
    frameLoopRunning = true
		target.scrollTop = transition.get(t)
    
		if (transition.isFinished()) {
      target.style.scrollBehavior = ''
      frameLoopRunning = false
    } else requestAnimationFrame(requestFrame)
	}

  function scrollingWindowHeight() {
    return target === document.scrollingElement
      ? target.clientHeight
      : target.offsetHeight
  }
}


function clamp({ left, right, input }) {
  const min = Math.min(left, right)
  const max = Math.max(left, right)
  return Math.min(max, Math.max(min, input))
}
