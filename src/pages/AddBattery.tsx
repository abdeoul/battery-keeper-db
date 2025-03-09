
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BatteryFull, ArrowLeft, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

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

const AddBattery = () => {
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
    
    // In a real application, this would be an API call to store the battery
    // For now, we'll simulate an API call with a timeout
    setTimeout(() => {
      // Generate a random ID for the new battery
      const newBatteryId = Math.floor(Math.random() * 1000).toString();
      
      toast({
        title: "Battery Added",
        description: `${formData.name} has been added to the database.`,
      });
      
      setIsSubmitting(false);
      // Redirect to the battery detail page
      navigate(`/battery/${newBatteryId}`);
    }, 800);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-container py-8">
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
            <BatteryFull className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-medium">Add New Battery</h1>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm max-w-2xl mx-auto animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Battery Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  placeholder="e.g. 18650 Cell Battery"
                />
              </div>
              
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
              
              <div className="space-y-2">
                <label htmlFor="voltage" className="block text-sm font-medium">
                  Voltage (V) *
                </label>
                <input
                  id="voltage"
                  name="voltage"
                  type="number"
                  step="0.1"
                  required
                  value={formData.voltage}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  placeholder="3.7"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="capacity" className="block text-sm font-medium">
                  Capacity (mAh) *
                </label>
                <input
                  id="capacity"
                  name="capacity"
                  type="number"
                  required
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  placeholder="3000"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="manufacturer" className="block text-sm font-medium">
                  Manufacturer *
                </label>
                <input
                  id="manufacturer"
                  name="manufacturer"
                  type="text"
                  required
                  value={formData.manufacturer}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  placeholder="e.g. Samsung"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="imageUrl" className="block text-sm font-medium">
                  Image URL (optional)
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  placeholder="https://example.com/battery-image.jpg"
                />
              </div>
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
      </main>
    </div>
  );
};

export default AddBattery;
