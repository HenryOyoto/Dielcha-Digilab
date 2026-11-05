import kicad from "@/assets/kicad.svg";
import easyeda from "@/assets/easyeda.svg";
import autocad from "@/assets/autocad.svg";
import fusion360 from "@/assets/fusion360.svg";
import python from "@/assets/python.svg";
import cpp from "@/assets/cpp-lang.png";
import arduino from "@/assets/arduino.svg";
import esp32 from "@/assets/esp32.jpg";
import stm32 from "@/assets/stm32.png";
import wokwi from "@/assets/wokwi.svg";
import github from "@/assets/github.svg";

const tools = [
  { name: "KiCad", logo: kicad },
  { name: "EasyEDA", logo: easyeda },
  { name: "AutoCAD", logo: autocad },
  { name: "Fusion 360", logo: fusion360 },
  { name: "Python", logo: python },
  { name: "C++", logo: cpp },
  { name: "Arduino", logo: arduino },
  { name: "ESP32", logo: esp32 },
  { name: "STM32", logo: stm32 },
  { name: "Wokwi", logo: wokwi },
  { name: "GitHub", logo: github },
];

/**
 * Tools strip: scrolls left to right, pauses while the pointer is over it, and each tool blinks gently.
 * The list is rendered twice so the loop is seamless; the copy is hidden from assistive tech.
 */
export function ToolsStrip() {
  return (
    <section className="tools" aria-label="Tools we work with">
      <div className="tools__track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="tools__list" aria-hidden={copy === 1}>
            {tools.map((t, i) => (
              <li key={t.name} className="tools__item" style={{ animationDelay: `${(i % 6) * 0.45}s` }}>
                <img src={t.logo} alt="" className="tools__logo" loading="lazy" decoding="async" />
                <span>{t.name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
