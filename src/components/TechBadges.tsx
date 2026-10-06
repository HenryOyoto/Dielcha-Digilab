import { useEffect, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import kicad from "@/assets/kicad.svg";
import easyeda from "@/assets/easyeda.svg";
import proteus from "@/assets/proteus.svg";
import multisim from "@/assets/multisim.svg";
import matlab from "@/assets/matlab.svg";
import ltspice from "@/assets/ltspice.svg";
import autocad from "@/assets/autocad.svg";
import fusion360 from "@/assets/fusion360.svg";
import python from "@/assets/python.svg";
import pycharm from "@/assets/pycharm.svg";
import vscode from "@/assets/vscode.svg";
import visualstudio from "@/assets/visualstudio.svg";
import arduino from "@/assets/arduino.svg";
import esp32 from "@/assets/esp32.jpg";
import raspberrypi from "@/assets/raspberry-pi.webp";
import stm32 from "@/assets/stm32.png";
import tinkercad from "@/assets/tinkercad.svg";
import wokwi from "@/assets/wokwi.svg";
import thingspeak from "@/assets/thingspeak.png";
import firebase from "@/assets/firebase.png";
import lovable from "@/assets/lovable.png";
import github from "@/assets/github.svg";
import cLang from "@/assets/c-lang.png";
import cppLang from "@/assets/cpp-lang.png";

const icons: Record<string, string | undefined> = {
  KiCad: kicad, EasyEDA: easyeda, Proteus: proteus, Multisim: multisim,
  MATLAB: matlab, LTspice: ltspice, AutoCAD: autocad, "Fusion 360": fusion360,
  Python: python, PyCharm: pycharm, "VS Code": vscode, "Visual Studio": visualstudio,
  Arduino: arduino, ESP32: esp32, "Raspberry Pi": raspberrypi, STM32: stm32,
  Tinkercad: tinkercad, Wokwi: wokwi, ThingSpeak: thingspeak, Firebase: firebase,
  "Lovable.dev": lovable, GitHub: github, C: cLang, "C++": cppLang,
};

const items = [
  "KiCad", "EasyEDA", "AutoCAD", "Fusion 360", "Python", "C", "C++", "PyCharm",
  "VS Code", "Visual Studio", "GitHub", "Proteus", "Multisim", "MATLAB", "LTspice",
  "Tinkercad", "Wokwi", "ThingSpeak", "Arduino", "ESP32", "Raspberry Pi", "STM32",
  "Firebase", "Lovable.dev",
];

function Tool({ name, index }: { name: string; index: number }) {
  const icon = icons[name];
  return (
    <div className="tech-item" style={{ "--tech-delay": `${(index % 10) * 0.28}s` } as CSSProperties}>
      <div className="tech-item__icon" aria-hidden="true">
        {icon ? <img src={icon} alt="" className="tech-item__image" /> : <span className="tech-item__text">{name}</span>}
      </div>
      <span className="tech-item__name">{name}</span>
    </div>
  );
}

export function TechBadges() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackBarRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const dragRef = useRef({ active: false, startX: 0, startScrollLeft: 0, pointerId: null as number | null });

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!viewport || !track) return;

    let frame = 0;
    let last = performance.now();
    const pixelsPerSecond = 34;

    const getLoopWidth = () => Math.max(1, track.scrollWidth / 4);

    const updateThumb = () => {
      const loopWidth = getLoopWidth();
      if (!thumb) return;
      const progress = (((viewport.scrollLeft % loopWidth) + loopWidth) % loopWidth) / loopWidth;
      const thumbWidth = Math.max(12, Math.min(100, (viewport.clientWidth / loopWidth) * 100));
      thumb.style.width = `${thumbWidth}%`;
      thumb.style.left = `${progress * (100 - thumbWidth)}%`;
    };

    const step = (now: number) => {
      const delta = Math.min(64, now - last);
      last = now;
      const loopWidth = getLoopWidth();

      // This runs on desktop as well as mobile. Manual dragging/wheel/touch
      // pauses it temporarily, then the same continuous motion resumes.
      if (!pausedRef.current && !dragRef.current.active && loopWidth > 1) {
        viewport.scrollLeft += (pixelsPerSecond * delta) / 1000;
        if (viewport.scrollLeft >= loopWidth) viewport.scrollLeft -= loopWidth;
      }
      updateThumb();
      frame = requestAnimationFrame(step);
    };

    const onResize = () => updateThumb();
    window.addEventListener("resize", onResize);
    frame = requestAnimationFrame(step);
    updateThumb();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const pause = () => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const scheduleResume = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { pausedRef.current = false; }, 1800);
  };

  const onViewportPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    dragRef.current = { active: true, startX: e.clientX, startScrollLeft: viewport.scrollLeft, pointerId: e.pointerId };
    viewport.setPointerCapture(e.pointerId);
    pause();
  };

  const onViewportPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag.active || !viewport) return;
    viewport.scrollLeft = drag.startScrollLeft + (drag.startX - e.clientX);
  };

  const endViewportDrag = () => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag.active) return;
    dragRef.current.active = false;
    if (viewport && drag.pointerId !== null) {
      try { viewport.releasePointerCapture(drag.pointerId); } catch { /* already released */ }
    }
    scheduleResume();
  };


  const scrubTo = (clientX: number) => {
    const viewport = viewportRef.current;
    const bar = trackBarRef.current;
    if (!viewport || !bar) return;
    const rect = bar.getBoundingClientRect();
    const fraction = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const loopWidth = Math.max(1, (trackRef.current?.scrollWidth ?? 4) / 4);
    viewport.scrollLeft = fraction * loopWidth;
  };

  const onScrubPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    pause();
    scrubTo(e.clientX);
    dragRef.current = { active: true, startX: e.clientX, startScrollLeft: 0, pointerId: e.pointerId };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onScrubPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.active) scrubTo(e.clientX);
  };

  const onScrubPointerUp = () => {
    dragRef.current.active = false;
    scheduleResume();
  };

  return (
    <div className="tech-strip" aria-label="Tools and technologies">
      <div
        className="tech-strip__viewport"
        ref={viewportRef}
        onPointerDown={onViewportPointerDown}
        onPointerMove={onViewportPointerMove}
        onPointerUp={endViewportDrag}
        onPointerCancel={endViewportDrag}
        onPointerLeave={endViewportDrag}
        onTouchStart={pause}
        onTouchEnd={scheduleResume}
        onWheel={(e) => {
          pause();
          viewportRef.current?.scrollBy({ left: e.deltaY || e.deltaX, behavior: "auto" });
          scheduleResume();
        }}
      >
        <div className="tech-strip__track" ref={trackRef}>
          {[...items, ...items, ...items, ...items].map((name, index) => <Tool key={`${name}-${index}`} name={name} index={index} />)}
        </div>
      </div>

      <p className="tech-strip__hint">Scroll, drag or use the bar below to browse the full toolset.</p>

      <div
        className="tech-strip__scrubber"
        ref={trackBarRef}
        onPointerDown={onScrubPointerDown}
        onPointerMove={onScrubPointerMove}
        onPointerUp={onScrubPointerUp}
        onPointerCancel={onScrubPointerUp}
        role="scrollbar"
        aria-label="Scroll tools horizontally"
        aria-orientation="horizontal"
      >
        <div className="tech-strip__scrubber-thumb" ref={thumbRef} />
      </div>
    </div>
  );
}
