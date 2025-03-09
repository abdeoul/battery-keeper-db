
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import BatteryCard, { BatteryType } from '@/components/BatteryCard';
import { Battery, Filter } from 'lucide-react';

// Mock battery data
const mockBatteries: BatteryType[] = [
  {
    id: '1',
    name: 'AA Alkaline',
    type: 'Alkaline',
    voltage: 1.5,
    capacity: 2700,
    manufacturer: 'Duracell'
  },
  {
    id: '2',
    name: '18650',
    type: 'Lithium-ion',
    voltage: 3.7,
    capacity: 3500,
    manufacturer: 'Samsung'
  },
  {
    id: '3',
    name: 'CR2032',
    type: 'Lithium',
    voltage: 3.0,
    capacity: 240,
    manufacturer: 'Panasonic'
  },
  {
    id: '4',
    name: 'AAA Rechargeable',
    type: 'Ni-MH',
    voltage: 1.2,
    capacity: 800,
    manufacturer: 'Energizer'
  },
  {
    id: '5',
    name: 'D Cell',
    type: 'Alkaline',
    voltage: 1.5,
    capacity: 12000,
    manufacturer: 'Duracell'
  },
  {
    id: '6',
    name: '21700',
    type: 'Li-ion',
    voltage: 3.6,
    capacity: 5000,
    manufacturer: 'LG Chem'
  }
];

const Database = () => {
  const [batteries, setBatteries] = useState<BatteryType[]>(mockBatteries);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setBatteries(mockBatteries);
      return;
    }
    
    const filtered = mockBatteries.filter(battery => 
      battery.name.toLowerCase().includes(query.toLowerCase()) ||
      battery.type.toLowerCase().includes(query.toLowerCase()) ||
      battery.manufacturer.toLowerCase().includes(query.toLowerCase())
    );
    
    setBatteries(filtered);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-container">
          <div className="text-center mb-10 animate-fade-in">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-3">
              Database
            </span>
            <h1 className="text-3xl md:text-4xl font-medium mb-4">Battery Database</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our comprehensive collection of battery specifications and details.
            </p>
          </div>
          
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Battery className="h-5 w-5 text-primary" />
              <span className="font-medium">{batteries.length} Batteries</span>
              {searchQuery && (
                <span className="text-sm text-muted-foreground ml-2">
                  for "{searchQuery}"
                </span>
              )}
            </div>
            
            <button className="btn-secondary flex items-center">
              <Filter className="h-4 w-4 mr-1" />
              <span>Filter</span>
            </button>
          </div>
          
          {batteries.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {batteries.map((battery, index) => (
                <div key={battery.id} style={{ animationDelay: `${index * 50}ms` }}>
                  <BatteryCard battery={battery} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">No batteries found matching your search criteria</p>
            </div>
          )}
        </div>
      </main>
      <footer className="border-t border-border py-8">
        <div className="max-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-primary mb-4 md:mb-0">
              <Battery className="h-5 w-5" />
              <span className="font-medium">BatteryDB</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BatteryDB. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Database;
