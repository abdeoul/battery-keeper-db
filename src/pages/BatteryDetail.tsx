
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Battery, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import { BatteryType } from '@/components/BatteryCard';
import { useToast } from '@/hooks/use-toast';
import BatteryService from '@/services/BatteryService';
import BatteryDetailHeader from '@/components/BatteryDetailHeader';
import BatteryInfoCard from '@/components/BatteryInfoCard';
import BatterySpecifications from '@/components/BatterySpecifications';
import BatteryApplications from '@/components/BatteryApplications';
import BatteryFooter from '@/components/BatteryFooter';

const BatteryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [battery, setBattery] = useState<BatteryType | null>(null);
  
  useEffect(() => {
    if (id) {
      const foundBattery = BatteryService.getBatteryById(id);
      
      if (foundBattery) {
        setBattery(foundBattery);
      } else {
        toast({
          title: "Battery Not Found",
          description: "The battery you're looking for doesn't exist in our database.",
          variant: "destructive"
        });
        navigate('/database');
      }
    }
  }, [id, navigate, toast]);
  
  const handleRemoveBattery = () => {
    if (id && battery) {
      const success = BatteryService.removeBattery(id);
      
      if (success) {
        toast({
          title: "Battery Removed",
          description: `${battery.name} has been removed from the database.`,
        });
        navigate('/database');
      } else {
        toast({
          title: "Failed to Remove",
          description: "There was an error removing the battery.",
          variant: "destructive"
        });
      }
    }
  };
  
  if (!battery) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-medium mb-4">Battery Not Found</h1>
            <p className="text-muted-foreground mb-6">The battery you're looking for doesn't exist in our database.</p>
            <button 
              onClick={() => navigate('/database')}
              className="btn-primary"
            >
              Back to Database
            </button>
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
          <BatteryDetailHeader />

          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="w-full lg:w-1/3 animate-fade-in">
              <BatteryInfoCard battery={battery} />
              <div className="mt-4 flex justify-center">
                <button 
                  onClick={handleRemoveBattery}
                  className="flex items-center gap-2 py-2 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-md transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove Battery
                </button>
              </div>
            </div>

            <div className="w-full lg:w-2/3 space-y-6 animate-slide-up">
              <BatterySpecifications batteryId={battery.id} />
              <BatteryApplications batteryId={battery.id} />
            </div>
          </div>
        </div>
      </main>
      <BatteryFooter />
    </div>
  );
};

export default BatteryDetail;
