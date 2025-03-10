
import React from 'react';

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
}

interface BatteryFormFieldsProps {
  formData: BatteryFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const BatteryFormFields = ({ formData, handleChange }: BatteryFormFieldsProps) => {
  return (
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
  );
};

export default BatteryFormFields;
