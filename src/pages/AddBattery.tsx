
import React from 'react';
import Header from '@/components/Header';
import AddBatteryHeader from '@/components/AddBatteryHeader';
import BatteryForm from '@/components/BatteryForm';

const AddBattery = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-container py-8">
        <AddBatteryHeader />
        <BatteryForm />
      </main>
    </div>
  );
};

export default AddBattery;
