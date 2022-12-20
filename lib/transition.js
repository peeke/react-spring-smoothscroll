export function Transition(simulate, { maxFrameDuration = 100, ...config } = {}) {
  const state = {
    value: 0,
    velocity: 0,
    target: 0,
    timestamp: performance.now(),
  }

  return {
    set(target) {
      Object.assign(state, { target })
    },
    setImmediate(target) {
      Object.assign(state, { value: target, target, velocity: 0, timestamp: performance.now() })
    },
    get(t) {
      if (isFinished()) return state.target

      const dt = (t - state.timestamp) / 1000
      Object.assign(state, simulate(dt, state, config))

      state.timestamp = t

      return state.value
    },
    isFinished,
    get target() { return state.target }
  }

  function isFinished() {
    return state.velocity < 0.5 && Math.abs(state.target - state.value) < 0.5
  }
}

