
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import BatteryCard, { BatteryType } from './BatteryCard';

interface GroupedBatteries {
  [key: string]: BatteryType[];
}

interface BatteryGroupsProps {
  batteries: BatteryType[];
}

const BatteryGroups: React.FC<BatteryGroupsProps> = ({ batteries }) => {
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({});
  
  // Group batteries by first letter of their name
  const groupedBatteries = batteries.reduce((groups: GroupedBatteries, battery) => {
    const groupKey = battery.name.charAt(0).toUpperCase();
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(battery);
    return groups;
  }, {});

  // Sort group keys alphabetically
  const sortedGroupKeys = Object.keys(groupedBatteries).sort();

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  return (
    <div className="space-y-6">
      {sortedGroupKeys.map(groupKey => (
        <div key={groupKey} className="bg-card rounded-lg border border-border overflow-hidden">
          <button 
            onClick={() => toggleGroup(groupKey)}
            className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <span className="h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full font-medium">
                {groupKey}
              </span>
              <span className="font-medium">{groupKey} Batteries</span>
              <span className="text-sm text-muted-foreground">({groupedBatteries[groupKey].length})</span>
            </div>
            {expandedGroups[groupKey] ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
          
          {expandedGroups[groupKey] && (
            <div className="p-4 border-t border-border grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedBatteries[groupKey].map((battery, index) => (
                <div key={battery.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in">
                  <BatteryCard battery={battery} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      
      {sortedGroupKeys.length === 0 && (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground">No batteries found</p>
        </div>
      )}
    </div>
  );
};

export default BatteryGroups;
