
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';
import BatteryService from '@/services/BatteryService';
import EditBatteryForm from '@/components/EditBatteryForm';
import { BatteryType } from '@/components/BatteryCard';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const EditBattery = () => {
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
          description: "The battery you're trying to edit doesn't exist in our database.",
          variant: "destructive"
        });
        navigate('/database');
      }
    }
  }, [id, navigate, toast]);
  
  if (!battery) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-medium mb-4">Battery Not Found</h1>
            <p className="text-muted-foreground mb-6">The battery you're trying to edit doesn't exist in our database.</p>
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
      <main className="flex-1 max-container py-8">
        <div className="mb-8 animate-slide-down">
          <Link to={`/battery/${id}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Battery Details
          </Link>
        </div>
        
        <div className="text-center mb-10 animate-fade-in">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-3">
            Edit
          </span>
          <h1 className="text-3xl md:text-4xl font-medium mb-4">Edit Battery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Update the details for {battery.name}
          </p>
        </div>
        
        <EditBatteryForm battery={battery} />
      </main>
    </div>
  );
};

export default EditBattery;
