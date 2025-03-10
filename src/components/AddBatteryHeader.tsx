
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BatteryFull, ArrowLeft } from 'lucide-react';

const AddBatteryHeader = () => {
  const navigate = useNavigate();
  
  return (
    <>
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
    </>
  );
};

export default AddBatteryHeader;
