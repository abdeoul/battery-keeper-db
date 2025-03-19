
import React from 'react';
import { Info } from 'lucide-react';
import { BATTERY_SPECIFICATIONS } from '@/constants/batteryData';
import BatteryService from '@/services/BatteryService';

interface BatterySpecificationsProps {
  batteryId: string;
}

const BatterySpecifications: React.FC<BatterySpecificationsProps> = ({ batteryId }) => {
  // First try to get specifications from the battery object
  const battery = BatteryService.getBatteryById(batteryId);
  
  // If the battery has specifications, use those. Otherwise, fall back to constants
  const specifications = battery?.specifications || BATTERY_SPECIFICATIONS[batteryId] || {};
  
  // Skip rendering if no specifications are available
  if (Object.keys(specifications).length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Info className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-xl font-medium">Specifications</h2>
        </div>
        <p className="text-muted-foreground">No specifications available for this battery.</p>
      </div>
    );
  }
  
  return (
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
  );
};

export default BatterySpecifications;
