export function average(dt, state, config) {
  const { weight = 10 } = config
  
  const value = (state.value + state.target * weight * dt) / (1 + weight * dt)

  return {
    value,
    velocity: 0,
  }
}
