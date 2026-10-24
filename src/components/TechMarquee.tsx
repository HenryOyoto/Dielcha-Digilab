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

export const items = [
  "KiCad", "EasyEDA", "AutoCAD", "Fusion 360", "Python", "C", "C++", "PyCharm",
  "VS Code", "Visual Studio", "GitHub", "Proteus", "Multisim", "MATLAB", "LTspice",
  "Tinkercad", "Wokwi", "ThingSpeak", "Arduino", "ESP32", "Raspberry Pi", "STM32",
  "Firebase", "Lovable.dev",
];

/** Continuous right-to-left strip of every tool and technology, using the real logo files. */
export function TechMarquee() {
  const loop = [...items, ...items];
  return (
    <section className="marquee" aria-label="Tools and technologies">
      <div className="marquee__track">
        {loop.map((name, i) => {
          const icon = icons[name];
          return (
            <div key={`${name}-${i}`} className="marquee__item" aria-hidden={i >= items.length}>
              {icon ? <img src={icon} alt="" className="marquee__logo" loading="lazy" decoding="async" /> : null}
              <span className="marquee__name">{name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
