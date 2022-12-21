# Smoosh Scroll
```yarn install smoosh-scroll```

2kb unminified, 839 bytes minified + gzipped

## Usage without react
```js
import { SmooshScroll, Transition, spring } from 'smoosh-scroll'

const cleanup = new SmooshScroll({
  transition: new Transition(spring)
})
```

## Usage with react
```js
import { useSmooshScroll, Transition, spring } from 'smoosh-scroll'

useSmooshScroll(() => new Transition(spring))
```

### Included transitions
```js
import { Transition, spring, average } from 'smoosh-scroll'

const springTransition = new Transition(spring, { stiffness: 700, friction: 0.3, mass: 3 })
const averageTransition = new Transition(average, { weight: 10 })
```

## How do I...
- Restore scroll position after navigating
- Navigate to id on hash change
- Make elements sticky
- Scroll programmatically

Smoosh Scroll animates the scroll position. Everything just works :)

## Roadmap
- Targets other than `document.scrollingElement`
- Horizontal scrolling
