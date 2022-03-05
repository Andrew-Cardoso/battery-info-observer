import { HtmlInfo } from "./html.js";
import { ExtendedNavigator } from "./types";

const initApp = async () => {
  const nav = navigator as ExtendedNavigator;
  const batteryManager = await nav.getBattery();

  const htmlInfo = new HtmlInfo();

  const update = () => htmlInfo.update(batteryManager);
  update();

  batteryManager.onchargingchange = update;
  batteryManager.onchargingtimechange = update;
  batteryManager.ondischargingtimechange = update;
  batteryManager.onlevelchange = update;
};

window.onload = initApp;
