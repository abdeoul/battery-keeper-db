
import { BatteryType } from '@/components/BatteryCard';

// Map applications to appropriate icons
export const APPLICATION_ICONS: Record<string, string> = {
  'Remote Controls': 'Tv',
  'Toys': 'Radio',
  'Flashlights': 'Lightbulb',
  'Clocks': 'Watch',
  'Laptop Battery Packs': 'Smartphone',
  'Power Tools': 'Bolt',
  'Electric Vehicles': 'Car',
  'Watches': 'Watch',
  'Calculators': 'Smartphone',
  'Car Key Fobs': 'Car',
  'Medical Devices': 'Info',
  'Digital Cameras': 'Camera',
  'Wireless Peripherals': 'Radio',
  'High-Drain Devices': 'Bolt',
  'Radio Receivers': 'Radio',
  'Power Banks': 'Battery',
  'E-bikes': 'Car'
};

// Define common applications for each battery
export const BATTERY_APPLICATIONS: Record<string, string[]> = {
  '1': ['Remote Controls', 'Toys', 'Flashlights', 'Clocks'],
  '2': ['Laptop Battery Packs', 'Power Tools', 'Electric Vehicles', 'Flashlights'],
  '3': ['Watches', 'Calculators', 'Car Key Fobs', 'Medical Devices'],
  '4': ['Remote Controls', 'Toys', 'Digital Cameras', 'Wireless Peripherals'],
  '5': ['High-Drain Devices', 'Flashlights', 'Radio Receivers', 'Toys'],
  '6': ['Electric Vehicles', 'Power Banks', 'Power Tools', 'E-bikes']
};

// Enhanced battery specifications with technical details
export const BATTERY_SPECIFICATIONS: Record<string, Record<string, string | number>> = {
  '1': {
    'Chemistry': 'Manganese Dioxide-Zinc',
    'Nominal Voltage': '1.5V',
    'Capacity': '2700mAh',
    'Max Discharge': '1.5A',
    'Weight': '23g',
    'Dimensions': '14.5mm × 50.5mm',
    'Rechargeable': 'No',
    'Shelf Life': '10 years',
    'Operating Temperature': '-20°C to 54°C',
    'Internal Resistance': '150-300mΩ',
    'Energy Density': '100 Wh/kg',
    'Self-Discharge Rate': '2-3% per year',
    'Terminal Type': 'Button Top & Flat',
    'Standards': 'IEC 60086, ANSI C18.1M'
  },
  '2': {
    'Chemistry': 'Lithium Nickel Manganese Cobalt Oxide',
    'Nominal Voltage': '3.7V',
    'Capacity': '3500mAh',
    'Max Discharge': '10A',
    'Weight': '47g',
    'Dimensions': '18mm × 65mm',
    'Rechargeable': 'Yes',
    'Cycle Life': '500-1000 cycles',
    'Operating Temperature': '-20°C to 60°C',
    'Internal Resistance': '20-50mΩ',
    'Energy Density': '250-270 Wh/kg',
    'Self-Discharge Rate': '<5% per month',
    'Charge Method': 'CC/CV (4.2V)',
    'Protection Circuit': 'Required for safety',
    'Standards': 'IEC 62133, UL 1642'
  },
  '3': {
    'Chemistry': 'Lithium / Manganese Dioxide',
    'Nominal Voltage': '3.0V',
    'Capacity': '240mAh',
    'Max Discharge': '0.2mA',
    'Weight': '2.5g',
    'Dimensions': '20mm × 3.2mm',
    'Rechargeable': 'No',
    'Shelf Life': '10 years',
    'Operating Temperature': '-30°C to 60°C',
    'Internal Resistance': '10-40Ω',
    'Energy Density': '198 Wh/kg',
    'Self-Discharge Rate': '<1% per year',
    'Terminal Type': 'Flat',
    'Applications': 'Low drain devices',
    'Standards': 'IEC 60086, ANSI C18.3M'
  },
  '4': {
    'Chemistry': 'Nickel-Metal Hydride',
    'Nominal Voltage': '1.2V',
    'Capacity': '800mAh',
    'Max Discharge': '0.5A',
    'Weight': '14g',
    'Dimensions': '10.5mm × 44.5mm',
    'Rechargeable': 'Yes',
    'Cycle Life': '500-1000 cycles',
    'Operating Temperature': '-20°C to 45°C',
    'Internal Resistance': '150-300mΩ',
    'Energy Density': '80 Wh/kg',
    'Self-Discharge Rate': '15-30% per month',
    'Charge Method': 'Delta V (-ΔV) detection',
    'Memory Effect': 'Minimal',
    'Standards': 'IEC 61951-2, ANSI C18.2M'
  },
  '5': {
    'Chemistry': 'Manganese Dioxide-Zinc',
    'Nominal Voltage': '1.5V',
    'Capacity': '12000mAh',
    'Max Discharge': '0.5A',
    'Weight': '135g',
    'Dimensions': '33.2mm × 61.5mm',
    'Rechargeable': 'No',
    'Shelf Life': '10 years',
    'Operating Temperature': '-20°C to 54°C',
    'Internal Resistance': '100-200mΩ',
    'Energy Density': '100 Wh/kg',
    'Self-Discharge Rate': '2-3% per year',
    'Terminal Type': 'Button Top & Flat',
    'Standards': 'IEC 60086, ANSI C18.1M'
  },
  '6': {
    'Chemistry': 'Lithium Nickel Manganese Cobalt Oxide',
    'Nominal Voltage': '3.6V',
    'Capacity': '5000mAh',
    'Max Discharge': '35A',
    'Weight': '70g',
    'Dimensions': '21mm × 70mm',
    'Rechargeable': 'Yes',
    'Cycle Life': '500-1000 cycles',
    'Operating Temperature': '-20°C to 60°C',
    'Internal Resistance': '15-30mΩ',
    'Energy Density': '260-280 Wh/kg',
    'Self-Discharge Rate': '<5% per month',
    'Charge Method': 'CC/CV (4.2V)',
    'Protection Circuit': 'Required for safety',
    'Standards': 'IEC 62133, UL 1642'
  }
};
