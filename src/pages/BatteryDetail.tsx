import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Battery, BatteryFull, BatteryLow, BatteryMedium, Bolt, Building, Info, Smartphone, Tv, Watch, Camera, Lightbulb, Radio, Car } from 'lucide-react';
import Header from '@/components/Header';
import { BatteryType } from '@/components/BatteryCard';

// Mock battery data
const mockBatteries: Record<string, BatteryType> = {
  '1': {
    id: '1',
    name: 'AA Alkaline',
    type: 'Alkaline',
    voltage: 1.5,
    capacity: 2700,
    manufacturer: 'Duracell'
  },
  '2': {
    id: '2',
    name: '18650',
    type: 'Lithium-ion',
    voltage: 3.7,
    capacity: 3500,
    manufacturer: 'Samsung'
  },
  '3': {
    id: '3',
    name: 'CR2032',
    type: 'Lithium',
    voltage: 3.0,
    capacity: 240,
    manufacturer: 'Panasonic'
  },
  '4': {
    id: '4',
    name: 'AAA Rechargeable',
    type: 'Ni-MH',
    voltage: 1.2,
    capacity: 800,
    manufacturer: 'Energizer'
  },
  '5': {
    id: '5',
    name: 'D Cell',
    type: 'Alkaline',
    voltage: 1.5,
    capacity: 12000,
    manufacturer: 'Duracell'
  },
  '6': {
    id: '6',
    name: '21700',
    type: 'Li-ion',
    voltage: 3.6,
    capacity: 5000,
    manufacturer: 'LG Chem'
  }
};

const BATTERY_APPLICATIONS: Record<string, string[]> = {
  '1': ['Remote Controls', 'Toys', 'Flashlights', 'Clocks'],
  '2': ['Laptop Battery Packs', 'Power Tools', 'Electric Vehicles', 'Flashlights'],
  '3': ['Watches', 'Calculators', 'Car Key Fobs', 'Medical Devices'],
  '4': ['Remote Controls', 'Toys', 'Digital Cameras', 'Wireless Peripherals'],
  '5': ['High-Drain Devices', 'Flashlights', 'Radio Receivers', 'Toys'],
  '6': ['Electric Vehicles', 'Power Banks', 'Power Tools', 'E-bikes']
};

// Map applications to appropriate icons
const APPLICATION_ICONS: Record<string, React.ReactNode> = {
  'Remote Controls': <Tv className="h-4 w-4" />,
  'Toys': <Radio className="h-4 w-4" />,
  'Flashlights': <Lightbulb className="h-4 w-4" />,
  'Clocks': <Watch className="h-4 w-4" />,
  'Laptop Battery Packs': <Smartphone className="h-4 w-4" />,
  'Power Tools': <Bolt className="h-4 w-4" />,
  'Electric Vehicles': <Car className="h-4 w-4" />,
  'Watches': <Watch className="h-4 w-4" />,
  'Calculators': <Smartphone className="h-4 w-4" />,
  'Car Key Fobs': <Car className="h-4 w-4" />,
  'Medical Devices': <Info className="h-4 w-4" />,
  'Digital Cameras': <Camera className="h-4 w-4" />,
  'Wireless Peripherals': <Radio className="h-4 w-4" />,
  'High-Drain Devices': <Bolt className="h-4 w-4" />,
  'Radio Receivers': <Radio className="h-4 w-4" />,
  'Power Banks': <Battery className="h-4 w-4" />,
  'E-bikes': <Car className="h-4 w-4" />
};

// Function to get icon for application
const getApplicationIcon = (application: string) => {
  return APPLICATION_ICONS[application] || <Info className="h-4 w-4" />;
};

// Enhanced battery specifications with more technical details
const BATTERY_SPECIFICATIONS: Record<string, Record<string, string | number>> = {
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

const BatteryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const battery = id ? mockBatteries[id] : null;
  
  if (!battery) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-medium mb-4">Battery Not Found</h1>
            <p className="text-muted-foreground mb-6">The battery you're looking for doesn't exist in our database.</p>
            <Link to="/database" className="btn-primary">
              Back to Database
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Choose icon based on battery type
  const getBatteryIcon = () => {
    switch (battery.type.toLowerCase()) {
      case 'lithium-ion':
      case 'li-ion':
        return <BatteryFull className="h-8 w-8 text-blue-500" />;
      case 'alkaline':
        return <BatteryMedium className="h-8 w-8 text-green-500" />;
      case 'nickel-cadmium':
      case 'ni-cd':
        return <BatteryLow className="h-8 w-8 text-amber-500" />;
      default:
        return <Battery className="h-8 w-8 text-gray-500" />;
    }
  };

  const specifications = BATTERY_SPECIFICATIONS[battery.id] || {};
  const applications = BATTERY_APPLICATIONS[battery.id] || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-container">
          <div className="mb-8 animate-slide-down">
            <Link to="/database" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Database
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="w-full lg:w-1/3 animate-fade-in">
              <div className="bg-card rounded-xl border border-border shadow-sm p-8 flex flex-col items-center text-center mb-6">
                <div className="p-6 rounded-full bg-muted mb-6">
                  {getBatteryIcon()}
                </div>
                <h1 className="text-3xl font-medium mb-2">{battery.name}</h1>
                <p className="text-lg text-muted-foreground mb-6">{battery.type}</p>
                <div className="grid grid-cols-2 gap-4 w-full mb-6">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Voltage</p>
                    <p className="text-xl font-medium">{battery.voltage}V</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="text-xl font-medium">{battery.capacity}mAh</p>
                  </div>
                </div>
                <div className="flex items-center justify-center text-muted-foreground">
                  <Building className="h-4 w-4 mr-2" />
                  <span>{battery.manufacturer}</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/3 space-y-6 animate-slide-up">
              <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <Info className="h-5 w-5 text-primary mr-2" />
                  <h2 className="text-xl font-medium">Specifications</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <Bolt className="h-5 w-5 text-primary mr-2" />
                  <h2 className="text-xl font-medium">Common Applications</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {applications.map((app) => (
                    <div 
                      key={app}
                      className="flex items-center p-3 bg-muted/40 rounded-lg hover:bg-muted/60 transition-colors"
                    >
                      <div className="mr-3 p-2 rounded-full bg-primary/10 text-primary">
                        {getApplicationIcon(app)}
                      </div>
                      <span className="text-sm font-medium">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-border py-8">
        <div className="max-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-primary mb-4 md:mb-0">
              <Battery className="h-5 w-5" />
              <span className="font-medium">BatteryDB</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BatteryDB. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BatteryDetail;
