
import React from 'react';
import { Bolt, Tv, Watch, Camera, Lightbulb, Radio, Car, Smartphone, Info, Battery } from 'lucide-react';
import { BATTERY_APPLICATIONS } from '@/constants/batteryData';
import BatteryService from '@/services/BatteryService';

interface BatteryApplicationsProps {
  batteryId: string;
}

const BatteryApplications: React.FC<BatteryApplicationsProps> = ({ batteryId }) => {
  // First try to get applications from the battery object
  const battery = BatteryService.getBatteryById(batteryId);
  
  // If the battery has applications, use those. Otherwise, fall back to constants
  const applications = battery?.applications || BATTERY_APPLICATIONS[batteryId] || [];
  
  // Skip rendering if no applications are available
  if (applications.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Bolt className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-xl font-medium">Common Applications</h2>
        </div>
        <p className="text-muted-foreground">No applications available for this battery.</p>
      </div>
    );
  }

  // Function to get icon for application
  const getApplicationIcon = (application: string) => {
    const iconMap: Record<string, React.ReactNode> = {
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
    
    return iconMap[application] || <Info className="h-4 w-4" />;
  };

  return (
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
  );
};

export default BatteryApplications;
