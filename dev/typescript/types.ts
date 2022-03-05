export interface BatteryManager {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  onchargingchange?: () => any;
  onchargingtimechange?: () => any;
  ondischargingtimechange?: () => any;
  onlevelchange?: () => any;
}
export interface ExtendedNavigator extends Navigator {
  getBattery: () => Promise<BatteryManager>;
}

export type InfoClass = "charging" | "chargingTime" | "dischargingTime" | "level";