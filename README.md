# Smoosh Scroll
```yarn install smoosh-scroll```

2.57kb unminified, 910 bytes minified + gzipped

## Usage without react
```js
import { SmooshScroll, Transition, spring } from 'smoosh-scroll'

const cleanup = new SmooshScroll({
  target: someElement,
  transition: new Transition(spring)
})
```

Omitting the target, it defaults to using `document.scrollingElement`, making the entire document scroll smoothly.

```js
const cleanup = new SmooshScroll({
  transition: new Transition(spring)
})
```

## Usage with react
```js
import { useSmooshScrollDocument, Transition, spring } from 'smoosh-scroll'

useSmooshScrollDocument(() => new Transition(spring))
```

To make an element scroll smoothly, use `useSmooshScroll` and provide the returned `ref` to an element:

```js
import { useSmooshScrollDocument, Transition, spring } from 'smoosh-scroll'

const smooshRef = useSmooshScroll(() => new Transition(spring))

return (
  <div ref={smooshRef}>
    {/* Content */}
  </div>
)
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
- Horizontal scrolling
