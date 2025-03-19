
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BatteryService from '@/services/BatteryService';
import BatteryFormFields, { batteryTypes } from './BatteryFormFields';
import { BatteryType } from './BatteryCard';

interface EditBatteryFormProps {
  battery: BatteryType;
}

const EditBatteryForm = ({ battery }: EditBatteryFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Convert specifications to form data format
  const initialSpecs = battery.specifications || {};
  
  const [formData, setFormData] = useState({
    name: battery.name,
    type: battery.type,
    voltage: battery.voltage.toString(),
    capacity: battery.capacity.toString(),
    manufacturer: battery.manufacturer,
    imageUrl: battery.imageUrl || '',
    chemistry: initialSpecs.Chemistry || '',
    weight: initialSpecs.Weight || '',
    dimensions: initialSpecs.Dimensions || '',
    rechargeable: initialSpecs.Rechargeable || '',
    maxDischarge: initialSpecs['Max Discharge'] || '',
    operatingTemp: initialSpecs['Operating Temperature'] || '',
    internalResistance: initialSpecs['Internal Resistance'] || '',
    energyDensity: initialSpecs['Energy Density'] || '',
    selfDischargeRate: initialSpecs['Self-Discharge Rate'] || '',
    applications: battery.applications || []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleApplicationToggle = (application: string) => {
    setFormData(prev => {
      if (prev.applications.includes(application)) {
        return {
          ...prev,
          applications: prev.applications.filter(app => app !== application)
        };
      } 
      else {
        return {
          ...prev,
          applications: [...prev.applications, application]
        };
      }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Update the battery in our service
      const updatedBattery = BatteryService.updateBattery(battery.id, formData);
      
      toast({
        title: "Battery Updated",
        description: `${formData.name} has been updated in the database.`,
      });
      
      // Redirect to the battery detail page
      navigate(`/battery/${updatedBattery.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating the battery. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm max-w-4xl mx-auto animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <BatteryFormFields 
          formData={formData}
          handleChange={handleChange}
          handleApplicationToggle={handleApplicationToggle}
        />
        
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(`/battery/${battery.id}`)}
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
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBatteryForm;
