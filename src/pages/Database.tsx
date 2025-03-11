
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import BatteryGroups from '@/components/BatteryGroups';
import { Battery, Filter, List, Grid } from 'lucide-react';
import BatteryService from '@/services/BatteryService';
import { BatteryType } from '@/components/BatteryCard';

const Database = () => {
  const [batteries, setBatteries] = useState<BatteryType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grouped' | 'grid'>('grouped');
  
  useEffect(() => {
    // Get batteries from the service
    const loadedBatteries = BatteryService.getBatteries();
    setBatteries(loadedBatteries);
  }, []);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setBatteries(BatteryService.getBatteries());
      return;
    }
    
    const filtered = BatteryService.getBatteries().filter(battery => 
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
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setViewMode('grouped')} 
                className={`p-2 rounded ${viewMode === 'grouped' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50'}`}
              >
                <List className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button className="btn-secondary flex items-center ml-2">
                <Filter className="h-4 w-4 mr-1" />
                <span>Filter</span>
              </button>
            </div>
          </div>
          
          {batteries.length > 0 ? (
            viewMode === 'grouped' ? (
              <BatteryGroups batteries={batteries} />
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {batteries.map((battery, index) => (
                  <div key={battery.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in">
                    <BatteryCard battery={battery} />
                  </div>
                ))}
              </div>
            )
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
