
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BatteryService from '@/services/BatteryService';
import BatteryFormFields, { batteryTypes } from './BatteryFormFields';

const BatteryForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    type: batteryTypes[0],
    voltage: '',
    capacity: '',
    manufacturer: '',
    imageUrl: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Add the new battery to our service
      const newBattery = BatteryService.addBattery(formData);
      
      toast({
        title: "Battery Added",
        description: `${formData.name} has been added to the database.`,
      });
      
      // Redirect to the battery detail page
      navigate(`/battery/${newBattery.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding the battery. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm max-w-2xl mx-auto animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <BatteryFormFields 
          formData={formData}
          handleChange={handleChange}
        />
        
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center"
          >
            {isSubmitting ? (
              <>Processing...</>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Battery
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BatteryForm;
