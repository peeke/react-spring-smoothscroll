export function spring(dt, state, config) {
  const { stiffness = 700, friction = 0.3, mass = 3 } = config

  const d = state.value - state.target
  const f = -stiffness * d // Hooke's law
  const a = f / mass
  const v = (state.velocity + a * dt) * (1 - friction)

  return {
    value: state.value + v * dt,
    velocity: v,
  }
}
