export class HtmlInfo {
    constructor() {
        this.infoSection = document.getElementById("info");
    }
    update({ charging, chargingTime, dischargingTime, level }) {
        this.charging = charging;
        this.chargingTime = chargingTime;
        this.dischargingTime = dischargingTime;
        this.level = level;
        this.updateBattery(charging, level);
        console.log('updated');
    }
    getEl(infoClass) {
        return this.infoSection.querySelector(`.${infoClass}`);
    }
    set charging(isCharging) {
        this.getEl("charging").innerHTML = isCharging
            ? "Carregando"
            : "Carregador desconectado";
    }
    set chargingTime(timeUntilFullCharge) {
        const text = !Number.isFinite(timeUntilFullCharge)
            ? 'Indefinido'
            : timeUntilFullCharge === 0
                ? 'Carregado'
                : this.getTimeUntilMessage(timeUntilFullCharge);
        this.getEl("chargingTime").innerHTML = text;
    }
    set dischargingTime(timeUntilDischarge) {
        const text = !Number.isFinite(timeUntilDischarge)
            ? 'Indefinido'
            : timeUntilDischarge === 0
                ? 'Descarregado'
                : this.getTimeUntilMessage(timeUntilDischarge);
        this.getEl("dischargingTime").innerHTML = text;
    }
    set level(batteryLevel) {
        this.getEl("level").innerHTML = this.percentage(batteryLevel);
    }
    createChargeStringTemplate(height = 25) {
        return `<section class="charge" style="flex: ${height / 100} 4 auto;"}></section>`;
    }
    getCharges(n) {
        let stringTemplate = "";
        for (let i = 0; i < Math.floor(n / 25); i++)
            stringTemplate += this.createChargeStringTemplate();
        const mod = n % 25;
        mod && (stringTemplate = this.createChargeStringTemplate(mod) + stringTemplate);
        return stringTemplate;
    }
    updateBattery(charging, level) {
        const batteryHtml = document.getElementById("battery");
        const percentageLevel = level * 100;
        const charges = this.getCharges(percentageLevel);
        batteryHtml.innerHTML = charges;
    }
    percentage(n) {
        return `${Math.round(n * 100)}%`;
    }
    getTimeUntilMessage(timeInSeconds) {
        if (timeInSeconds < 60)
            return Math.floor(timeInSeconds) + " segundos";
        if (timeInSeconds < 3600)
            return `${Math.floor(timeInSeconds / 60)} minutos e ${this.getTimeUntilMessage(timeInSeconds % 60)}`;
        const timeInMinutes = timeInSeconds / 60;
        return `${Math.floor(timeInMinutes / 60)} hora(s), ${this.getTimeUntilMessage(timeInMinutes % 60)}`;
    }
}
