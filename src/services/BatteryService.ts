
import { BatteryType } from '@/components/BatteryCard';

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

  public addBattery(formData: BatteryFormData): BatteryType {
    const newBatteryId = (this.batteries.length + 1).toString();
    const newBattery: BatteryType = {
      id: newBatteryId,
      name: formData.name,
      type: formData.type,
      voltage: parseFloat(formData.voltage),
      capacity: parseInt(formData.capacity),
      manufacturer: formData.manufacturer,
      imageUrl: formData.imageUrl,
      specifications: {
        Chemistry: formData.chemistry || '',
        Weight: formData.weight ? `${formData.weight}g` : '',
        Dimensions: formData.dimensions || '',
        Rechargeable: formData.rechargeable || '',
        'Max Discharge': formData.maxDischarge ? `${formData.maxDischarge}A` : '',
        'Operating Temperature': formData.operatingTemp || '',
        'Internal Resistance': formData.internalResistance || '',
        'Energy Density': formData.energyDensity ? `${formData.energyDensity} Wh/kg` : '',
        'Self-Discharge Rate': formData.selfDischargeRate || ''
      }
    };

    this.batteries.push(newBattery);
    this.saveBatteries();
    
    // Update the specifications in the constants file
    if (!this.isBatteryInSpecifications(newBatteryId)) {
      this.updateBatterySpecifications(newBattery);
    }
    
    return newBattery;
  }

  private isBatteryInSpecifications(batteryId: string): boolean {
    // This would normally check if the battery already exists in the BATTERY_SPECIFICATIONS
    // For simplicity, we'll just return false
    return false;
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
