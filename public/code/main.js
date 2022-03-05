var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HtmlInfo } from "./html.js";
const initApp = () => __awaiter(void 0, void 0, void 0, function* () {
    const nav = navigator;
    const batteryManager = yield nav.getBattery();
    const htmlInfo = new HtmlInfo();
    const update = () => htmlInfo.update(batteryManager);
    update();
    batteryManager.onchargingchange = update;
    batteryManager.onchargingtimechange = update;
    batteryManager.ondischargingtimechange = update;
    batteryManager.onlevelchange = update;
});
window.onload = initApp;
