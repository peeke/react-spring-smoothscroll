export function Spring({ value, stiffness = 1, friction = 0, mass = 1, maxFrameDuration = 100 }) {
  const state = {
    value,
    velocity: 0,
    mass,
    target: value,
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

      simulate(
        Math.min(
          maxFrameDuration, 
          t - state.timestamp
        ) / 1000
      )

      state.timestamp = t

      return state.value
    },
    isFinished,
    get target() { return state.target }
  }

  function isFinished() {
    return state.velocity < 0.1 && Math.abs(state.target - state.value) < 0.5
  }
  
  function simulate(dt) {
    const d = state.value - state.target
    const f = -stiffness * d // Hooke's law
    const a = f / state.mass
    const v = (state.velocity + a * dt) * (1 - friction)

    Object.assign(state, {
      value: state.value + v * dt,
      velocity: v,
    })
  }
}

