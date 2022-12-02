import React from "react";
import useSize from "@react-hook/size";
import { mergeRefs } from "react-merge-refs";
import { useSpring, to, animated } from "@react-spring/web";

const SmoothScrollFwd = React.forwardRef(SmoothScroll);

export { SmoothScrollFwd as SmoothScroll };

function SmoothScroll({ children, className }, ref) {
  const immediateFlagRef = React.useRef(false);
  const actualScrollRef = React.useRef(null);
  const animatedscrollHeightRef = React.useRef(null);
  const scrollHeightRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const [, scrollHeight] = useSize(contentRef);
  const [spring, api] = useSpring(() => ({
    x: 0,
    y: 0,
    onChange({ value }) {
      animatedscrollHeightRef.current.scrollTop = value.y;
      animatedscrollHeightRef.current.scrollLeft = value.x;
    }
  }));

  return (
    <div
      {...{ className, ref }}
      ref={mergeRefs([ref, actualScrollRef])}
      onScroll={handleScroll}
      style={{
        display: "grid",
        gridTemplateRows: "100% 1fr",
        overflow: "auto",
        WebkitOverflowScrolling: "auto"
      }}
    >
      <div
        ref={scrollHeightRef}
        style={{
          gridArea: "1 / 1 / -1 / -1",
          height: scrollHeight + "px"
        }}
      />
      <animated.div
        onScroll={handleBrowserScroll}
        ref={animatedscrollHeightRef}
        style={{
          position: "sticky",
          top: 0,
          gridArea: "1 / 1 / 1 / -1",
          height: "100%",
          overflow: "hidden"
        }}
      >
        <div ref={contentRef}>{children}</div>
      </animated.div>
    </div>
  );

  function handleScroll(e) {
    const { scrollLeft, scrollTop } = e.currentTarget;

    window.history.replaceState({
      ...window.history.state,
      __scrollTop: scrollTop,
      __scrollLeft: scrollLeft
    });

    api.start({
      x: scrollLeft,
      y: scrollTop
      // immediate: immediateFlagRef.current
    });

    immediateFlagRef.current = false;
  }

  function handleBrowserScroll(e) {
    const { scrollLeft: left, scrollTop: top } = e.currentTarget;
    const x = parseInt(spring.x.get(), 10);
    const y = parseInt(spring.y.get(), 10);

    e.currentTarget.scrollLeft = x;
    e.currentTarget.scrollTop = y;

    if (x === Math.floor(left) && y === Math.floor(top)) return;

    e.currentTarget.parentElement.scrollTo({ left, top });
  }
}
