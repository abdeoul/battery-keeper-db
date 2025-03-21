import { BatteryType } from '@/components/BatteryCard';
import { BATTERY_APPLICATIONS } from '@/constants/batteryData';

// Initial mock data
const initialBatteries: BatteryType[] = [
  {
    id: '1',
    name: 'AA Alkaline',
    type: 'Alkaline',
    voltage: 1.5,
    capacity: 2700,
    manufacturer: 'Duracell'
  },
  {
    id: '2',
    name: '18650',
    type: 'Lithium-ion',
    voltage: 3.7,
    capacity: 3500,
    manufacturer: 'Samsung'
  },
  {
    id: '3',
    name: 'CR2032',
    type: 'Lithium',
    voltage: 3.0,
    capacity: 240,
    manufacturer: 'Panasonic'
  },
  {
    id: '4',
    name: 'AAA Rechargeable',
    type: 'Ni-MH',
    voltage: 1.2,
    capacity: 800,
    manufacturer: 'Energizer'
  },
  {
    id: '5',
    name: 'D Cell',
    type: 'Alkaline',
    voltage: 1.5,
    capacity: 12000,
    manufacturer: 'Duracell'
  },
  {
    id: '6',
    name: '21700',
    type: 'Li-ion',
    voltage: 3.6,
    capacity: 5000,
    manufacturer: 'LG Chem'
  }
];

interface BatteryFormData {
  name: string;
  type: string;
  voltage: string;
  capacity: string;
  manufacturer: string;
  imageUrl: string;
  chemistry?: string;
  weight?: string;
  dimensions?: string;
  rechargeable?: string;
  maxDischarge?: string;
  operatingTemp?: string;
  internalResistance?: string;
  energyDensity?: string;
  selfDischargeRate?: string;
  applications?: string[];
  cycleLife?: string;
  minVoltage?: string;
  maxVoltage?: string;
}

class BatteryService {
  private static instance: BatteryService;
  private batteries: BatteryType[] = [];

  private constructor() {
    this.initializeBatteries();
  }

  public static getInstance(): BatteryService {
    if (!BatteryService.instance) {
      BatteryService.instance = new BatteryService();
    }
    return BatteryService.instance;
  }

  private initializeBatteries(): void {
    // Check if we have batteries in localStorage
    const storedBatteries = localStorage.getItem('batteries');
    if (storedBatteries) {
      this.batteries = JSON.parse(storedBatteries);
    } else {
      // Initialize with mock data if no stored batteries
      this.batteries = initialBatteries;
      this.saveBatteries();
    }
  }

  public getBatteries(): BatteryType[] {
    return this.batteries;
  }

  public getBatteryById(id: string): BatteryType | undefined {
    return this.batteries.find(battery => battery.id === id);
  }

  public removeBattery(id: string): boolean {
    const initialLength = this.batteries.length;
    this.batteries = this.batteries.filter(battery => battery.id !== id);
    
    // If the array length changed, we successfully removed a battery
    const success = initialLength > this.batteries.length;
    
    if (success) {
      this.saveBatteries();
    }
    
    return success;
  }

  public addBattery(formData: BatteryFormData): BatteryType {
    const newBatteryId = (this.batteries.length + 1).toString();
    
    // Create new battery with proper type structure
    const newBattery: BatteryType = {
      id: newBatteryId,
      name: formData.name,
      type: formData.type,
      voltage: parseFloat(formData.voltage),
      capacity: parseInt(formData.capacity),
      manufacturer: formData.manufacturer,
      imageUrl: formData.imageUrl,
      specifications: {},
      applications: formData.applications || [],
      cycleLife: formData.cycleLife ? parseInt(formData.cycleLife) : undefined,
      minVoltage: formData.minVoltage ? parseFloat(formData.minVoltage) : undefined,
      maxVoltage: formData.maxVoltage ? parseFloat(formData.maxVoltage) : undefined
    };
    
    // Add specifications as separate properties
    if (formData.chemistry) newBattery.specifications!.Chemistry = formData.chemistry;
    if (formData.weight) newBattery.specifications!.Weight = formData.weight;
    if (formData.dimensions) newBattery.specifications!.Dimensions = formData.dimensions;
    if (formData.rechargeable) newBattery.specifications!.Rechargeable = formData.rechargeable;
    if (formData.maxDischarge) newBattery.specifications!['Max Discharge'] = formData.maxDischarge;
    if (formData.operatingTemp) newBattery.specifications!['Operating Temperature'] = formData.operatingTemp;
    if (formData.internalResistance) newBattery.specifications!['Internal Resistance'] = formData.internalResistance;
    if (formData.energyDensity) newBattery.specifications!['Energy Density'] = formData.energyDensity;
    if (formData.selfDischargeRate) newBattery.specifications!['Self-Discharge Rate'] = formData.selfDischargeRate;
    if (formData.cycleLife) newBattery.specifications!['Cycle Life'] = formData.cycleLife;
    if (formData.minVoltage) newBattery.specifications!['Min Voltage'] = formData.minVoltage;
    if (formData.maxVoltage) newBattery.specifications!['Max Voltage'] = formData.maxVoltage;

    this.batteries.push(newBattery);
    this.saveBatteries();
    
    // Update the battery applications in the constants file
    if (!this.isBatteryInApplications(newBatteryId) && formData.applications && formData.applications.length > 0) {
      this.updateBatteryApplications(newBatteryId, formData.applications);
    }
    
    return newBattery;
  }

  public updateBattery(id: string, formData: BatteryFormData): BatteryType {
    // Find the battery to update
    const batteryIndex = this.batteries.findIndex(battery => battery.id === id);
    
    if (batteryIndex === -1) {
      throw new Error('Battery not found');
    }
    
    // Create updated battery object
    const updatedBattery: BatteryType = {
      id: id,
      name: formData.name,
      type: formData.type,
      voltage: parseFloat(formData.voltage),
      capacity: parseInt(formData.capacity),
      manufacturer: formData.manufacturer,
      imageUrl: formData.imageUrl,
      specifications: {},
      applications: formData.applications || [],
      cycleLife: formData.cycleLife ? parseInt(formData.cycleLife) : undefined,
      minVoltage: formData.minVoltage ? parseFloat(formData.minVoltage) : undefined,
      maxVoltage: formData.maxVoltage ? parseFloat(formData.maxVoltage) : undefined
    };
    
    // Add specifications as separate properties
    if (formData.chemistry) updatedBattery.specifications!.Chemistry = formData.chemistry;
    if (formData.weight) updatedBattery.specifications!.Weight = formData.weight;
    if (formData.dimensions) updatedBattery.specifications!.Dimensions = formData.dimensions;
    if (formData.rechargeable) updatedBattery.specifications!.Rechargeable = formData.rechargeable;
    if (formData.maxDischarge) updatedBattery.specifications!['Max Discharge'] = formData.maxDischarge;
    if (formData.operatingTemp) updatedBattery.specifications!['Operating Temperature'] = formData.operatingTemp;
    if (formData.internalResistance) updatedBattery.specifications!['Internal Resistance'] = formData.internalResistance;
    if (formData.energyDensity) updatedBattery.specifications!['Energy Density'] = formData.energyDensity;
    if (formData.selfDischargeRate) updatedBattery.specifications!['Self-Discharge Rate'] = formData.selfDischargeRate;
    if (formData.cycleLife) updatedBattery.specifications!['Cycle Life'] = formData.cycleLife;
    if (formData.minVoltage) updatedBattery.specifications!['Min Voltage'] = formData.minVoltage;
    if (formData.maxVoltage) updatedBattery.specifications!['Max Voltage'] = formData.maxVoltage;
    
    // Update the battery in the array
    this.batteries[batteryIndex] = updatedBattery;
    this.saveBatteries();
    
    // Update the battery applications in the constants file
    if (formData.applications && formData.applications.length > 0) {
      this.updateBatteryApplications(id, formData.applications);
    }
    
    return updatedBattery;
  }

  private isBatteryInApplications(batteryId: string): boolean {
    return batteryId in BATTERY_APPLICATIONS;
  }

  private isBatteryInSpecifications(batteryId: string): boolean {
    // This would normally check if the battery already exists in the BATTERY_SPECIFICATIONS
    // For simplicity, we'll just return false
    return false;
  }

  private updateBatteryApplications(batteryId: string, applications: string[]): void {
    // This would normally update the BATTERY_APPLICATIONS in the constants file
    // Since we can't modify the constants file directly, this is just a placeholder
    console.log('Battery applications would be updated in the constants file:', { batteryId, applications });
  }

  private updateBatterySpecifications(battery: BatteryType): void {
    // This would normally update the BATTERY_SPECIFICATIONS in the constants file
    // Since we can't modify the constants file directly, this is just a placeholder
    console.log('Battery specifications would be updated in the constants file:', battery);
  }

  private saveBatteries(): void {
    localStorage.setItem('batteries', JSON.stringify(this.batteries));
  }
}

export default BatteryService.getInstance();
