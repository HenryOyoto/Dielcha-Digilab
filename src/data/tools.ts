import kicad from "@/assets/tools/kicad.svg";
import easyeda from "@/assets/tools/easyeda.svg";
import circuitmaker from "@/assets/tools/circuitmaker.svg";
import proteus from "@/assets/tools/proteus.svg";
import ltspice from "@/assets/tools/ltspice.svg";
import arduino from "@/assets/tools/arduino.svg";
import esp32 from "@/assets/tools/esp32-chip.jpg";
import stm32 from "@/assets/tools/stm32.png";
import raspberryPi from "@/assets/tools/raspberry-pi.webp";
import cLang from "@/assets/tools/c-lang.png";
import cppLang from "@/assets/tools/cpp-lang.png";
import wokwi from "@/assets/tools/wokwi.svg";
import firebase from "@/assets/tools/firebase.png";
import freecad from "@/assets/tools/freecad.svg";
import autocad from "@/assets/tools/autocad.svg";
import tinkercad from "@/assets/tools/tinkercad.svg";
import python from "@/assets/tools/python.svg";
import vscode from "@/assets/tools/vscode.svg";
import pycharm from "@/assets/tools/pycharm.svg";
import visualstudio from "@/assets/tools/visualstudio.svg";
import github from "@/assets/tools/github.svg";

export type Tool = { name: string; logo: string; /** Official website, so visitors can learn what the tool is. */ url: string };

export const tool = {
  kicad: { name: "KiCad", logo: kicad, url: "https://www.kicad.org/" },
  easyeda: { name: "EasyEDA", logo: easyeda, url: "https://easyeda.com/" },
  circuitmaker: { name: "CircuitMaker", logo: circuitmaker, url: "https://circuitmaker.com/" },
  proteus: { name: "Proteus", logo: proteus, url: "https://www.labcenter.com/" },
  ltspice: { name: "LTspice", logo: ltspice, url: "https://www.analog.com/en/resources/design-tools-and-calculators/ltspice-simulator.html" },
  arduino: { name: "Arduino", logo: arduino, url: "https://www.arduino.cc/" },
  esp32: { name: "ESP32", logo: esp32, url: "https://www.espressif.com/en/products/socs/esp32" },
  stm32: { name: "STM32", logo: stm32, url: "https://www.st.com/en/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html" },
  raspberryPi: { name: "Raspberry Pi", logo: raspberryPi, url: "https://www.raspberrypi.com/" },
  c: { name: "C", logo: cLang, url: "https://www.open-std.org/jtc1/sc22/wg14/" },
  cpp: { name: "C++", logo: cppLang, url: "https://isocpp.org/" },
  wokwi: { name: "Wokwi", logo: wokwi, url: "https://wokwi.com/" },
  firebase: { name: "Firebase", logo: firebase, url: "https://firebase.google.com/" },
  freecad: { name: "FreeCAD", logo: freecad, url: "https://www.freecad.org/" },
  autocad: { name: "AutoCAD", logo: autocad, url: "https://www.autodesk.com/products/autocad/overview" },
  tinkercad: { name: "Tinkercad", logo: tinkercad, url: "https://www.tinkercad.com/" },
  python: { name: "Python", logo: python, url: "https://www.python.org/" },
  vscode: { name: "VS Code", logo: vscode, url: "https://code.visualstudio.com/" },
  pycharm: { name: "PyCharm", logo: pycharm, url: "https://www.jetbrains.com/pycharm/" },
  visualstudio: { name: "Visual Studio", logo: visualstudio, url: "https://visualstudio.microsoft.com/" },
  github: { name: "GitHub", logo: github, url: "https://github.com/" },
} satisfies Record<string, Tool>;

export type ToolKey = keyof typeof tool;

export const toolGroups: { title: string; blurb: string; tone: "blue" | "green" | "yellow" | "red"; keys: ToolKey[] }[] = [
  {
    title: "Circuits & PCB",
    blurb: "Schematics, board layout and circuit simulation.",
    tone: "blue",
    keys: ["kicad", "easyeda", "circuitmaker", "proteus", "ltspice"],
  },
  {
    title: "Embedded & IoT",
    blurb: "Boards, firmware and the cloud services behind them.",
    tone: "green",
    keys: ["arduino", "esp32", "stm32", "raspberryPi", "c", "cpp", "wokwi", "firebase"],
  },
  {
    title: "Product & enclosure CAD",
    blurb: "3D enclosures, parts and technical drawings.",
    tone: "yellow",
    keys: ["freecad", "autocad", "tinkercad"],
  },
  {
    title: "Software & sharing",
    blurb: "Code, dashboards and clean handover of project files.",
    tone: "red",
    keys: ["python", "vscode", "pycharm", "visualstudio", "github"],
  },
];

const byName = new Map<string, Tool>(Object.values(tool).map((t) => [t.name.toLowerCase(), t]));

/** Finds a tool by its display name, so a project's technology list can show logos where we have them. */
export const findTool = (name: string): Tool | undefined => byName.get(name.toLowerCase());
