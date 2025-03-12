
import BatteryService from './BatteryService';
import { BatteryType } from '@/components/BatteryCard';

export interface BatteryGroup {
  name: string;
  batteries: BatteryType[];
  count: number;
}

export const getBatteryGroups = (): BatteryGroup[] => {
  const batteries = BatteryService.getBatteries();
  const groupsMap = new Map<string, BatteryType[]>();
  
  // Group batteries by name
  batteries.forEach(battery => {
    const existingGroup = groupsMap.get(battery.name) || [];
    groupsMap.set(battery.name, [...existingGroup, battery]);
  });
  
  // Convert map to array of groups
  const groups: BatteryGroup[] = [];
  groupsMap.forEach((batteries, name) => {
    groups.push({
      name,
      batteries,
      count: batteries.length
    });
  });
  
  // Sort groups alphabetically by name
  return groups.sort((a, b) => a.name.localeCompare(b.name));
};

export const getBatteryGroupByName = (name: string): BatteryGroup | undefined => {
  const batteries = BatteryService.getBatteries();
  const groupBatteries = batteries.filter(battery => battery.name === name);
  
  if (groupBatteries.length === 0) {
    return undefined;
  }
  
  return {
    name,
    batteries: groupBatteries,
    count: groupBatteries.length
  };
};
