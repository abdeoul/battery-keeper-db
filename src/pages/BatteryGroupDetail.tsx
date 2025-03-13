
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import BatteryCard, { BatteryType } from '@/components/BatteryCard';
import { useToast } from '@/hooks/use-toast';
import { getBatteryGroupByName } from '@/services/BatteryGroups';
import BatteryService from '@/services/BatteryService';

const BatteryGroupDetail = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [batteries, setBatteries] = useState<BatteryType[]>([]);
  const [groupName, setGroupName] = useState<string>('');

  useEffect(() => {
    if (name) {
      const group = getBatteryGroupByName(name);
      if (group) {
        setBatteries(group.batteries);
        setGroupName(group.name);
      } else {
        toast({
          title: "Group Not Found",
          description: "The battery group you're looking for doesn't exist.",
          variant: "destructive"
        });
        navigate('/groups');
      }
    }
  }, [name, navigate, toast]);

  const handleRemoveBattery = (id: string) => {
    const batteryToRemove = batteries.find(battery => battery.id === id);
    
    if (batteryToRemove) {
      const success = BatteryService.removeBattery(id);
      
      if (success) {
        setBatteries(prevBatteries => prevBatteries.filter(battery => battery.id !== id));
        
        toast({
          title: "Battery Removed",
          description: `${batteryToRemove.name} (ID: ${id}) has been removed from the database.`,
        });
        
        // If last battery in group, go back to groups
        if (batteries.length <= 1) {
          navigate('/groups');
        }
      } else {
        toast({
          title: "Failed to Remove",
          description: "There was an error removing the battery.",
          variant: "destructive"
        });
      }
    }
  };

  if (batteries.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="max-container">
            <div className="mb-8">
              <Link to="/groups" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Groups
              </Link>
            </div>
            <div className="text-center p-8">
              <h1 className="text-2xl font-medium mb-4">Group Not Found</h1>
              <p className="text-muted-foreground mb-6">The battery group you're looking for doesn't exist or is empty.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-container">
          <div className="mb-8">
            <Link to="/groups" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Groups
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-6">{groupName} Batteries</h1>
          <p className="text-muted-foreground mb-8">
            Showing {batteries.length} batteries in this group
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {batteries.map(battery => (
              <BatteryCard 
                key={battery.id} 
                battery={battery} 
                isGroupView={true}
                onRemove={handleRemoveBattery}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BatteryGroupDetail;
