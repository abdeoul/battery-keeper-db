
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { ChevronRight, Database, Layers } from 'lucide-react';
import { getBatteryGroups, BatteryGroup } from '@/services/BatteryGroups';

const BatteryGroups = () => {
  const [groups, setGroups] = useState<BatteryGroup[]>([]);
  
  useEffect(() => {
    const batteryGroups = getBatteryGroups();
    setGroups(batteryGroups);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-container">
          <div className="text-center mb-10 animate-fade-in">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-3">
              Groups
            </span>
            <h1 className="text-3xl md:text-4xl font-medium mb-4">Battery Groups</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Batteries organized by name for easier reference and comparison.
            </p>
          </div>
          
          <div className="flex items-center mb-6">
            <Link to="/database" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <Database className="h-4 w-4 mr-1" />
              <span>Database</span>
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <span className="text-sm font-medium">Groups</span>
          </div>
          
          {groups.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {groups.map((group, index) => (
                <Link 
                  key={group.name}
                  to={`/groups/${encodeURIComponent(group.name)}`}
                  className="block p-4 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-muted">
                      <Layers className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-medium text-foreground truncate">{group.name}</p>
                      <p className="text-sm text-muted-foreground">{group.count} batteries</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {group.batteries.slice(0, 3).map(battery => (
                          <span key={battery.id} className="text-xs bg-muted px-2 py-1 rounded-full">
                            {battery.manufacturer}
                          </span>
                        ))}
                        {group.batteries.length > 3 && (
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            +{group.batteries.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">No battery groups found</p>
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

export default BatteryGroups;
