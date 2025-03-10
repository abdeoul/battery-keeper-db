
import React from 'react';
import { Battery } from 'lucide-react';

const BatteryFooter: React.FC = () => {
  return (
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
  );
};

export default BatteryFooter;
