
import React from 'react';
import { Link } from 'react-router-dom';
import { Battery, BatteryFull, BatteryLow, BatteryMedium } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BatteryType {
  id: string;
  name: string;
  type: string;
  voltage: number;
  capacity: number;
  manufacturer: string;
  imageUrl?: string;
}

interface BatteryCardProps {
  battery: BatteryType;
}

const BatteryCard = ({ battery }: BatteryCardProps) => {
  // Choose icon based on battery type
  const getBatteryIcon = () => {
    switch (battery.type.toLowerCase()) {
      case 'lithium-ion':
      case 'li-ion':
        return <BatteryFull className="h-6 w-6 text-blue-500" />;
      case 'alkaline':
        return <BatteryMedium className="h-6 w-6 text-green-500" />;
      case 'nickel-cadmium':
      case 'ni-cd':
        return <BatteryLow className="h-6 w-6 text-amber-500" />;
      default:
        return <Battery className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <Link 
      to={`/battery/${battery.id}`}
      className={cn(
        "block p-4 rounded-xl bg-card border border-border shadow-sm card-hover animate-scale-in",
        "focus:outline-none focus:ring-2 focus:ring-primary/50"
      )}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 p-2 rounded-lg bg-muted">
          {getBatteryIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-medium text-foreground truncate">{battery.name}</p>
          <p className="text-sm text-muted-foreground">{battery.manufacturer}</p>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
            <div className="text-sm">
              <span className="text-muted-foreground">Voltage:</span> {battery.voltage}V
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Capacity:</span> {battery.capacity}mAh
            </div>
            <div className="text-sm col-span-2">
              <span className="text-muted-foreground">Type:</span> {battery.type}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BatteryCard;
