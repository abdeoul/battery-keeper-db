
import React from 'react';
import { Info } from 'lucide-react';
import { BATTERY_SPECIFICATIONS } from '@/constants/batteryData';

interface BatterySpecificationsProps {
  batteryId: string;
}

const BatterySpecifications: React.FC<BatterySpecificationsProps> = ({ batteryId }) => {
  const specifications = BATTERY_SPECIFICATIONS[batteryId] || {};
  
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
