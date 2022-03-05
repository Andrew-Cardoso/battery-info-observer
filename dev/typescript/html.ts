import { BatteryManager, InfoClass } from "./types";

export class HtmlInfo {
    private infoSection: HTMLElement;
    constructor() {
      this.infoSection = document.getElementById("info")!;
    }
  
    update({ charging, chargingTime, dischargingTime, level }: BatteryManager) {
      this.charging = charging;
      this.chargingTime = chargingTime;
      this.dischargingTime = dischargingTime;
      this.level = level;
      this.updateBattery(charging, level);
      console.log('updated');
    }
  
    private getEl(infoClass: InfoClass) {
      return this.infoSection.querySelector(`.${infoClass}`)!;
    }
  
    private set charging(isCharging: boolean) {
      this.getEl("charging").innerHTML = isCharging
        ? "Carregando"
        : "Carregador desconectado";
    }
  
    private set chargingTime(timeUntilFullCharge: number) {
      const text = !Number.isFinite(timeUntilFullCharge)
          ? 'Indefinido'
          : timeUntilFullCharge === 0
              ? 'Carregado'
              : this.getTimeUntilMessage(timeUntilFullCharge);
  
      this.getEl("chargingTime").innerHTML = text;
    }
  
    private set dischargingTime(timeUntilDischarge: number) {
      const text = !Number.isFinite(timeUntilDischarge)
          ? 'Indefinido'
          : timeUntilDischarge === 0
              ? 'Descarregado'
              : this.getTimeUntilMessage(timeUntilDischarge)
  
      this.getEl("dischargingTime").innerHTML = text;
    }
  
    private set level(batteryLevel: number) {
      this.getEl("level").innerHTML = this.percentage(batteryLevel);
    }
  
    private createChargeStringTemplate(height = 25) {
      return `<section class="charge" style="flex: ${height / 100} 4 auto;"}></section>`;
    }
  
    private getCharges(n: number) {
      let stringTemplate = "";
      for (let i = 0; i < Math.floor(n / 25); i++)
        stringTemplate += this.createChargeStringTemplate();
  
      const mod = n % 25;
  
      mod && (stringTemplate = this.createChargeStringTemplate(mod) + stringTemplate);
  
      return stringTemplate;
    }
  
    private updateBattery(charging: boolean, level: number) {
      const batteryHtml = document.getElementById("battery")!;
      const percentageLevel = level * 100;
  
      const charges = this.getCharges(percentageLevel);
  
      batteryHtml.innerHTML = charges;
    }
  
    private percentage(n: number) {
      return `${Math.round(n * 100)}%`;
    }
  
    private getTimeUntilMessage(timeInSeconds: number): string {
      if (timeInSeconds < 60) 
          return Math.floor(timeInSeconds) + " segundos";
  
      if (timeInSeconds < 3600)
        return `${Math.floor(
          timeInSeconds / 60
        )} minutos e ${this.getTimeUntilMessage(timeInSeconds % 60)}`;
  
      const timeInMinutes = timeInSeconds / 60;
      return `${Math.floor(timeInMinutes / 60)} hora(s), ${this.getTimeUntilMessage(timeInMinutes % 60)}`;
    }
  }