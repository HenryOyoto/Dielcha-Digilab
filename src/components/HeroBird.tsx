import { useEffect, useRef } from "react";

type Mode = "away" | "wander" | "approach" | "pick" | "carry" | "exit";

/**
 * Decorative bird for the hero. It flies in from a screen edge, wanders on an irregular path,
 * swoops down to pick up a tiny chip, carries it off-screen, then returns for another.
 * Positions are written straight to the DOM each frame, so React never re-renders.
 */
export function HeroBird() {
  const rootRef = useRef<HTMLDivElement>(null);
  const birdRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current, bird = birdRef.current, face = faceRef.current, item = itemRef.current;
    if (!root || !bird || !face || !item) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { root.hidden = true; return; }

    let W = root.clientWidth, H = root.clientHeight;
    const sizeNow = () => Math.max(30, Math.min(46, W * 0.034));
    const applySize = () => {
      const s = sizeNow();
      bird.style.width = `${s}px`;
      bird.style.height = `${s * (2 / 3)}px`;
    };
    applySize();
    const ro = new ResizeObserver(() => { W = root.clientWidth; H = root.clientHeight; applySize(); });
    ro.observe(root);

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(root);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

    let mode: Mode = "away";
    let timer = 1.2;                 // short pause before the first entrance
    let x = -100, y = 0, vx = 0, vy = 0;
    let tx = 0, ty = 0, legs = 0;
    let facing = 1, phase = rand(0, 6);
    let spot = { x: 0, y: 0 };
    let carried = false;
    const ITEM = 18;

    const pickWanderTarget = () => {
      tx = rand(W * 0.08, W * 0.92);
      ty = rand(H * 0.08, H * 0.62);
      timer = rand(1.1, 2.3);
    };
    const placeItem = () => {
      // Upper-right area keeps the pickup clear of the headline and buttons.
      spot = { x: rand(W * 0.55, W * 0.88), y: rand(H * 0.2, H * 0.55) };
      item.style.transform = `translate3d(${spot.x - ITEM / 2}px, ${spot.y - ITEM / 2}px, 0)`;
      item.classList.remove("is-carried");
      item.style.opacity = "1";
      carried = false;
    };
    const enter = () => {
      const s = sizeNow();
      const fromLeft = Math.random() < 0.5;
      x = fromLeft ? -s * 2 : W + s * 2;
      y = rand(H * 0.1, H * 0.5);
      vx = fromLeft ? 150 : -150;
      vy = rand(-30, 30);
      legs = Math.round(rand(3, 4));
      pickWanderTarget();
      bird.style.opacity = "1";
      mode = "wander";
    };

    const steer = (now: number, speed: number, turn: number, dt: number) => {
      const dx = tx - x, dy = ty - y;
      const d = Math.hypot(dx, dy) || 1;
      // The weave fades near the target so landings stay accurate but travel stays irregular.
      const weave = Math.sin(now * 0.004 + phase) * 0.75 * Math.min(1, d / 220);
      const ang = Math.atan2(dy, dx) + weave;
      const k = Math.min(1, turn * dt);
      vx += (Math.cos(ang) * speed - vx) * k;
      vy += (Math.sin(ang) * speed - vy) * k;
      x += vx * dt;
      y += vy * dt;
      return d;
    };

    let last = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || W === 0) return;

      const s = sizeNow();
      const base = Math.max(110, W * 0.14) * (0.85 + 0.3 * Math.sin(now * 0.0013 + phase));

      switch (mode) {
        case "away":
          timer -= dt;
          if (timer <= 0) { placeItem(); enter(); }
          break;
        case "wander": {
          const d = steer(now, base, 2.4, dt);
          timer -= dt;
          if (timer <= 0 || d < 30) {
            legs -= 1;
            if (legs <= 0) { mode = "approach"; tx = spot.x; ty = spot.y; }
            else pickWanderTarget();
          }
          break;
        }
        case "approach": {
          const d = steer(now, Math.min(base * 1.15, 60 + Math.hypot(tx - x, ty - y) * 1.6), 3.4, dt);
          if (d < s * 0.45) { mode = "pick"; timer = 0.45; }
          break;
        }
        case "pick": {
          vx *= 1 - Math.min(1, 7 * dt);
          vy *= 1 - Math.min(1, 7 * dt);
          x += vx * dt; y += vy * dt + Math.sin(now * 0.03) * 0.25;
          timer -= dt;
          if (timer <= 0) {
            carried = true;
            item.classList.add("is-carried");
            mode = "carry"; legs = 2; pickWanderTarget();
          }
          break;
        }
        case "carry": {
          const d = steer(now, base * 0.95, 2.4, dt);
          timer -= dt;
          if (timer <= 0 || d < 30) {
            legs -= 1;
            if (legs <= 0) {
              mode = "exit";
              tx = x < W / 2 ? -s * 3 : W + s * 3;
              ty = rand(H * 0.05, H * 0.4);
            } else pickWanderTarget();
          }
          break;
        }
        case "exit":
          steer(now, base * 1.3, 2.2, dt);
          if (x < -s * 2.4 || x > W + s * 2.4) {
            mode = "away";
            carried = false;
            item.style.opacity = "0";
            bird.style.opacity = "0";
            timer = rand(2.5, 4.5);
          }
          break;
      }

      if (mode === "away") return;

      if (vx > 10) facing = 1; else if (vx < -10) facing = -1;
      const tilt = clamp(vy * 0.12, -28, 28) * facing;
      bird.style.transform = `translate3d(${x - s / 2}px, ${y - (s * 2) / 3 / 2}px, 0) rotate(${tilt}deg)`;
      face.style.transform = `scaleX(${facing})`;
      bird.classList.toggle("is-fast", mode === "exit" || mode === "pick" || mode === "approach");

      if (carried) {
        const bx = x + facing * s * 0.5, by = y + s * 0.1;
        item.style.transform = `translate3d(${bx - ITEM / 2}px, ${by - ITEM / 2}px, 0) rotate(${tilt}deg)`;
      }
    };

    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  return (
    <div ref={rootRef} className="hero-bird" aria-hidden="true">
      <div ref={itemRef} className="hero-bird__item">
        <span className="hero-bird__ring" />
        <svg viewBox="0 0 18 18" width="18" height="18">
          <path d="M4 2v3M7 2v3M11 2v3M14 2v3M4 13v3M7 13v3M11 13v3M14 13v3" stroke="#9db3c8" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="2.5" y="4.5" width="13" height="9" rx="2" fill="#12344f" stroke="#fff" strokeWidth="1" />
          <circle cx="6" cy="9" r="1.4" fill="#F0C000" />
        </svg>
      </div>
      <div ref={birdRef} className="hero-bird__bird">
        <div ref={faceRef} className="hero-bird__face">
          <svg viewBox="0 0 48 32" width="100%" height="100%" style={{ overflow: "visible" }}>
            <path d="M13 17 L1 11 L3 18 L1 24 Z" fill="#005090" />
            <path className="hero-bird__wing hero-bird__wing--back" d="M20 16 C11 8 9 0 15 -3 C22 0 23 9 20 16Z" fill="#0b3a66" />
            <ellipse cx="23" cy="19" rx="12" ry="7.5" fill="#F0C000" />
            <path d="M13 21 C17 27 29 27 34 21 C30 24 17 24 13 21Z" fill="#fff3b3" />
            <circle cx="34" cy="14" r="6" fill="#F0C000" />
            <path d="M39 12.500 L47 15 L39 17.500Z" fill="#D02020" />
            <circle cx="36.500" cy="12.800" r="1.800" fill="#fff" />
            <circle cx="37" cy="12.800" r="0.900" fill="#101010" />
            <path className="hero-bird__wing" d="M22 17 C14 8 12 -2 19 -4 C26 0 26 10 22 17Z" fill="#005090" />
            <path className="hero-bird__wing" d="M22 12 C20 8 19 4 19.500 -0.500" fill="none" stroke="#7fb2e5" strokeWidth="1.400" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
