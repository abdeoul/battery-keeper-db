
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BatteryService from '@/services/BatteryService';

// Battery types array moved to a constant
const batteryTypes = [
  'Lithium-Ion',
  'Alkaline',
  'Nickel-Cadmium',
  'Nickel-Metal Hydride',
  'Lead Acid',
  'Lithium Polymer',
  'Silver Oxide',
  'Zinc Carbon'
];

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            id="name"
            label="Battery Name *"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. 18650 Cell Battery"
            required
          />
          
          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium">
              Battery Type *
            </label>
            <select
              id="type"
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              {batteryTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <FormField
            id="voltage"
            label="Voltage (V) *"
            type="number"
            step="0.1"
            value={formData.voltage}
            onChange={handleChange}
            placeholder="3.7"
            required
          />
          
          <FormField
            id="capacity"
            label="Capacity (mAh) *"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="3000"
            required
          />
          
          <FormField
            id="manufacturer"
            label="Manufacturer *"
            type="text"
            value={formData.manufacturer}
            onChange={handleChange}
            placeholder="e.g. Samsung"
            required
          />
          
          <FormField
            id="imageUrl"
            label="Image URL (optional)"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/battery-image.jpg"
          />
        </div>
        
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

// Form field component for DRY form inputs
const FormField = ({ 
  id, 
  label, 
  type, 
  value, 
  onChange, 
  placeholder,
  required = false,
  step
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  step?: string;
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      step={step}
      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
      placeholder={placeholder}
    />
  </div>
);

export default BatteryForm;
