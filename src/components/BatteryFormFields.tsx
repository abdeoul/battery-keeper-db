
import React from 'react';
import { APPLICATION_ICONS } from '@/constants/batteryData';

// Battery types array as a constant
export const batteryTypes = [
  'Lithium-Ion',
  'Alkaline',
  'Nickel-Cadmium',
  'Nickel-Metal Hydride',
  'Lead Acid',
  'Lithium Polymer',
  'Silver Oxide',
  'Zinc Carbon'
];

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  step?: string;
}

export const FormField = ({ 
  id, 
  label, 
  type, 
  value, 
  onChange, 
  placeholder,
  required = false,
  step
}: FormFieldProps) => (
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

interface BatteryFormData {
  name: string;
  type: string;
  voltage: string;
  capacity: string;
  manufacturer: string;
  imageUrl: string;
  chemistry: string;
  weight: string;
  dimensions: string;
  rechargeable: string;
  maxDischarge: string;
  operatingTemp: string;
  internalResistance: string;
  energyDensity: string;
  selfDischargeRate: string;
  applications: string[];
  cycleLife: string;
  minVoltage: string;
  maxVoltage: string;
}

interface BatteryFormFieldsProps {
  formData: BatteryFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleApplicationToggle?: (application: string) => void;
}

const BatteryFormFields = ({ formData, handleChange, handleApplicationToggle }: BatteryFormFieldsProps) => {
  // Get all possible applications from the APPLICATION_ICONS object
  const allApplications = Object.keys(APPLICATION_ICONS);
  
  return (
    <div className="space-y-8">
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
      
      {handleApplicationToggle && (
        <div>
          <h3 className="text-lg font-medium mb-4">Common Applications</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allApplications.map(application => (
              <div 
                key={application}
                onClick={() => handleApplicationToggle(application)}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                  formData.applications.includes(application) 
                    ? 'bg-primary/20 border border-primary/30' 
                    : 'bg-muted/40 hover:bg-muted/60 border border-transparent'
                }`}
              >
                <span className="text-sm font-medium">{application}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            id="chemistry"
            label="Chemistry"
            type="text"
            value={formData.chemistry}
            onChange={handleChange}
            placeholder="e.g. Lithium Nickel Manganese Cobalt Oxide"
          />
          
          <FormField
            id="weight"
            label="Weight (g)"
            type="text"
            value={formData.weight}
            onChange={handleChange}
            placeholder="e.g. 47"
          />
          
          <FormField
            id="dimensions"
            label="Dimensions (mm)"
            type="text"
            value={formData.dimensions}
            onChange={handleChange}
            placeholder="e.g. 18mm × 65mm"
          />
          
          <div className="space-y-2">
            <label htmlFor="rechargeable" className="block text-sm font-medium">
              Rechargeable
            </label>
            <select
              id="rechargeable"
              name="rechargeable"
              value={formData.rechargeable}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          
          <FormField
            id="maxDischarge"
            label="Max Discharge (A)"
            type="text"
            value={formData.maxDischarge}
            onChange={handleChange}
            placeholder="e.g. 10"
          />
          
          <FormField
            id="operatingTemp"
            label="Operating Temperature Range"
            type="text"
            value={formData.operatingTemp}
            onChange={handleChange}
            placeholder="e.g. -20°C to 60°C"
          />
          
          <FormField
            id="internalResistance"
            label="Internal Resistance"
            type="text"
            value={formData.internalResistance}
            onChange={handleChange}
            placeholder="e.g. 20-50mΩ"
          />
          
          <FormField
            id="energyDensity"
            label="Energy Density (Wh/kg)"
            type="text"
            value={formData.energyDensity}
            onChange={handleChange}
            placeholder="e.g. 250-270"
          />
          
          <FormField
            id="selfDischargeRate"
            label="Self-Discharge Rate"
            type="text"
            value={formData.selfDischargeRate}
            onChange={handleChange}
            placeholder="e.g. <5% per month"
          />
          
          {/* New fields for Cycle Life, Min Voltage, and Max Voltage */}
          <FormField
            id="cycleLife"
            label="Cycle Life (cycles)"
            type="text"
            value={formData.cycleLife}
            onChange={handleChange}
            placeholder="e.g. 500"
          />
          
          <FormField
            id="minVoltage"
            label="Min Voltage (V)"
            type="text"
            value={formData.minVoltage}
            onChange={handleChange}
            placeholder="e.g. 2.5"
          />
          
          <FormField
            id="maxVoltage"
            label="Max Voltage (V)"
            type="text"
            value={formData.maxVoltage}
            onChange={handleChange}
            placeholder="e.g. 4.2"
          />
        </div>
      </div>
    </div>
  );
};

export default BatteryFormFields;
