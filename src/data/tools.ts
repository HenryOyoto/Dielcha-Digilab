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

export type Tool = { name: string; logo: string };

export const tool = {
  kicad: { name: "KiCad", logo: kicad },
  easyeda: { name: "EasyEDA", logo: easyeda },
  circuitmaker: { name: "CircuitMaker", logo: circuitmaker },
  proteus: { name: "Proteus", logo: proteus },
  ltspice: { name: "LTspice", logo: ltspice },
  arduino: { name: "Arduino", logo: arduino },
  esp32: { name: "ESP32", logo: esp32 },
  stm32: { name: "STM32", logo: stm32 },
  raspberryPi: { name: "Raspberry Pi", logo: raspberryPi },
  c: { name: "C", logo: cLang },
  cpp: { name: "C++", logo: cppLang },
  wokwi: { name: "Wokwi", logo: wokwi },
  firebase: { name: "Firebase", logo: firebase },
  freecad: { name: "FreeCAD", logo: freecad },
  autocad: { name: "AutoCAD", logo: autocad },
  tinkercad: { name: "Tinkercad", logo: tinkercad },
  python: { name: "Python", logo: python },
  vscode: { name: "VS Code", logo: vscode },
  pycharm: { name: "PyCharm", logo: pycharm },
  visualstudio: { name: "Visual Studio", logo: visualstudio },
  github: { name: "GitHub", logo: github },
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
