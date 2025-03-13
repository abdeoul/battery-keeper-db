
import React from 'react';
import { Link } from 'react-router-dom';
import { Battery, BatteryFull, BatteryLow, BatteryMedium, Trash2, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BatteryType {
  id: string;
  name: string;
  type: string;
  voltage: number;
  capacity: number;
  manufacturer: string;
  imageUrl?: string;
  specifications?: Record<string, string>;
}

interface BatteryCardProps {
  battery: BatteryType;
  isGroupView?: boolean;
  onRemove?: (id: string) => void;
}

const BatteryCard = ({ battery, isGroupView = false, onRemove }: BatteryCardProps) => {
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

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) {
      onRemove(battery.id);
    }
  };

  return (
    <Link 
      to={`/battery/${battery.id}`}
      className={cn(
        "block p-4 rounded-xl bg-card border border-border shadow-sm card-hover animate-scale-in relative",
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
            {isGroupView && (
              <div className="text-sm col-span-2 mt-1">
                <span className="text-muted-foreground">ID:</span> {battery.id}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="absolute top-2 right-2 flex space-x-1">
        <Link
          to={`/edit/${battery.id}`}
          onClick={(e) => e.stopPropagation()}
          className="p-1.5 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
          aria-label="Edit battery"
        >
          <Pencil className="h-4 w-4" />
        </Link>
        
        {onRemove && (
          <button 
            onClick={handleRemove}
            className="p-1.5 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
            aria-label="Remove battery"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </Link>
  );
};

export default BatteryCard;
