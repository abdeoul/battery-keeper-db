
import React from 'react';
import { Battery, BatteryFull, BatteryLow, BatteryMedium, Building } from 'lucide-react';
import { BatteryType } from './BatteryCard';

interface BatteryInfoCardProps {
  battery: BatteryType;
}

const BatteryInfoCard: React.FC<BatteryInfoCardProps> = ({ battery }) => {
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

  return (
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
  );
};

export default BatteryInfoCard;
